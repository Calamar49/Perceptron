/**
 * 3D WebGL Visualization Engine for Embedding Projector
 * Powered by Three.js & OrbitControls
 * Features:
 *  - 3D/2D Scatter plot with glowing categorical nodes
 *  - Interactive Raycasting (Hover tooltip & Point selection)
 *  - Pulsing selection rings & 3D K-NN semantic laser connection lines
 *  - Dynamic Screen-Space Text Labels (High-DPI crisp typography)
 *  - Smooth Camera Animations (Fly-to-node & View reset)
 */

export class Projector3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = Object.assign({
      pointSize: 2.5,
      showLabels: true,
      labelMode: 'all', // 'all', 'hover', 'selection'
      is3D: true,
      onSelectPoint: null,
      onHoverPoint: null
    }, options);

    this.pointsData = [];
    this.currentCoords = [];
    this.selectedPointId = null;
    this.hoveredPointId = null;
    this.neighborLines = [];

    this.initThree();
    this.initEvents();
    this.animate();
  }

  initThree() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x090d16);

    // Subtle atmospheric fog
    this.scene.fog = new THREE.FogExp2(0x090d16, 0.0035);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    this.defaultCameraPos = new THREE.Vector3(0, 45, 175);
    this.camera.position.copy(this.defaultCameraPos);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls
    if (window.THREE && window.THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.maxDistance = 600;
      this.controls.minDistance = 15;
    }

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x818cf8, 1.2);
    dirLight1.position.set(100, 150, 100);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.8);
    dirLight2.position.set(-100, -50, -100);
    this.scene.add(dirLight2);

    // 6. Coordinate Grid and Reference Planes
    this.initReferenceGrid();

    // 7. Raycaster for picking
    this.raycaster = new THREE.Raycaster();
    this.raycaster.params.Points.threshold = 4.0;
    this.mouse = new THREE.Vector2(-999, -999);

    // Groups for modular rendering
    this.nodesGroup = new THREE.Group();
    this.linesGroup = new THREE.Group();
    this.haloGroup = new THREE.Group();
    this.scene.add(this.nodesGroup);
    this.scene.add(this.linesGroup);
    this.scene.add(this.haloGroup);

    // Labels 2D overlay container
    this.labelsContainer = document.createElement('div');
    this.labelsContainer.className = 'projector-labels-layer pointer-events-none absolute inset-0 overflow-hidden select-none';
    this.container.style.position = 'relative';
    this.container.appendChild(this.labelsContainer);
  }

  initReferenceGrid() {
    // Subtle circular ground grid
    const gridHelper = new THREE.GridHelper(240, 24, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -85;
    this.scene.add(gridHelper);

    // Axes lines with subtle colors
    const axesGroup = new THREE.Group();
    const axisMatX = new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.35 });
    const axisMatY = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35 });
    const axisMatZ = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.35 });

    const createAxis = (from, to, mat) => {
      const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
      return new THREE.Line(geo, mat);
    };

    axesGroup.add(createAxis(new THREE.Vector3(-100, 0, 0), new THREE.Vector3(100, 0, 0), axisMatX));
    axesGroup.add(createAxis(new THREE.Vector3(0, -90, 0), new THREE.Vector3(0, 90, 0), axisMatY));
    axesGroup.add(createAxis(new THREE.Vector3(0, 0, -100), new THREE.Vector3(0, 0, 100), axisMatZ));
    this.scene.add(axesGroup);
    this.axesGroup = axesGroup;
  }

  initEvents() {
    window.addEventListener('resize', () => this.onWindowResize());

    const dom = this.renderer.domElement;
    dom.addEventListener('mousemove', (e) => this.onMouseMove(e));
    dom.addEventListener('click', (e) => this.onClick(e));
  }

  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  onMouseMove(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast hover
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.nodeMeshes || []);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const pointId = hit.userData.id;
      if (this.hoveredPointId !== pointId) {
        this.hoveredPointId = pointId;
        this.renderer.domElement.style.cursor = 'pointer';
        if (this.options.onHoverPoint) {
          const pt = this.pointsData.find(p => p.id === pointId);
          this.options.onHoverPoint(pt, e.clientX, e.clientY);
        }
      }
    } else {
      if (this.hoveredPointId !== null) {
        this.hoveredPointId = null;
        this.renderer.domElement.style.cursor = 'default';
        if (this.options.onHoverPoint) this.options.onHoverPoint(null);
      }
    }
  }

  onClick(e) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.nodeMeshes || []);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const pointId = hit.userData.id;
      this.selectPoint(pointId);
    }
  }

  /**
   * Set and render data points with 3D/2D coordinates
   */
  setData(points, coordinates) {
    this.pointsData = points;
    this.currentCoords = coordinates;

    // Clear previous elements
    while (this.nodesGroup.children.length > 0) {
      const obj = this.nodesGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      this.nodesGroup.remove(obj);
    }
    this.nodeMeshes = [];
    this.labelsContainer.innerHTML = '';

    const sphereGeo = new THREE.SphereGeometry(this.options.pointSize, 16, 16);

    points.forEach((p, idx) => {
      const coord = coordinates[idx] || [0, 0, 0];
      const colorHex = parseInt(p.color.replace('#', '0x'), 16);

      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.35,
        roughness: 0.3,
        metalness: 0.2
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(coord[0], coord[1], coord[2]);
      mesh.userData = { id: p.id, word: p.word, category: p.category, color: p.color, index: idx };

      this.nodesGroup.add(mesh);
      this.nodeMeshes.push(mesh);

      // Create 2D Label element
      const label = document.createElement('div');
      label.className = `projector-label absolute transform -translate-x-1/2 -translate-y-full text-[11px] font-medium px-1.5 py-0.5 rounded transition-opacity duration-150 whitespace-nowrap shadow-sm`;
      label.id = `label-node-${p.id}`;
      label.style.backgroundColor = 'rgba(15, 23, 42, 0.75)';
      label.style.border = `1px solid ${p.color}40`;
      label.style.color = p.color;
      label.textContent = p.word;

      this.labelsContainer.appendChild(label);
    });

    // Re-highlight if someone was selected
    if (this.selectedPointId !== null) {
      this.selectPoint(this.selectedPointId, false);
    }

    this.updateLabels();
  }

  /**
   * Select a word point, draw pulsing halo and K-NN laser lines
   */
  selectPoint(pointId, triggerCallback = true) {
    this.selectedPointId = pointId;
    const pt = this.pointsData.find(p => p.id === pointId);
    const mesh = this.nodeMeshes ? this.nodeMeshes.find(m => m.userData.id === pointId) : null;

    // Clear halo
    while (this.haloGroup.children.length > 0) {
      this.haloGroup.remove(this.haloGroup.children[0]);
    }

    if (mesh) {
      // Create glowing selection rings around the node
      const ringGeo = new THREE.RingGeometry(this.options.pointSize * 1.5, this.options.pointSize * 2.0, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(mesh.position);
      ringMesh.lookAt(this.camera.position);
      this.haloGroup.add(ringMesh);
      this.haloRing = ringMesh;
    }

    if (triggerCallback && this.options.onSelectPoint && pt) {
      this.options.onSelectPoint(pt);
    }
  }

  /**
   * Draw glowing laser lines from selected point to its Top-K nearest neighbors
   */
  drawNeighborLines(neighbors) {
    while (this.linesGroup.children.length > 0) {
      const obj = this.linesGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      this.linesGroup.remove(obj);
    }

    if (!neighbors || neighbors.length === 0 || this.selectedPointId === null) return;

    const sourceMesh = this.nodeMeshes.find(m => m.userData.id === this.selectedPointId);
    if (!sourceMesh) return;

    const sourcePos = sourceMesh.position;

    neighbors.forEach((n, idx) => {
      const targetMesh = this.nodeMeshes.find(m => m.userData.id === n.id);
      if (!targetMesh) return;

      const targetPos = targetMesh.position;
      const points = [sourcePos, targetPos];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

      // Gradient intensity based on similarity
      const opacity = Math.max(0.2, n.cosineSimilarity || 0.6);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: opacity,
        linewidth: 2
      });

      const line = new THREE.Line(lineGeo, lineMat);
      this.linesGroup.add(line);
    });
  }

  /**
   * Smooth Camera Fly-To target position
   */
  flyToPoint(pointId) {
    const mesh = this.nodeMeshes ? this.nodeMeshes.find(m => m.userData.id === pointId) : null;
    if (!mesh) return;

    const target = mesh.position.clone();
    const startCamPos = this.camera.position.clone();
    const endCamPos = target.clone().add(new THREE.Vector3(0, 15, 60));

    let progress = 0;
    const anim = () => {
      progress += 0.04;
      if (progress < 1) {
        this.camera.position.lerpVectors(startCamPos, endCamPos, progress);
        if (this.controls) this.controls.target.lerp(target, 0.1);
        requestAnimationFrame(anim);
      } else {
        this.camera.position.copy(endCamPos);
        if (this.controls) this.controls.target.copy(target);
      }
    };
    anim();
  }

  resetCamera() {
    const startCamPos = this.camera.position.clone();
    const startTarget = this.controls ? this.controls.target.clone() : new THREE.Vector3(0, 0, 0);
    const endTarget = new THREE.Vector3(0, 0, 0);

    let progress = 0;
    const anim = () => {
      progress += 0.04;
      if (progress < 1) {
        this.camera.position.lerpVectors(startCamPos, this.defaultCameraPos, progress);
        if (this.controls) this.controls.target.lerp(endTarget, 0.1);
        requestAnimationFrame(anim);
      } else {
        this.camera.position.copy(this.defaultCameraPos);
        if (this.controls) this.controls.target.copy(endTarget);
      }
    };
    anim();
  }

  setDimensionMode(is3D) {
    this.options.is3D = is3D;
    if (this.axesGroup) {
      this.axesGroup.children[2].visible = is3D; // Hide Z axis line in 2D
    }
  }

  setLabelMode(mode) {
    this.options.labelMode = mode;
    this.updateLabels();
  }

  setPointSize(size) {
    this.options.pointSize = size;
    if (this.nodeMeshes) {
      const scale = size / 2.5;
      this.nodeMeshes.forEach(m => m.scale.set(scale, scale, scale));
    }
  }

  /**
   * Project 3D node positions to 2D screen coordinates and update labels
   */
  updateLabels() {
    if (!this.nodeMeshes || !this.labelsContainer) return;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const halfW = width / 2;
    const halfH = height / 2;

    const mode = this.options.labelMode;
    const isLabelsEnabled = this.options.showLabels;

    for (let i = 0; i < this.nodeMeshes.length; i++) {
      const mesh = this.nodeMeshes[i];
      const id = mesh.userData.id;
      const labelEl = document.getElementById(`label-node-${id}`);
      if (!labelEl) continue;

      if (!isLabelsEnabled) {
        labelEl.style.display = 'none';
        continue;
      }

      // Check visibility filter
      const isSelected = this.selectedPointId === id;
      const isHovered = this.hoveredPointId === id;

      if (mode === 'hover' && !isHovered && !isSelected) {
        labelEl.style.display = 'none';
        continue;
      }
      if (mode === 'selection' && !isSelected) {
        labelEl.style.display = 'none';
        continue;
      }

      // Project 3D -> 2D
      const pos = mesh.position.clone();
      pos.project(this.camera);

      // Check if behind camera
      if (pos.z > 1.0) {
        labelEl.style.display = 'none';
        continue;
      }

      const x = (pos.x * halfW) + halfW;
      const y = -(pos.y * halfH) + halfH - 12;

      labelEl.style.display = 'block';
      labelEl.style.left = `${x}px`;
      labelEl.style.top = `${y}px`;

      // Scale or highlight active
      if (isSelected || isHovered) {
        labelEl.style.zIndex = '20';
        labelEl.style.transform = 'translate(-50%, -100%) scale(1.15)';
        labelEl.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
        labelEl.style.borderColor = '#6366f1';
      } else {
        labelEl.style.zIndex = '5';
        labelEl.style.transform = 'translate(-50%, -100%) scale(1)';
        labelEl.style.backgroundColor = 'rgba(15, 23, 42, 0.75)';
        labelEl.style.borderColor = `${mesh.userData.color}40`;
      }
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.controls) this.controls.update();

    // Pulse halo ring
    if (this.haloRing) {
      this.haloRing.lookAt(this.camera.position);
      const pulse = 1.0 + Math.sin(Date.now() * 0.006) * 0.15;
      this.haloRing.scale.set(pulse, pulse, pulse);
    }

    this.updateLabels();
    this.renderer.render(this.scene, this.camera);
  }
}
