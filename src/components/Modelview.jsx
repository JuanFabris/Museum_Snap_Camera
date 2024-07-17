import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { panels } from '../utils';

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

    camera.position.set(-1.7, 0, 8.7);
    camera.lookAt(1.7, 0, 8.7);

    const gltfLoader = new GLTFLoader();

    let position = 0;

    gltfLoader.load('./models/Kings.glb', function (gltf) {
      const model = gltf.scene;
      scene.add(model);

      const cameraPositions = [
        { position: new THREE.Vector3(-1, 1.6, 5), rotation: new THREE.Euler(0, 0.1, 0) },
        { position: new THREE.Vector3(2.8, 0, 3.6), rotation: new THREE.Euler(0, -2, 0) },
        { position: new THREE.Vector3(2.5, -0.9, 12.2), rotation: new THREE.Euler(0.9, 0.6, -0.6) },
        { position: new THREE.Vector3(-2.7, 0.6, 3.7), rotation: new THREE.Euler(0.6, 1.9, -0.6) },
        { position: new THREE.Vector3(-1.7, 0, 8.7), rotation: new THREE.Euler(0, 4.7, 0) },
        { position: new THREE.Vector3(0.5, 0.8, 10), rotation: new THREE.Euler(0.3, 1.65, -0.3) },
      ];

      cameraPositions.forEach(({ position, rotation }, index) => {
        const buttonStyle = {
          position: 'absolute',
          top: 0,
          left: 0,
          gap: 5
        };

        const handleClick = () => {
          moveCamera(position.x, position.y, position.z);
          rotateCamera(rotation.x, rotation.y, rotation.z);
        };

        const buttonPosition = new THREE.Vector3(position.x, position.y, position.z);
        const screenPosition = buttonPosition.project(camera);
        const x = (screenPosition.x + 1) / 2 * window.innerWidth;
        const y = -(screenPosition.y - 1) / 2 * window.innerHeight;

        const buttonElement = document.createElement('button');
        buttonElement.textContent = panels[index] // Text content for the button
        buttonElement.style.cssText = `
          ${buttonStyle}
          left: ${x}px;
          top: ${y}px;
          padding : 10px;
          border : 1px dotted red
        `;
        buttonElement.addEventListener('click', handleClick);
        document.body.appendChild(buttonElement);
      });

      function moveCamera(x, y, z) {
        gsap.to(camera.position, {
          x,
          y,
          z,
          duration: 3,
          ease: 'power3.inOut',
          onUpdate: () => {
            camera.updateProjectionMatrix();
          },
        });
      }

      function rotateCamera(x, y, z) {
        gsap.to(camera.rotation, {
          x,
          y,
          z,
          duration: 3,
        });
      }
    });

    const animate = () => {
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};

export default Modelview;
