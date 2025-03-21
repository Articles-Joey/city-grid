/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 ..\models\Park Bench.glb --output output\Park Bench.js --keepnames --shadows 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import modelsFolder from 'constants/modelsFolder';
const link = `${modelsFolder}Park Bench.glb`;

export function ModelJToastieParkBench(props) {
  const { nodes, materials } = useGLTF(link)
  return (
    <group {...props} dispose={null} scale={0.2}>
      <mesh name="Park_Bench_Cube-Mesh" castShadow receiveShadow geometry={nodes['Park_Bench_Cube-Mesh'].geometry} material={materials.Metal} />
      <mesh name="Park_Bench_Cube-Mesh_1" castShadow receiveShadow geometry={nodes['Park_Bench_Cube-Mesh_1'].geometry} material={materials.Wood} />
    </group>
  )
}

useGLTF.preload(link)
