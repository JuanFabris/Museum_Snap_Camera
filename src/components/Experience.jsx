import React from 'react';
import { OrbitControls } from "@react-three/drei";
import Modelview from "./Modelview";
import { Kings } from "./Kings";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false} />
      <Modelview />
      <Kings />
    </>
  );
};
