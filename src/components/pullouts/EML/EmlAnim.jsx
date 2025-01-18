import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";
import { AnimationMixer } from "three";

export const EmlAnim = () => {
    const { scene, animations } = useGLTF("/models/earsim.glb");
    

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
        <primitive object={scene} />
    );
};