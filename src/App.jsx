import React from 'react';
import { Canvas } from '@react-three/fiber';
import Modelview from './components/Modelview';
import { OrbitControls } from '@react-three/drei';


const App = () => (
  <Canvas>
    <Modelview />
  </Canvas>
);

export default App;
