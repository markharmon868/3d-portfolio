import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import React, { forwardRef, useEffect } from "react";

const path = "/models/terrain.glb";

const Terrain = forwardRef((props, ref) => {
  const { scene } = useGLTF(path);

  useEffect(() => {
    if (scene && ref) {
      ref.current = scene; // Assign the GLTF scene to the forwarded ref
      if (props.onLoaded) props.onLoaded(scene); // Notify the parent if onLoaded is provided
      // console.log("Terrain loaded");
    }
  }, [scene, ref, props]);

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      position={[0, 0, 0]}
      friction={0.6}
    >
      <primitive object={scene} {...props} receiveShadow scale={[1, 1, 1]} ref = {ref}/>
    </RigidBody>
  );
});

useGLTF.preload(path);

export default Terrain;
