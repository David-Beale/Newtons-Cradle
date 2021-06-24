import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import Test from "./Components/Pendulum";
import Room from "./Components/Room";
import Box from "./Components/Box";

import { OrbitControls, softShadows } from "@react-three/drei";

softShadows();

export default function App() {
  return (
    <div className="container">
      <Canvas shadows camera={{ position: [0, 0, 20], fov: 50 }}>
        <directionalLight
          position={[0, 4, 7]}
          intensity={4}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <OrbitControls />
        <Physics
          gravity={[0, -1, 0]}
          defaultContactMaterial={{
            friction: 0,
            restitution: 1,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
          }}
        >
          {/* <Debug scale={1.0}> */}
          <Test xPos={2} startAngle={Math.PI / 5} />
          <Test xPos={1} startAngle={0} />
          <Test xPos={0} startAngle={0} />
          <Test xPos={-1} startAngle={0} />
          <Test xPos={-2} startAngle={0} />
          {/* <Box /> */}
          <Room />
          {/* </Debug> */}
        </Physics>
      </Canvas>
    </div>
  );
}
