import { useGLTF, Text } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

const path = "./models/studios.glb";

export const Studios = () => {
    
    const { scene } = useGLTF(path);
    const pos = scene.children[0].position;

    return (
        <>
            <RigidBody type="fixed" colliders="hull">
                
                <primitive object={scene} />
                <Text 
                    position = {[pos.x +1, pos.y + 3, pos.z+14]}
                    rotation = {[0, Math.PI * -0.5, 0]}
                    fontSize={0.6}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={10}
                    outlineWidth={0.1}
                    outlineColor="black"
                    textAlign="center"
                    >
                        VR Studios is a Volunteer Student Lead project that I work on with UBC's EMLx. The project uses acoustic renderings of 3D scenes to offer an authenntic acoustic experience for musicians to record in Virtual Spaces.
                </Text>
            </RigidBody>
        </>
    );
}

useGLTF.preload("./models/studios.glb");