import "./App.css";
import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import { OrbitControls, Loader, Stats } from "@react-three/drei";

import ReactPlayer from "react-player/lazy";
import Pendulum from "./Components/Pendulum";
import Room from "./Components/Room";
import Box from "./Components/Box";
import Effects from "./Components/Effects";
import Buttons from "./Components/Buttons/Buttons";

import sound from "./Assets/hit3.mp3";
import configs from "./cfgs";

const hitSound = new Audio(sound);
let play = false;

export default function App() {
  const [start, setStart] = useState(false);
  const [config, setConfig] = useState(1);
  const store = useRef({});

  const onHitSound = () => {
    if (play === false || (hitSound.played.length && !hitSound.ended)) return;
    hitSound.currentTime = 0;
    hitSound.play();
  };
  const onToggleSound = () => {
    play = !play;
    setStart((prev) => !prev);
  };

  return (
    <div className="container">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <Stats />
        <Effects />
        {/* <ambientLight intensity={1} /> */}
        <OrbitControls />
        <Physics
          gravity={[0, -13, 0]}
          defaultContactMaterial={{
            friction: 0,
          }}
        >
          {/* <Debug scale={1.1}> */}
          {configs[config].map((pendulum, index) => (
            <Pendulum
              key={index}
              store={store}
              xPos={pendulum.xPos}
              startAngle={pendulum.startAngle}
              id={index + 1}
              onHitSound={onHitSound}
            />
          ))}
          {/*  <Box position={[-10, -7, 0]} /> */}
          <Room />
          {/* </Debug> */}
        </Physics>
        <Suspense fallback={null}>
          <Buttons
            onToggleSound={onToggleSound}
            onChangeCfg={setConfig}
            config={config}
          />
        </Suspense>
      </Canvas>
      <Loader />
      <ReactPlayer
        playing={start}
        url="https://www.youtube.com/watch?v=Lju6h-C37hE"
      />
    </div>
  );
}
