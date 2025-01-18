import React, { useState, useRef } from "react";
import { PlayerController } from "./PlayerController";
import { Vehicle } from "../assets/Vehicle";
import { VehicleController } from "./VehicleController";

export const GameController = () => {
    const [activeController, setActiveController] = useState("player"); // "player" or "vehicle"
    const [playerStartPosition, setPlayerStartPosition] = useState([-4.5, 0, -45]);

    const vehicleRef = useRef(); // Reference to the Vehicle
    const playerRef = useRef(); // Reference to the PlayerController

    const handleSwitchToVehicle = () => {
        // console.log("Switching to vehicle controller");
        setActiveController("vehicle");
    };

    const handleSwitchToPlayer = () => {
        // Get the vehicle's current position
        const vehiclePosition = vehicleRef.current.translation();

        // Set player position 2 units to the right of the vehicle
        setPlayerStartPosition([
            vehiclePosition.x + 2,
            vehiclePosition.y - 7,
            vehiclePosition.z
        ]);

        setActiveController("player");
    };

    return (
        <>
            {/* Vehicle */}
            <Vehicle ref={vehicleRef} position={[0, 8, -62]} rotation = {[0, Math.PI * 0.25, 0]} scale={[1.75,1.75,1.75]} />

            {/* Controllers */}
            {activeController === "player" && (
                <PlayerController
                    ref={playerRef}
                    vehicleRef={vehicleRef}
                    onEnterVehicle={handleSwitchToVehicle}
                    startPosition={playerStartPosition}
                />
            )}

            {activeController === "vehicle" && (
                <VehicleController
                    vehicleRef={vehicleRef}
                    onExitVehicle={handleSwitchToPlayer}
                />
            )}
        </>
    );
};
