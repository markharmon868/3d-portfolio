import { Box, Sphere, OrbitControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { Terrain } from "./Terrain.js";
import { GameController } from "./GameController.js";
import { Docks } from "./Docks.js";
import { Road } from "./Road.js";
import { Water } from "./Water.js";


export const Experience = () => {
  return (
    <>
      {/* Scene setup */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[-10, 10, 0]} intensity={0.4} />
      <GameController/>

      <Terrain />
      <Road />
      <Docks />
      <Water />
    </>
  );
};

useGLTF.preload("/models/island_and_road.glb");
