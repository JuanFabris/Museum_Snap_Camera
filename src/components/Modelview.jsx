import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import gsap from 'gsap';
import { useThree } from '@react-three/fiber';
import { positions, images, panels } from '../constants';

const Modelview = () => {
  const { scene, gl } = useThree();
  const [activeButton, setActiveButton] = useState(null);
  const buttonsRef = useRef([]);

  useEffect(() => {
    const renderer = gl;
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    renderer.setClearColor(0xA3A3A3);
    camera.position.set(0, 0, 9);

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

    // Add Lights
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./models/Kings.glb', function (gltf) {
      const model = gltf.scene;
      scene.add(model);

      gltfLoader.load('./models/song_noir_chinese_shaped_vase.glb', function (vaseGltf) {
        const vaseModel = vaseGltf.scene;
        vaseModel.position.set(0, -1.3, 5);
        vaseModel.scale.set(1.5, 1.5, 1.5);
        model.add(vaseModel);
      });

      camera.lookAt(model.position);

      positions.forEach((pos, index) => {
        const button = document.createElement('button');
        const btnImg = document.createElement('img');
        btnImg.classList.add('button-img');
        button.appendChild(btnImg);
        button.classList.add('button-positions');
        button.id = `button-${index}`;
        buttonsRef.current[index] = button;

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
            updateCameraOrbit();
          }
        });

        gsap.to(controls.target, {
          x: lookAt.x,
          y: lookAt.y,
          z: lookAt.z,
          duration: 1,
          ease: 'power3.inOut',
          onComplete: () => {
            manageButtonsAndPanels(index, lookAt);
          }
        });
      }

      function manageButtonsAndPanels(index, lookAt) {
        setActiveButton(index);

        const buttons = buttonsRef.current;
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
      requestAnimationFrame(animate);
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
