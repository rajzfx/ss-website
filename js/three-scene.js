/**
 * SACHIN SYSTEMS — ATMOS-STYLE 3D WEBGL ENGINE (THREE.JS)
 * Features:
 * - Full-screen fixed 3D canvas with volumetric pale pink/blush cloud clusters
 * - High-precision 3D iPhone 16 Pro model with Titanium PBR materials & camera array
 * - Scroll-driven camera flight trajectory (Catmull-Rom spline flight along page chapters)
 * - Automatic transition into Exploded Cleanroom Hardware View & PhoneCheck Laser Scanner
 * - Mouse parallax & HUD view toggles
 */

(function() {
  'use strict';

  const canvas = document.getElementById('webgl-background-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // --- 1. Scene, Camera, Renderer ---
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xFAF0F2, 0.045); // Ethereal pale-pink atmospheric depth fog

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 150);
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // --- 2. Lighting Setup (Soft Studio + Rose-Gold Rim + Sky Key) ---
  const ambientLight = new THREE.AmbientLight(0xFFF0F3, 1.6);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.8);
  keyLight.position.set(6, 10, 8);
  scene.add(keyLight);

  const pinkRimLight = new THREE.DirectionalLight(0xF8C8D2, 1.5);
  pinkRimLight.position.set(-8, -4, -4);
  scene.add(pinkRimLight);

  const blueTechLight = new THREE.DirectionalLight(0x0092DD, 1.2); // Sachin Systems Blue
  blueTechLight.position.set(8, -6, 4);
  scene.add(blueTechLight);

  // --- 3. Atmospheric Volumetric Clouds (Atmos Style) ---
  const cloudsGroup = new THREE.Group();
  scene.add(cloudsGroup);

  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0xFDF4F6,
    roughness: 0.95,
    metalness: 0.05,
    flatShading: true,
    transparent: true,
    opacity: 0.88
  });

  function createCloudCluster(x, y, z, scale) {
    const cluster = new THREE.Group();
    const puffCount = 6 + Math.floor(Math.random() * 4);
    for (let i = 0; i < puffCount; i++) {
      const radius = 0.8 + Math.random() * 0.7;
      const geom = new THREE.DodecahedronGeometry(radius, 1);
      const mesh = new THREE.Mesh(geom, cloudMaterial);
      mesh.position.set(
        (Math.random() - 0.5) * 2.2,
        (Math.random() - 0.5) * 1.1,
        (Math.random() - 0.5) * 1.8
      );
      cluster.add(mesh);
    }
    cluster.position.set(x, y, z);
    cluster.scale.set(scale, scale, scale);
    return cluster;
  }

  // Populate floating clouds throughout the flight corridor
  const clouds = [
    createCloudCluster(5.5, 2.5, -6, 2.2),
    createCloudCluster(-6.5, -1.5, -4, 2.6),
    createCloudCluster(4.0, -8.0, -8, 3.2),
    createCloudCluster(-5.0, -15.0, -5, 2.8),
    createCloudCluster(6.2, -22.0, -7, 3.5),
    createCloudCluster(-4.5, -28.0, -6, 2.9),
    createCloudCluster(5.0, -35.0, -8, 3.8),
    createCloudCluster(-6.0, -42.0, -7, 3.2)
  ];
  clouds.forEach(c => cloudsGroup.add(c));

  // --- 4. The 3D Precision iPhone Model ---
  const phoneRoot = new THREE.Group();
  scene.add(phoneRoot);

  // Materials
  const titaniumMaterial = new THREE.MeshStandardMaterial({
    color: 0x363234, // Natural Titanium dark tone
    metalness: 0.92,
    roughness: 0.22,
  });

  const screenGlassMaterial = new THREE.MeshStandardMaterial({
    color: 0x050405,
    metalness: 0.95,
    roughness: 0.05,
  });

  const backGlassMaterial = new THREE.MeshStandardMaterial({
    color: 0x221D20,
    metalness: 0.35,
    roughness: 0.42,
  });

  const cameraRingMat = new THREE.MeshStandardMaterial({
    color: 0x5C5458,
    metalness: 0.95,
    roughness: 0.15,
  });

  const lensGlassMat = new THREE.MeshStandardMaterial({
    color: 0x0C1826,
    metalness: 0.9,
    roughness: 0.02,
  });

  const logicBoardMat = new THREE.MeshStandardMaterial({
    color: 0x1B3525,
    metalness: 0.65,
    roughness: 0.35,
  });

  const batteryCellMat = new THREE.MeshStandardMaterial({
    color: 0x1E1E22,
    metalness: 0.3,
    roughness: 0.5,
  });

  // Rounded Box Generator
  function makeRoundedBox(w, h, d, r) {
    const s = new THREE.Shape();
    const x = -w/2, y = -h/2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);

    const extrude = {
      depth: d,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03
    };
    const g = new THREE.ExtrudeGeometry(s, extrude);
    g.center();
    return g;
  }

  const phoneW = 2.45, phoneH = 5.0, phoneD = 0.24, phoneR = 0.36;

  // 1. Titanium Frame
  const chassisMesh = new THREE.Mesh(makeRoundedBox(phoneW, phoneH, phoneD, phoneR), titaniumMaterial);
  phoneRoot.add(chassisMesh);

  // 2. Back Matte Glass
  const backGlass = new THREE.Mesh(makeRoundedBox(phoneW - 0.04, phoneH - 0.04, 0.02, phoneR - 0.02), backGlassMaterial);
  backGlass.position.z = -phoneD/2 - 0.01;
  phoneRoot.add(backGlass);

  // 3. Camera Island & Triple Lenses
  const camIsland = new THREE.Mesh(makeRoundedBox(1.15, 1.15, 0.06, 0.24), backGlassMaterial);
  camIsland.position.set(-0.52, 1.65, -phoneD/2 - 0.04);
  phoneRoot.add(camIsland);

  const lensCoords = [
    [-0.72, 1.9, -phoneD/2 - 0.09],
    [-0.72, 1.4, -phoneD/2 - 0.09],
    [-0.3, 1.65, -phoneD/2 - 0.09]
  ];
  lensCoords.forEach(c => {
    const rGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 32);
    rGeom.rotateX(Math.PI / 2);
    const ring = new THREE.Mesh(rGeom, cameraRingMat);
    ring.position.set(c[0], c[1], c[2]);
    phoneRoot.add(ring);

    const lGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.09, 32);
    lGeom.rotateX(Math.PI / 2);
    const lens = new THREE.Mesh(lGeom, lensGlassMat);
    lens.position.set(c[0], c[1], c[2]);
    phoneRoot.add(lens);
  });

  // --- Explodable Hardware Components ---
  // A. Front Ceramic Shield Screen
  const screenMesh = new THREE.Mesh(makeRoundedBox(phoneW - 0.05, phoneH - 0.05, 0.02, phoneR - 0.02), screenGlassMaterial);
  screenMesh.position.z = phoneD/2 + 0.01;
  phoneRoot.add(screenMesh);

  // Dynamic Island (Cylinder pill compatible with all Three.js versions)
  const diGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.44, 20);
  diGeom.rotateZ(Math.PI / 2);
  const diMesh = new THREE.Mesh(diGeom, new THREE.MeshBasicMaterial({ color: 0x000000 }));
  diMesh.position.set(0, 2.12, 0.02);
  screenMesh.add(diMesh);

  // B. Logic Board (Internal Cleanroom Repair View)
  const boardGroup = new THREE.Group();
  const boardGeom = new THREE.BoxGeometry(0.95, 2.3, 0.04);
  const boardMesh = new THREE.Mesh(boardGeom, logicBoardMat);
  boardGroup.add(boardMesh);

  // Silicon Processor & Microchips
  const chipGeom = new THREE.BoxGeometry(0.5, 0.5, 0.03);
  const chipMesh = new THREE.Mesh(chipGeom, cameraRingMat);
  chipMesh.position.set(0, 0.25, 0.03);
  boardGroup.add(chipMesh);

  for (let i = 0; i < 6; i++) {
    const sm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.02), titaniumMaterial);
    sm.position.set((i % 2 === 0 ? 0.3 : -0.3), -0.3 - (i * 0.22), 0.03);
    boardGroup.add(sm);
  }
  boardGroup.position.set(0.55, 0.5, 0);
  boardGroup.visible = false;
  phoneRoot.add(boardGroup);

  // C. High-Health Battery Module
  const batteryMesh = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.3, 0.05), batteryCellMat);
  batteryMesh.position.set(-0.5, -0.4, 0);
  batteryMesh.visible = false;
  phoneRoot.add(batteryMesh);

  // --- 80-Point Diagnostic Laser Scanner Plane ---
  const laserGeom = new THREE.PlaneGeometry(3.6, 0.12);
  const laserMaterial = new THREE.MeshBasicMaterial({
    color: 0x0092DD,
    transparent: true,
    opacity: 0.0,
    side: THREE.DoubleSide
  });
  const laserMesh = new THREE.Mesh(laserGeom, laserMaterial);
  laserMesh.position.set(0, 0, phoneD / 2 + 0.08);
  phoneRoot.add(laserMesh);

  // --- 5. Interactive Animation & Scroll Dynamics ---
  let userOverrideMode = null; // 'assembled' | 'exploded' | 'scan' | null
  let targetScreenZ = phoneD/2 + 0.01;
  let targetBoardZ = 0;
  let targetBatteryZ = 0;
  let targetChassisZ = 0;
  let isScanning = false;
  let scanTime = 0;

  // Mouse Parallax
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Mode Buttons
  const btnFlight = document.getElementById('view-mode-flight');
  const btnExploded = document.getElementById('view-mode-exploded');
  const btnScan = document.getElementById('view-mode-scan');

  let overrideTargetPos = { x: 2.4, y: 0.2, z: 0 };
  let overrideTargetRot = { x: 0.2, y: -0.4, z: 0.08 };

  function setOverrideMode(mode) {
    userOverrideMode = mode;
    [btnFlight, btnExploded, btnScan].forEach(b => b && b.classList.remove('active'));

    if (mode === 'flight') {
      btnFlight && btnFlight.classList.add('active');
      targetScreenZ = phoneD/2 + 0.01;
      targetBoardZ = 0; targetBatteryZ = 0; targetChassisZ = 0;
      boardGroup.visible = false; batteryMesh.visible = false;
      isScanning = false; laserMaterial.opacity = 0;
      overrideTargetPos = { x: 2.2, y: 0.2, z: 0 };
      overrideTargetRot = { x: 0.18, y: -0.42, z: 0.08 };
    } else if (mode === 'exploded') {
      btnExploded && btnExploded.classList.add('active');
      targetScreenZ = 1.5;
      targetBoardZ = 0.75; targetBatteryZ = 0.38; targetChassisZ = -0.4;
      boardGroup.visible = true; batteryMesh.visible = true;
      isScanning = false; laserMaterial.opacity = 0;
      overrideTargetPos = { x: 1.8, y: -0.1, z: 0.8 };
      overrideTargetRot = { x: 0.32, y: -0.58, z: 0.14 };
    } else if (mode === 'scan') {
      btnScan && btnScan.classList.add('active');
      targetScreenZ = phoneD/2 + 0.01;
      targetBoardZ = 0; targetBatteryZ = 0; targetChassisZ = 0;
      boardGroup.visible = false; batteryMesh.visible = false;
      isScanning = true; laserMaterial.opacity = 0.92;
      overrideTargetPos = { x: 1.8, y: 0.0, z: 0.8 };
      overrideTargetRot = { x: 0.1, y: 0.12, z: 0.0 };
    }
  }

  if (btnFlight) {
    btnFlight.addEventListener('click', (e) => {
      e.stopPropagation();
      setOverrideMode('flight');
    });
  }
  if (btnExploded) {
    btnExploded.addEventListener('click', (e) => {
      e.stopPropagation();
      setOverrideMode('exploded');
    });
  }
  if (btnScan) {
    btnScan.addEventListener('click', (e) => {
      e.stopPropagation();
      setOverrideMode('scan');
    });
  }

  // --- 6. Scroll-Driven Flight Path ---
  function getScrollFraction() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    return h > 0 ? Math.min(Math.max(window.scrollY / h, 0), 1) : 0;
  }

  // --- 7. Main Animation Loop ---
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const scrollT = getScrollFraction();

    // Mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    // Gentle cloud drifting
    cloudsGroup.children.forEach((c, idx) => {
      c.position.y += Math.sin(clock.getElapsedTime() * 0.5 + idx) * 0.003;
      c.position.x += Math.cos(clock.getElapsedTime() * 0.3 + idx) * 0.003;
    });

    // If user has not explicitly locked an override mode, scroll controls the phone trajectory
    if (!userOverrideMode) {
      if (scrollT < 0.16) {
        // Hero / Chapter 1: Soaring heroically on right side
        phoneRoot.position.set(2.8 + mouse.x * 0.5, 0.2 - mouse.y * 0.3, 0);
        phoneRoot.rotation.set(0.18 + mouse.y * 0.1, -0.42 + mouse.x * 0.15, 0.08);
        targetScreenZ = phoneD/2 + 0.01;
        boardGroup.visible = false; batteryMesh.visible = false;
        isScanning = false; laserMaterial.opacity = 0;
      } else if (scrollT < 0.35) {
        // Chapter 2: Ingestion — banks to left side
        phoneRoot.position.set(-2.8 + mouse.x * 0.4, 0.1, 0);
        phoneRoot.rotation.set(0.25, 0.55 + mouse.x * 0.1, -0.15);
        targetScreenZ = phoneD/2 + 0.01;
        boardGroup.visible = false; batteryMesh.visible = false;
        isScanning = false; laserMaterial.opacity = 0;
      } else if (scrollT < 0.52) {
        // Chapter 3: Cleanroom — Explodes into components
        phoneRoot.position.set(2.4 + mouse.x * 0.3, -0.1, 0);
        phoneRoot.rotation.set(0.28, -0.55, 0.12);
        targetScreenZ = 1.35;
        targetBoardZ = 0.65; targetBatteryZ = 0.35; targetChassisZ = -0.3;
        boardGroup.visible = true; batteryMesh.visible = true;
        isScanning = false; laserMaterial.opacity = 0;
      } else if (scrollT < 0.70) {
        // Chapter 4: PhoneCheck — Active laser scan sweep
        phoneRoot.position.set(-2.2 + mouse.x * 0.3, 0.0, 0.5);
        phoneRoot.rotation.set(0.1, 0.15 + mouse.x * 0.1, 0);
        targetScreenZ = phoneD/2 + 0.01;
        targetBoardZ = 0; targetBatteryZ = 0; targetChassisZ = 0;
        boardGroup.visible = false; batteryMesh.visible = false;
        isScanning = true; laserMaterial.opacity = 0.85;
      } else if (scrollT < 0.88) {
        // Chapter 5: Wholesale Portfolio — showcases triple camera lens array
        phoneRoot.position.set(2.6 + mouse.x * 0.3, 0.1, 0);
        phoneRoot.rotation.set(-0.25, Math.PI - 0.35, -0.1);
        targetScreenZ = phoneD/2 + 0.01;
        targetBoardZ = 0; targetBatteryZ = 0; targetChassisZ = 0;
        boardGroup.visible = false; batteryMesh.visible = false;
        isScanning = false; laserMaterial.opacity = 0;
      } else {
        // Chapter 6/7: Logistics & Quote Desk — centered gentle floating overview
        phoneRoot.position.set(0 + mouse.x * 0.3, 0.6, -1.2);
        phoneRoot.rotation.set(0.35, clock.getElapsedTime() * 0.25, 0.05);
        targetScreenZ = phoneD/2 + 0.01;
        targetBoardZ = 0; targetBatteryZ = 0; targetChassisZ = 0;
        boardGroup.visible = false; batteryMesh.visible = false;
        isScanning = false; laserMaterial.opacity = 0;
      }
    } else {
      // Manual override smooth positioning
      phoneRoot.position.x += (overrideTargetPos.x + mouse.x * 0.35 - phoneRoot.position.x) * 0.08;
      phoneRoot.position.y += (overrideTargetPos.y - mouse.y * 0.25 - phoneRoot.position.y) * 0.08;
      phoneRoot.position.z += (overrideTargetPos.z - phoneRoot.position.z) * 0.08;

      phoneRoot.rotation.x += (overrideTargetRot.x - phoneRoot.rotation.x) * 0.08;
      phoneRoot.rotation.y += (overrideTargetRot.y + mouse.x * 0.15 - phoneRoot.rotation.y) * 0.08;
      phoneRoot.rotation.z += (overrideTargetRot.z - phoneRoot.rotation.z) * 0.08;
    }

    // Lerp exploded hardware Z transitions
    screenMesh.position.z += (targetScreenZ - screenMesh.position.z) * 0.08;
    boardGroup.position.z += (targetBoardZ - boardGroup.position.z) * 0.08;
    batteryMesh.position.z += (targetBatteryZ - batteryMesh.position.z) * 0.08;
    chassisMesh.position.z += (targetChassisZ - chassisMesh.position.z) * 0.08;

    // Laser scanner animation
    if (isScanning) {
      scanTime += delta * 2.8;
      laserMesh.position.y = Math.sin(scanTime) * 2.15;
      laserMaterial.opacity = 0.65 + Math.sin(scanTime * 5) * 0.25;
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

})();
