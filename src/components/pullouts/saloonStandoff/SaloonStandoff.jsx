import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { Text } from "@react-three/drei";

const path = "/models/saloon.glb";

export const SaloonStandoff = () => {
    
    const { scene } = useGLTF(path);
    const pos = scene.children[0].position;

    return (
        <>
            <Text 
                position = {[pos.x -7, pos.y + 2, pos.z-2]}
                rotation = {[0, Math.PI * 0.8, 0]}
                fontSize={0.6}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={10}
                outlineWidth={0.1}
                outlineColor="black"
                textAlign="center"
                >
                    Saloon Standoff is a game I am in the early stages of developing in Unreal Engine. The game will be a couch co-op only FPS with a western Theme.
            </Text>
            <primitive object={scene} />
        </>
        
    );
}

useGLTF.preload("/models/saloon.glb");