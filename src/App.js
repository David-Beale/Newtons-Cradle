import "./App.css";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader, Stats } from "@react-three/drei";

import ReactPlayer from "react-player/lazy";
import Pendulums from "./Components/Pendulums/Pendulums";
import Room from "./Components/Room/Room";
import Effects from "./Components/Effects";
import Buttons from "./Components/Buttons/Buttons";

export default function App({ quality, setQuality }) {
  const [soundOn, setSoundOn] = useState(false);
  const [configNumber, setConfigNumber] = useState(1);

  const onToggleSound = () => {
    setSoundOn((prev) => !prev);
  };
  return (
    <div className="container">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{ antialias: false }}
      >
        <Stats />
        {quality > 1 && <Effects />}
        {quality < 3 && (
          <>
            <directionalLight intensity={1} position={[0, 10, 10]} />
            <ambientLight intensity={1.7 / quality} />
          </>
        )}
        <OrbitControls />
        <Pendulums
          soundOn={soundOn}
          configNumber={configNumber}
          quality={quality}
        />
        <Room quality={quality} />
        <Suspense fallback={null}>
          <Buttons
            onToggleSound={onToggleSound}
            onChangeCfg={setConfigNumber}
            config={configNumber}
            quality={quality}
            setQuality={setQuality}
          />
        </Suspense>
      </Canvas>
      <Loader />
      <div className="hidden">
        <ReactPlayer
          playing={soundOn}
          url="https://www.youtube.com/watch?v=Lju6h-C37hE"
        />
      </div>
    </div>
  );
}
