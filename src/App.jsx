import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, Loader, OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

// import { Perf } from "r3f-perf";



function App() {

  const keyboardMap = [
    {name: "forward", keys: ["KeyW", "ArrowUp"] },
    {name: "backward", keys: ["KeyS", "ArrowDown"] },
    {name: "left", keys: ["KeyA", "ArrowLeft"] },
    {name: "right", keys: ["KeyD", "ArrowRight"] },
    {name: "run", keys: ["Shift"] },
    {name: "jump", keys: ["Space"] },
  ]

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <KeyboardControls map={keyboardMap}>
      <Canvas shadows camera={{ position: [10, 10, 5], fov: 30 }}>
        {/* <Perf position="top-left"/> */}
        <color attach="background" args={["#a8c7ff"]} />
        
        <Suspense fallback={null}>
          <Physics debug={true}>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      <Loader />
      </KeyboardControls>
      <div
        style={{
          position: "absolute",
          bottom: "20px", // Adjust distance from the bottom of the screen
          left: "20px",   // Adjust distance from the left of the screen
          pointerEvents: "none", // Allow clicks to pass through
          zIndex: 1000,  // Ensure it stays above the canvas
        }}
      >
        <img
          src="/controls-overlay.png" // Replace with your image path
          alt="Overlay"
          style={{
            width: "300px",  // Set the width of the image
            height: "auto",  // Maintain the aspect ratio
            opacity: 0.8,    // Adjust transparency
          }}
        />
      </div>
    </div>
    
  );
}

export default App;
