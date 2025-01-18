import { Box, Sphere, OrbitControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { Terrain } from "./lagoon/Terrain";
import { GameController } from "./controllers/GameController";
import { Docks } from "./lagoon/Docks";
import { Road } from "./lagoon/Road";
import { Water } from "./lagoon/Water";
import { Pullouts } from "./pullouts/Pullouts";



export const Experience = () => {
  return (
    <>
      {/* Scene setup */}
      <ambientLight intensity={0.9} />
      <hemisphereLight intensity={0.3} color={"#a8c7ff"}/>
      <directionalLight position={[-10, 10, 0]} intensity={0.2} />
      <spotLight position={[0, 100, -60]} angle={75} color={"#ffa95c"} intensity={40} castShadow />
      <GameController/>

      <Terrain />
      <Road />
      <Docks />
      <Water />
      <Pullouts />
    </>
  );
};

useGLTF.preload("/models/island_and_road.glb");
