import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { OrbitControls, useGLTF, useKeyboardControls, Text } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { MathUtils } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { Quaternion } from "three";
import { Player } from "../Assets/Player";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";


import React, { forwardRef } from "react";

let rotateAngle = new Vector3(0, 1, 0);
let rotateQuaternion = new Quaternion();
let cameraTarget = new Vector3();
let walkDirection = new Vector3();

export const PlayerController = forwardRef(({ onEnterVehicle, vehicleRef, startPosition }, ref) => {
    const ypos = 30;

    const WALK_SPEED = 5;
    const RUN_SPEED = 10;


    // refs
    const rb = useRef();
    const character = useRef();
    const container = useRef();
    const [, get] = useKeyboardControls();
    const controlsRef = useRef();
    const camera = useThree(state => state.camera);

    const [animation, setAnimation] = useState("idle");
    const [isJumping, setIsJumping] = useState(false);

    var hasEnteredVehicle = false;

    const [showPopup, setShowPopup] = useState(true); // State for popup visibility
    var isNearVehicle = false;


    // Initialize Camera
    useEffect(() => {
        if (startPosition && camera) {
            // Set initial camera position relative to player
            camera.position.set(
                startPosition[0],
                startPosition[1] + 5,
                startPosition[2] - 10
            );

            // Set initial target for OrbitControls
            if (controlsRef.current) {
                controlsRef.current.target.set(
                    startPosition[0],
                    startPosition[1] + 1,
                    startPosition[2]
                );
                
                // Configure OrbitControls
                controlsRef.current.enableDamping = true;
                controlsRef.current.dampingFactor = 0.05;
                controlsRef.current.maxPolarAngle = Math.PI / 1.5;
                controlsRef.current.minDistance = 5;
                controlsRef.current.maxDistance = 15;
            }
        }
    }, [startPosition, camera]);

    // Proximity check logic
    useEffect(() => {
        const checkProximity = () => {
            const playerPosition = new Vector3().copy(rb.current.translation());
            const vehicleStartPosition = new Vector3(0, 8, -60); // Example vehicle position
            
            const distanceToStart = playerPosition.distanceTo(vehicleStartPosition);
            
            if (!hasEnteredVehicle) {
                if (distanceToStart < 6) {
                    isNearVehicle = true;
                }   else {
                    isNearVehicle = false;
                }
            };
            if (vehicleRef.current) {
                const vehiclePosition = vehicleRef.current.translation();
                const distance = playerPosition.distanceTo(vehiclePosition);
                if (distance < 10) {
                    isNearVehicle = true;
                } else {
                    isNearVehicle = false;
                }
            };
        };
        

        const interval = setInterval(checkProximity, 1000); // Check proximity periodically
        return () => clearInterval(interval);
    }, []);

    // Key press handling for entering/exiting the vehicle
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.key === "e" || event.key =="E") && onEnterVehicle && isNearVehicle) {
                onEnterVehicle();
                hasEnteredVehicle = true;
            }
            if (event.key === "o" || event.key === "O") {
                setShowPopup((prev) => !prev); // Toggle popup visibility
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onEnterVehicle]);


    useFrame((state, delta) => {
        if (rb.current) {
            let speed = 0;
            const vel = rb.current.linvel();
            const position = rb.current.translation();

            const movement = { x: 0, z: 0, y: vel.y };

            if (get().forward) { movement.z = 1; }
            if (get().backward) { movement.z = -1; }
            if (get().left) { movement.x = 1; }
            if (get().right) { movement.x = -1; }
            if (get().jump && !isJumping) {
                movement.y = 5;
                setIsJumping(true);
            }

            if (movement.y !== 0 && !isJumping) {
                vel.y = movement.y;
            } 
            
            speed = (movement.x !== 0 || movement.z !== 0) ? (get().run ? RUN_SPEED : WALK_SPEED) : 0;
            setAnimation((movement.x !== 0 || movement.z !== 0) ? "running" : "idle");

            const directionOffset = Math.atan2(movement.x, movement.z);

            // Calculate angle between camera and movement
            let angleYCameraDirection = Math.atan2(
                camera.position.x - position.x,
                camera.position.z - position.z
            );

            // Update character rotation
            rotateQuaternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffset);
            const currentRotation = rb.current.rotation();
            const currentQuaternion = new Quaternion(
                currentRotation.x,
                currentRotation.y,
                currentRotation.z,
                currentRotation.w
            );
            currentQuaternion.rotateTowards(rotateQuaternion, 0.1);
            rb.current.setRotation(currentQuaternion, true);

            // Update movement direction
            camera.getWorldDirection(walkDirection);
            walkDirection.y = 0;
            walkDirection.normalize();
            walkDirection.applyAxisAngle(rotateAngle, directionOffset);

            // Update velocity
            vel.x = walkDirection.x * speed;
            vel.z = walkDirection.z * speed;
            rb.current.setLinvel(vel, true);

            if (Math.abs(vel.y) < 0.01 && isJumping) {
                setIsJumping(false);
                setAnimation("idle");
            }

            // Update OrbitControls target to follow player
            if (controlsRef.current) {
                controlsRef.current.target.set(
                    position.x,
                    position.y + 1,
                    position.z
                );
            }
        }
    });

    return (
        <>
            {/* Popup */}
            {showPopup && (
                <>
                    <Text
                        position={[-4.5, 10, -36]} // Position relative to player
                        rotation = {[0, Math.PI, 0]}
                        fontSize={0.7}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={10}
                        outlineWidth={0.1}
                        outlineColor="black"
                        textAlign="center"
                    >
                        Welcome to the Bolinas Lagoon.                               Drive around and check out my projects!
                    </Text>

                    <Text
                        position={[3, 10.5, -63]} // Position relative to player
                        rotation = {[0, Math.PI * -0.2, 0]}
                        fontSize={0.7}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={10}
                        outlineWidth={0.1}
                        outlineColor="black"
                        textAlign="center"
                    >
                        Press "e" and get in the car!
                    </Text>
                </>

            )}
            <group ref={ref}>
                <RigidBody colliders={false} lockRotations ref={rb} position={startPosition}>
                    <group ref={container}>
                        <OrbitControls 
                            ref={controlsRef}
                            makeDefault
                        />
                        <group ref={character} position={[0, 0, 0]}>
                            <Player 
                                scale={[1, 1, 1]} 
                                position={[0, 0, 0]} 
                                animation={animation} 
                                rotation={[0, Math.PI, 0]}
                            />
                        </group>
                    </group>
                    <CapsuleCollider position={[0, 1, 0]} args={[0.5, 0.5]} />
                </RigidBody>
            </group>
        </>
    );
});