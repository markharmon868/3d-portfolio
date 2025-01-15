import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber";

const path = "models/water.glb";

export const Water = () => {
    const { scene, animations } = useGLTF(path);
    const water = scene; 
    const mixer = useRef();

    useEffect(() => {
        if (animations.length > 0) {
          mixer.current = new THREE.AnimationMixer(scene);
          const action = mixer.current.clipAction(animations[0]);
          action.loop = THREE.LoopRepeat; // Ensure the animation loops
          action.play();
        }
    
        return () => mixer.current?.stopAllAction(); // Cleanup mixer on unmount
      }, [animations, scene]);
    
      useFrame((_, delta) => {
        mixer.current?.update(delta);
      });
    

    return (
        <>
            <primitive object={water} scale={[1,1,1]} />
        </>
    );
};

useGLTF.preload(path);