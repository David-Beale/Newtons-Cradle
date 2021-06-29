import "./App.css";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader, Stats } from "@react-three/drei";

import ReactPlayer from "react-player/lazy";
import Pendulums from "./Components/Pendulums/Pendulums";
import Room from "./Components/Room/Room";
import Effects from "./Components/Effects";
import Buttons from "./Components/Buttons/Buttons";

export default function App() {
  const [soundOn, setSoundOn] = useState(false);
  const [configNumber, setConfigNumber] = useState(1);

  const onToggleSound = () => {
    setSoundOn((prev) => !prev);
  };

  return (
    <div className="container">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <Stats />
        <Effects />
        {/* <ambientLight intensity={50} /> */}
        <OrbitControls />
        <Pendulums soundOn={soundOn} configNumber={configNumber} />
        <Room />
        <Suspense fallback={null}>
          <Buttons
            onToggleSound={onToggleSound}
            onChangeCfg={setConfigNumber}
            config={configNumber}
          />
        </Suspense>
      </Canvas>
      <Loader />
      <ReactPlayer
        playing={soundOn}
        url="https://www.youtube.com/watch?v=Lju6h-C37hE"
      />
    </div>
  );
}
