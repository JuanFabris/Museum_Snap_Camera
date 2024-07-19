import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import gsap from 'gsap';
import { useThree } from '@react-three/fiber';
import { positions, images, panels } from '../constants';

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

    const labelRenderer = new CSS2DRenderer();
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

      camera.lookAt(model.position);

      positions.forEach((pos, index) => {
        const button = document.createElement('button');
        const btnImg = document.createElement('img');
        btnImg.classList.add('button-img');
        button.appendChild(btnImg);
        button.classList.add('button-positions');

        const image = images.find(img => img.pos === index + 1);
        if (image) {
          btnImg.src = `${image.image}`;
        }

        button.addEventListener('click', () => moveCameraToPosition(index));

        const label = new CSS2DObject(button);
        label.position.set(pos.x, pos.y, pos.z);
        scene.add(label);
      });

      function createPanels() {
        return panels.map(panel => {
          const div = document.createElement('div');
          div.classList.add('panel');
          panel.textLists.forEach(text => {
            const p = document.createElement('p');
            p.innerText = text;
            div.appendChild(p);
          });
          const panelObject = new CSS2DObject(div);
          div.style.visibility = 'hidden';
          scene.add(panelObject);
          return panelObject;
        });
      }

      const panelObjects = createPanels();
      panelObjects.forEach(panel => {
      panel.element.style.visibility = 'hidden';
      });

      function moveCameraToPosition(index) {
        const { x, y, z, lookAt } = positions[index];

        controls.enabled = false;

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
            controls.enabled = true;
            manageButtonsAndPanels(index, lookAt);
            updateCameraOrbit();
          }
        });

        gsap.to(controls.target, {
          x: lookAt.x,
          y: lookAt.y,
          z: lookAt.z,
          duration: 1,
          ease: 'power3.inOut'
        });
      }

      function manageButtonsAndPanels(index, lookAt) {
        const buttons = document.querySelectorAll('.button-positions');
        buttons.forEach((button, i) => {
          button.style.opacity = i === index ? '0' : '1';
        });

        panelObjects.forEach((panel, i) => {
          if (i === index) {
            panel.position.set(lookAt.x, lookAt.y, lookAt.z);
            panel.element.style.visibility = 'visible';
          } else {
            panel.element.style.visibility = 'hidden';
          }
        });
      }
    });

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      requestAnimationFrame(animate); // Ensure continuous rendering
    };

    requestAnimationFrame(animate);

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

  return null;
};

export default Modelview;
