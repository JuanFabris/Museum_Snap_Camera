import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Vaso(props) {
  const { nodes, materials } = useGLTF('./models/song_noir_chinese_shaped_vase.glb')
  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.005}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['Cylinder006_Material_#43_0'].geometry}
            material={materials.Material_43}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/song_noir_chinese_shaped_vase.glb')

export default Vaso;
