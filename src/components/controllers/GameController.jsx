import React, { useState, useRef } from "react";
import { PlayerController } from "./PlayerController";
import Vehicle  from "../assets/Vehicle";
import VehicleController from "./VehicleController";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const wheelsInfo = [
    { position: new THREE.Vector3(-1.8, -0.145, -0.865), axleCs: new THREE.Vector3(0, 0, -1), suspensionRestLength: 0, suspensionStiffness: 48, maxSuspensionTravel: 1, radius: 0.44 },
    { position: new THREE.Vector3(-1.8, -0.145, 0.865), axleCs: new THREE.Vector3(0, 0, -1), suspensionRestLength: 0, suspensionStiffness: 48, maxSuspensionTravel: 1, radius: 0.44 },
    { position: new THREE.Vector3(1.2, -0.145, -0.865), axleCs: new THREE.Vector3(0, 0, -1), suspensionRestLength: 0, suspensionStiffness: 48, maxSuspensionTravel: 1, radius: 0.44 },
    { position: new THREE.Vector3(1.2, -0.145, 0.865), axleCs: new THREE.Vector3(0, 0, -1), suspensionRestLength: 0, suspensionStiffness: 48, maxSuspensionTravel: 1, radius: 0.44 },
];

export const GameController = () => {
    const [activeController, setActiveController] = useState("player"); // "player" or "vehicle"
    const [playerStartPosition, setPlayerStartPosition] = useState([-4.5, 11, -55]);

    const vehicleRef = useRef(); // Reference to the Vehicle
    const playerRef = useRef(); // Reference to the PlayerController

    const chassisBodyRef = useRef(null);
    const wheelsRef = useRef([]);

    const handleSwitchToVehicle = () => {
        // console.log("Switching to vehicle controller");
        setActiveController("vehicle");
    };

    const handleSwitchToPlayer = () => {
        // Get the vehicle's current position
        const vehiclePosition = chassisBodyRef.current.translation();

        // Set player position 2 units to the right of the vehicle
        setPlayerStartPosition([
            vehiclePosition.x + 2,
            vehiclePosition.y ,
            vehiclePosition.z
        ]);

        setActiveController("player");
    };

    return (
        <>
            
            {/* Vehicle */}
            <Vehicle
                position={[0, 10, -65]}
                rotation={[0, Math.PI * 0.8, 0]}
                wheels={wheelsInfo}
                chassisBodyRef={chassisBodyRef}
                wheelsRef={wheelsRef}
                isControllerActive={activeController === "vehicle"}
                scale={4}
            />

            {/* Controllers */}
            {activeController === "player" && (
                <PlayerController
                    ref={playerRef}
                    vehicleRef={chassisBodyRef}
                    onEnterVehicle={handleSwitchToVehicle}
                    startPosition={playerStartPosition}
                />
            )}

            {activeController === "vehicle" && (
                <VehicleController chassisBodyRef={chassisBodyRef} wheelsRef={wheelsRef} wheels={wheelsInfo} onExitVehicle={handleSwitchToPlayer}/>
            )}
        </>
    );
};
