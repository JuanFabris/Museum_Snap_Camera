import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

// Define the Kings component using React.forwardRef
export const Kings = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('./models/Kings.glb');

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.628}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_12.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_13.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.model_Material_u1_v1} />
      </group>
    </group>
  );
});

useGLTF.preload('./models/Kings.glb');

export default Kings;
