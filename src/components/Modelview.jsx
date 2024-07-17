import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import gsap from 'gsap';
import { Canvas, useThree } from '@react-three/fiber';
import { positions } from '../utils';

const Modelview = () => {
  const { scene, gl } = useThree();

  useEffect(() => {
    const renderer = gl;

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    renderer.setClearColor(0xA3A3A3);

    camera.position.set(0.3, 0.5, 14.5);

    // Create CSS2DRenderer
    const labelRenderer = new CSS2DRenderer(Canvas);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(labelRenderer.domElement);

    const controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;

    const updateCameraOrbit = () => {
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      controls.target.copy(camera.position).add(forward);
    };

    controls.addEventListener('change', updateCameraOrbit);



    const gltfLoader = new GLTFLoader();

    gltfLoader.load('./models/Kings.glb', function (gltf) {
      const model = gltf.scene;
      scene.add(model);

      // Ensure camera looks inside the room initially
      camera.lookAt(model.position);

      positions.forEach((pos, index) => {
        // Create button element
        const button = document.createElement('button');
        button.textContent = ``;
        button.style.padding = '15px';
        button.style.borderRadius = '100%';
        button.style.background = 'white';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.addEventListener('click', () => moveCameraToPosition(index));

        // Create CSS2DObject and add it to the scene
        const label = new CSS2DObject(button);
        label.position.set(pos.x, pos.y, pos.z);
        scene.add(label);
      });

      function moveCameraToPosition(index) {
        const { x, y, z, lookAt } = positions[index];

        // Disable controls temporarily during camera movement
        controls.enabled = false;

        // Animate camera to the position
        gsap.to(camera.position, {
          x,
          y,
          z,
          duration: 1,
          ease: 'power3.inOut',
          onUpdate: () => {
            camera.lookAt(lookAt);
            camera.updateProjectionMatrix();
          },
          onComplete: () => {
            // Re-enable controls and update orbit
            controls.enabled = true;
            updateCameraOrbit();
          }
        });

        // Animate controls target to lookAt position
        gsap.to(controls.target, {
          x: lookAt.x,
          y: lookAt.y,
          z: lookAt.z,
          duration: 1,
          ease: 'power3.inOut'
        });
      }
    });

    const animate = () => {
      controls.update(); // Update controls in animation loop
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera); // Render labels in animation loop
    };

    renderer.setAnimationLoop(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeChild(labelRenderer.domElement);
    };
  }, [gl, scene]);

  return null; // Return null or React fragment
};

export default Modelview;