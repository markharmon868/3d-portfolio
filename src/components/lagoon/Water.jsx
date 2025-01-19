import React, { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { ImprovedNoise } from "./ImprovedNoise";

export const Water = () => {
  const meshRef = useRef();
  const noise = new ImprovedNoise(); // Instantiate the noise class
  const size = 155; // Plane size
  const segments = 50; // Number of segments
  const frequency = 0.05; // Frequency of the noise
  const amplitude = 0.1; // Amplitude of the noise

  // Modify the vertices on each frame to create animation
  useFrame(({ clock }) => {
    const geometry = meshRef.current.geometry;
    const time = clock.getElapsedTime();

    // Access the position attribute
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = noise.noise(x * frequency, y * frequency, time) * amplitude;

      position.setZ(i, z); // Set new Z value based on Perlin noise
    }

    position.needsUpdate = true; // Notify Three.js to update the geometry
  });

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2} position = {[0, 5.5, 0]}>
      <planeGeometry args={[size, size, segments, segments]} />
      <meshStandardMaterial
        color="#03593a"
        wireframe={false} // Change to true to see the structure
        smoothShading
        opacity={0.97}
        transparent
        metalness={0.1}
      />
    </mesh>
  );
};