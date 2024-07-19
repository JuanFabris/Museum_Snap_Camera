import * as THREE from 'three'

import { 
  blueImg, 
  yellowImg, 
  valleyImg, 
  pepeImg, 
  pfpImg, 
  shkImg, 
  spgImg, 
  spdmnImg, 
  doggoImg,
  magicImg
} 
from '../utils';


  
export const positions = [
  { x: -3, y: 0, z: 9.5, lookAt: new THREE.Vector3(-10, 0, 8) },
  { x: 2.8, y: 0, z: 3.6, lookAt: new THREE.Vector3(1, 1, 1) },
  { x: 0, y: 0, z: 9, lookAt: new THREE.Vector3(2, 0, 0) },
  { x: -2.7, y: 0.6, z: 3.7, lookAt: new THREE.Vector3(3, 3, 3) },
  { x: -1.7, y: 0, z: 8.7, lookAt: new THREE.Vector3(4, 0, 4) },
  { x: 0.5, y: 0.8, z: 10, lookAt: new THREE.Vector3(5, 5, 5) },
];



export const images = [
  {
    pos : 1,
    image : doggoImg
  },
  {
    pos : 2,
    image : magicImg
  },
  {
    pos : 3,
    image : pepeImg
  },
  {
    pos : 4,
    image : spdmnImg
  },
  {
    pos : 5,
    image : shkImg
  },
  {
    pos : 6,
    image : pfpImg
  },
]


export const panels = [
  {
    pos: 1,
    textLists: ["Piper"]
  },
  {
    pos: 2,
    textLists: ["Magic Mirror"],
  },
  {
    pos: 3,
    textLists: ["Picobean"],
  },
  {
    pos: 4,
    textLists: ["Hexapod"],
  },
  {
    pos: 5,
    textLists: ["Metapedro"],
  },
  {
    pos: 6,
    textLists: ["MetaVez"],
  },
];