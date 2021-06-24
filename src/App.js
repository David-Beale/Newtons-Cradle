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
  const ref1 = useRef();
  const ref2 = useRef();
  return (
    <div className="container">
      <Canvas shadows camera={{ position: [0, 0, 40], fov: 50 }}>
        <Effects />
        <ambientLight intensity={50} />
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
          gravity={[0, -10, 0]}
          // defaultContactMaterial={{
          //   friction: 0,
          //   restitution: 1.5,
          //   contactEquationStiffness: 1e7,
          //   contactEquationRelaxation: 1,
          // }}
        >
          <Debug scale={1.0}>
            {/* <Test
              xPos={4}
              position={[6, 2, 0]}
              startAngle={0}
              id={1}
              color={"hotpink"}
            />
            <Test
              position={[2, 3.5, 0]}
              xPos={2}
              startAngle={0}
              id={2}
              color={"hotpink"}
            /> */}
            {/* <Test xPos={0} startAngle={0} color={"limegreen"} />
            <Test xPos={-2.01} startAngle={0} color={"limegreen"} />
            <Test xPos={-3.02} startAngle={0} color={"limegreen"} /> */}
            <Box position={[6, 2, 0]} />
            <Box position={[2, 3.5, 0]} />
            <Box position={[-10, -7, 0]} />
            <Room />
          </Debug>
        </Physics>
      </Canvas>
    </div>
  );
}
