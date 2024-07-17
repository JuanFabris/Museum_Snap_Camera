import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap'; // Importa GSAP
import { useThree } from '@react-three/fiber';

const Modelview = () => {
  const { camera, scene, gl } = useThree();

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

    // renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;

    let position = 0;

    gltfLoader.load('./models/Kings.glb', function (gltf) {
      const model = gltf.scene;
      scene.add(model);

      window.addEventListener('mouseup', () => {
        switch (position) {
          case 0:
            moveCamera(-1, 1.6, 5);
            rotateCamera(0, 0.1, 0);
            position = 1;
            break;
          case 1:
            moveCamera(2.8, 0, 3.6);
            rotateCamera(0, -2, 0);
            position = 2;
            break;
          case 2:
            moveCamera(2.5, -0.9, 12.2);
            rotateCamera(0.9, 0.6, -0.6);
            position = 3;
            break;
          case 3:
            moveCamera(-2.7, 0.6, 3.7);
            rotateCamera(0.6, 1.9, -0.6);
            position = 4;
            break;
          case 4:
            moveCamera(-1.7, 0, 8.7);
            rotateCamera(0, 4.7, 0);
            position = 5;
            break;
          case 5:
            moveCamera(0.5, 0.8, 10);
            rotateCamera(0.3, 1.65, -0.3);
            position = 0;
            break;
          default:
            break;
        }
      });

      function moveCamera(x, y, z) {
        gsap.to(camera.position, {
          x,
          y,
          z,
          duration: 3,
          onUpdate: () => {
            camera.updateProjectionMatrix(); // Aggiorna la matrice di proiezione durante l'animazione
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
  

};

export default Modelview;
