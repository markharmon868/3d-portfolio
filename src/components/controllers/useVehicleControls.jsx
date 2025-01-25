import { useAfterPhysicsStep, useRapier } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const up = new THREE.Vector3(0, 1, 0);

const _wheelSteeringQuat = new THREE.Quaternion();
const _wheelRotationQuat = new THREE.Quaternion();

export const useVehicleController = (chassisRef, wheelsRef, wheelsInfo) => {
  const { world } = useRapier();
  const vehicleController = useRef(null);

  useEffect(() => {
    const chassis = chassisRef.current;
    const wheels = wheelsRef.current;

    if (!chassis || !wheels) return;

    // Initialize the vehicle controller
    const vehicle = world.createVehicleController(chassis);
    const suspensionDirection = new THREE.Vector3(0, -1, 0);

    // Add wheels
    wheelsInfo.forEach((wheel) => {
      vehicle.addWheel(
        wheel.position,
        suspensionDirection,
        wheel.axleCs,
        wheel.suspensionRestLength,
        wheel.radius
      );
    });

    // Configure suspension for each wheel
    wheelsInfo.forEach((wheel, index) => {
      vehicle.setWheelSuspensionStiffness(index, wheel.suspensionStiffness);
      vehicle.setWheelMaxSuspensionTravel(index, wheel.maxSuspensionTravel);
    });

    // Store the controller reference
    vehicleController.current = vehicle;

    // Clean up on unmount
    return () => {
      vehicleController.current = null;
      world.removeVehicleController(vehicle);
    };
  }, [world, chassisRef, wheelsRef, wheelsInfo]);

  useAfterPhysicsStep(() => {
    if (!vehicleController.current) return;

    const controller = vehicleController.current;
    controller.updateVehicle(world.timestep);

    // Update wheel positions and rotations
    const wheels = wheelsRef.current;
    wheels?.forEach((wheel, index) => {
      const wheelAxleCs = controller.wheelAxleCs(index);
      const connection = controller.wheelChassisConnectionPointCs(index)?.y || 0;
      const suspension = controller.wheelSuspensionLength(index) || 0;
      const steering = controller.wheelSteering(index) || 0;
      const rotationRad = controller.wheelRotation(index) || 0;

      // Update wheel position
      wheel.position.y = connection - suspension;

      // Update wheel rotation and steering
      _wheelSteeringQuat.setFromAxisAngle(up, steering);
      _wheelRotationQuat.setFromAxisAngle(wheelAxleCs, rotationRad);
      wheel.quaternion.multiplyQuaternions(_wheelSteeringQuat, _wheelRotationQuat);
    });
  });

  return {
    vehicleController,
  };
};
