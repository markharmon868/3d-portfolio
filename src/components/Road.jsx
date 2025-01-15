import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

const path = "models/road.glb";

export const Road = () => {
    const { scene } = useGLTF(path);
    const road = scene; 
    

    return (
        <>
            <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]} friction={0.5}>
                <primitive object={road} scale={[1,1,1]} />
            </RigidBody>
        </>
    );
};

useGLTF.preload(path);