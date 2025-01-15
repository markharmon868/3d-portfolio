import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

const path = "models/terrain.glb";

export const Terrain = () => {
    const { scene } = useGLTF(path);
    const terrain = scene; 

    return (
        <>

            <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]} friction={0.6}>
                <primitive object={terrain} scale={[1,1,1]} />
            </RigidBody>
        </>
    );
};

useGLTF.preload(path);