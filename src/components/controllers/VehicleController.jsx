import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useVehicleController } from './useVehicleControls';
import { useKeyboardControls } from '@react-three/drei';

const VehicleController = ({ chassisBodyRef, wheelsRef, wheels, onExitVehicle }) => {
    const { vehicleController } = useVehicleController(chassisBodyRef, wheelsRef, wheels);
    const camera = useThree((state) => state.camera);

    const cameraOffset = new THREE.Vector3(12, 4, 0);
    const cameraTargetOffset = new THREE.Vector3(-2, 1.5, 0);

    const [smoothedCameraPosition] = useState(new THREE.Vector3(0, 10, -30));
    const [smoothedCameraTarget] = useState(new THREE.Vector3());

    const [, get] = useKeyboardControls();

    const accelerateForce = 20;
    const brakeForce = 1;
    const steerAngle = 0.3;

    useFrame((state, delta) => {
        if (!vehicleController.current) return;

        const t = 1.0 - Math.pow(0.01, delta);

        const controller = vehicleController.current;
        const chassisRigidBody = controller.chassis();

        const movement = { x: 0, y: 0, z: 0 };

        if (get().forward) movement.z = 1;
        if (get().backward) movement.z = -1;
        if (get().left) movement.x = 1;
        if (get().right) movement.x = -1;
        if (get().jump) movement.y = 1;

        const engineForce = movement.z === 1 ? movement.z * accelerateForce : movement.z * 0.5 * accelerateForce;
        controller.setWheelEngineForce(0, engineForce);
        controller.setWheelEngineForce(1, engineForce);
        controller.setWheelEngineForce(2, engineForce);
        controller.setWheelEngineForce(3, engineForce);

        const wheelBrake = movement.y * brakeForce;
        controller.setWheelBrake(2, wheelBrake);
        controller.setWheelBrake(3, wheelBrake);

        const steerDirection = movement.x;
        const currentSteering = controller.wheelSteering(0) || 0;
        const steering = THREE.MathUtils.lerp(currentSteering, steerAngle * steerDirection, 0.5);
        controller.setWheelSteering(0, steering);
        controller.setWheelSteering(1, steering);

        const chassisTranslation = new THREE.Vector3(
            chassisRigidBody.translation().x,
            chassisRigidBody.translation().y,
            chassisRigidBody.translation().z
        );
        const chassisRotation = new THREE.Quaternion(
            chassisRigidBody.rotation().x,
            chassisRigidBody.rotation().y,
            chassisRigidBody.rotation().z,
            chassisRigidBody.rotation().w
        );

        const rotatedCameraOffset = cameraOffset.clone().applyQuaternion(chassisRotation);
        const rotatedCameraTargetOffset = cameraTargetOffset.clone().applyQuaternion(chassisRotation);

        const cameraPosition = chassisTranslation.clone().add(rotatedCameraOffset);
        smoothedCameraPosition.lerp(cameraPosition, t);
        state.camera.position.copy(smoothedCameraPosition);

        const cameraTarget = chassisTranslation.clone().add(rotatedCameraTargetOffset);
        smoothedCameraTarget.lerp(cameraTarget, t);
        state.camera.lookAt(smoothedCameraTarget);
    });

    // Handle exit vehicle key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.key === "e") || (event.key === "E")) {
                onExitVehicle();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onExitVehicle]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "r") {
                chassisBodyRef.current.setTranslation(new THREE.Vector3(0, 8, -65));
                chassisBodyRef.current.setLinvel(new THREE.Vector3(0, 0, 0));
                chassisBodyRef.current.setRotation({x:0, y:Math.PI * 0.8, z:0, w:1});
                cameraOffset.set(12, 4, 0);
                cameraTargetOffset.set(-2, 1.5, 0);
                camera.position.set(0, 10, -30);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onExitVehicle]);

    return null;
};

export default VehicleController;
