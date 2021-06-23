import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import Test from "./Components/Pendulum";
import Plane from "./Components/Plane";
import Box from "./Components/Box";

import { OrbitControls } from "@react-three/drei";

export default function App() {
  return (
    <div className="container">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={256}
          shadow-mapSize-height={256}
        />
        <hemisphereLight intensity={0.35} />
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
          <Debug scale={1.0}>
            <Test xPos={2 * Math.sqrt(2)} startAngle={Math.PI / 5} />
            <Test xPos={Math.sqrt(2)} startAngle={0} />
            <Test xPos={0} startAngle={0} />
            <Test xPos={-Math.sqrt(2)} startAngle={0} />
            <Test xPos={-2 * Math.sqrt(2)} startAngle={0} />
            {/* <Box /> */}
            <Plane position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          </Debug>
        </Physics>
      </Canvas>
    </div>
  );
}
