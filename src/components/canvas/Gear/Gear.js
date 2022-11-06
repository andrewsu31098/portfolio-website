import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MeshPhongMaterial } from "three";
import GUI from "lil-gui";

export default function Gear(props) {
  const mesh = useRef(null);
  const { nodes, materials } = useGLTF("steampunk_gear/scene.gltf");

  const [activated, setActivated] = useState(true);

  //   const gui = new GUI();

  //   useEffect(() => {
  //     if (mesh.current) {
  //       gui.add(mesh.current.position, "x", -5, 5);
  //       gui.add(mesh.current.material, "shininess", 0, 150);
  //     }
  //   }, [mesh]);

  useFrame((state, delta) => {
    if (mesh.current && activated) {
      if (props.x) mesh.current.rotation.x += 0.01 * (props.speed || 1);
      if (props.xRev) mesh.current.rotation.x -= 0.01 * (props.speed || 1);

      if (props.y) mesh.current.rotation.y += 0.01 * (props.speed || 1);
      if (props.yRev) mesh.current.rotation.y -= 0.01 * (props.speed || 1);
      if (props.z) mesh.current.rotation.z += 0.01 * (props.speed || 1);
      if (props.zRev) mesh.current.rotation.z -= 0.01 * (props.speed || 1);
    }
    // mesh.current.rotation.z += 0.02;
    // mesh.current.rotation.x += 0.02;
  });

  useEffect(() => mesh.geometry.center(), [mesh]);

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        ref={mesh}
        rotation={props.rotation || [0, 0, 0]}
        position={props.position || [0, 0, 0]}
        geometry={nodes.defaultMaterial.geometry}
        // material={materials.material_0}
      >
        <meshPhongMaterial attach="material" color="#D3D3D3" />
      </mesh>
    </group>
  );
}
