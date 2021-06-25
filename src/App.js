import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import Test from "./Components/Pendulum";
import Room from "./Components/Room";
import Box from "./Components/Box";
import Effects from "./Components/Effects";

import { OrbitControls, softShadows } from "@react-three/drei";
import { useRef } from "react";

softShadows();

export default function App() {
  const store = useRef({});
  return (
    <div className="container">
      <Canvas shadows camera={{ position: [0, 0, 20], fov: 50 }}>
        <Effects />
        {/* <ambientLight intensity={1} /> */}
        {/* <directionalLight
          position={[0, 4, 7]}
          intensity={2}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        /> */}
        <OrbitControls />
        <Physics
          gravity={[0, -13, 0]}
          defaultContactMaterial={{
            friction: 0,
            // restitution: 1.5,
            // contactEquationStiffness: 1e7,
            // contactEquationRelaxation: 1,
          }}
        >
          {/* <Debug scale={1.1}> */}
          <Test
            store={store}
            xPos={2.02}
            // startAngle={0}
            startAngle={Math.PI / 6}
            id={1}
            color={"hotpink"}
          />
          <Test
            store={store}
            xPos={1.01}
            startAngle={0}
            id={2}
            color={"hotpink"}
          />
          <Test
            store={store}
            id={3}
            xPos={0}
            startAngle={0}
            color={"limegreen"}
          />
          <Test
            store={store}
            id={4}
            xPos={-1.01}
            startAngle={0}
            color={"limegreen"}
          />
          <Test
            store={store}
            id={5}
            xPos={-2.02}
            startAngle={0}
            color={"limegreen"}
          />
          {/* {/* <Box position={[6, 2, 0]} /> */}
          {/* <Box position={[1, 1.5, 0]} /> */}
          {/*  <Box position={[-10, -7, 0]} /> */}
          <Room />
          {/* </Debug> */}
        </Physics>
      </Canvas>
    </div>
  );
}
