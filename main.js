import * as THREE from 'three';

const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set camera position
    camera.position.z = 5;

    // Rotation state
    let isShiftPressed = false;
    let isDoubleShiftPressed = false;

    // Event listeners for rotation
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Shift') {
        if (isShiftPressed) isDoubleShiftPressed = true;
        isShiftPressed = true;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.key === 'Shift') {
        isShiftPressed = false;
        isDoubleShiftPressed = false;
      }
    });

    window.addEventListener('mousemove', (event) => {
      if (isShiftPressed && !isDoubleShiftPressed) {
        cube.rotation.y += event.movementX * 0.01;
      } else if (isDoubleShiftPressed) {
        cube.rotation.x += event.movementY * 0.01;
      } else {
        cube.rotation.x += event.movementY * 0.01;
        cube.rotation.y += event.movementX * 0.01;
      }
    });

    // Reset function
    window.addEventListener('keydown', (event) => {
      if (event.key === 'X') {
        cube.rotation.set(0, 0, 0);
      }
    });

    // Render loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();