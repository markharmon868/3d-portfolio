import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";
import { AnimationMixer } from "three";

export const EmlAnim = () => {
    const { scene, animations } = useGLTF("/models/earsim.glb");
    const pos = scene.children[0].position;
    

    useEffect(() => {
        if (animations && animations.length) {
            const mixer = new AnimationMixer(scene);
            animations.forEach((clip) => {
                const action = mixer.clipAction(clip);
                action.play();
            });

            const clock = new THREE.Clock();

            const animate = () => {
                setTimeout(() => {
                    requestAnimationFrame(animate);
                }, 1000 / 60);
                mixer.update(clock.getDelta());
            };

            animate();

            return () => {
                mixer.stopAllAction();
            };
        }
    }, [scene, animations]);

    return (
        <>
        
            <primitive object={scene} />
            <Text 
                position = {[pos.x -8, pos.y + 1, pos.z]}
                rotation = {[0, Math.PI * 0.8, 0]}
                fontSize={0.55}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={10}
                outlineWidth={0.1}
                outlineColor="black"
                textAlign="center"
                >
                    EARSIM is a project with the UBC Emerging Media Lab that I am currently developing. The project is a VR experience that trains people recently hard of hearing in improving their audio localization skills.
            </Text>
        </>
    );
};