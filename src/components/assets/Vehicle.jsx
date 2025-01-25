import { useRef } from 'react';
import { RigidBody, CuboidCollider, CylinderCollider } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Vehicle = ({ position, rotation, wheels, chassisBodyRef, wheelsRef, isControllerActive }) => {
    const chassisMeshRef = useRef(null);

    const { scene: chassisModel } = useGLTF('/wrx-chassis.glb');
    const { scene: wheelModel } = useGLTF('/wrx-wheel.glb');

    return (
        <RigidBody
            ref={chassisBodyRef}
            position={position}
            rotation={rotation}
            canSleep={false}
            colliders={false} // Disable default colliders
            type="dynamic"
        >
            {/* Chassis Collider */}
            <CuboidCollider args={[2.6, 0.5, 0.9]} position={[-0.25, 0.35, 0]} />

            {/* Chassis */}
            <primitive
                ref={chassisMeshRef}
                object={chassisModel}
                rotation={[0, -Math.PI / 2, 0]}
                position={[1.2, -0.5, 0]}
            />

            {/* Wheels */}
            {wheels.map((wheel, index) => (
                <group
                    key={index}
                    ref={(ref) => (wheelsRef.current[index] = ref)}
                    position={wheel.position}
                >
                    <group
                        rotation={
                            index === 0 || index === 2
                                ? [-Math.PI / 2, Math.PI / 2, 0]
                                : [Math.PI / 2, Math.PI / 2, 0]
                        }
                    >
                        <primitive object={wheelModel.clone()} />
                    </group>

                    {/* Manual Wheel Colliders (Only when VehicleController is inactive) */}
                    {!isControllerActive && (
                        <CylinderCollider
                            args={[wheel.radius/2, wheel.radius, 0.1]} // Radius, Height
                            rotation={[Math.PI / 2, 0, 0]} // Align collider with wheel
                            position={[0, 0, 0]} // Collider centered on wheel
                        />
                    )}
                </group>
            ))}
        </RigidBody>
    );
};

export default Vehicle;
