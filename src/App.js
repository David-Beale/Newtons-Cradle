import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import Pendulum from "./Components/Pendulum";
import Room from "./Components/Room";
import Box from "./Components/Box";
import Effects from "./Components/Effects";
import ReactPlayer from "react-player/lazy";

import { OrbitControls, softShadows } from "@react-three/drei";
import { useCallback, useRef, useState } from "react";
import sound from "./Assets/hit3.mp3";
import configs from "./cfgs";
const hitSound = new Audio(sound);
let play = false;

softShadows();

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
    setConfig((prev) => {
      if (prev === 5) return 1;
      return prev + 1;
    });
  };

  return (
    <div className="container">
      <button style={{ height: 30, width: 30 }} onClick={onToggleSound} />
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
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
      </Canvas>
      <ReactPlayer
        playing={start}
        url="https://www.youtube.com/watch?v=Lju6h-C37hE"
      />
    </div>
  );
}
