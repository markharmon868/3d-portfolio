import React, { useRef } from 'react';
import { Plane, useVideoTexture } from '@react-three/drei';
import { Box } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';



export const SkateVideo = ({...props}) => {
    const texture = useVideoTexture('/videos/skater-video.mp4');
    const group = useRef();

    return (
        <group ref = {group} {...props} dispose = {null}>  
            <RigidBody type="fixed" colliders={false}>
            
                <Box position = {[0, 0, -0.155]} rotation = {[0, 0, 0]} scale = {[1, 1, 0.3]}>
                    <meshBasicMaterial attach="material" color = "gray"/>
                </Box>
                <Plane position = {[0, 0, 0]} rotation = {[0, 0, 0]} scale = {[1, 1, 1]}>
                    <meshBasicMaterial attach="material" map = {texture} />
                </Plane>
                <CuboidCollider position={[0, 0, 0]} args={[1, 1, 0.3]}  />
            </RigidBody>
        </group>
    )
};