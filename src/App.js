import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import Test from "./Components/Pendulum";
import Room from "./Components/Room";
import Box from "./Components/Box";
import Effects from "./Components/Effects";
import ReactPlayer from "react-player/lazy";

import { OrbitControls, softShadows } from "@react-three/drei";
import { useCallback, useRef, useState } from "react";
import sound from "./Assets/hit3.mp3";
const hitSound = new Audio(sound);
let play = false;

softShadows();

export default function App() {
  const [start, setStart] = useState(false);
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
          <Test
            store={store}
            xPos={2.2}
            // startAngle={0}
            startAngle={Math.PI / 6}
            id={1}
            color={"hotpink"}
            onHitSound={onHitSound}
          />
          <Test
            store={store}
            xPos={1.1}
            startAngle={0}
            id={2}
            color={"hotpink"}
            onHitSound={onHitSound}
          />
          <Test
            store={store}
            id={3}
            xPos={0}
            startAngle={0}
            color={"hotpink"}
            onHitSound={onHitSound}
          />
          <Test
            store={store}
            id={4}
            xPos={-1.1}
            startAngle={0}
            color={"limegreen"}
            onHitSound={onHitSound}
          />
          <Test
            store={store}
            id={5}
            xPos={-2.2}
            startAngle={-Math.PI / 6}
            color={"limegreen"}
            onHitSound={onHitSound}
          />
          {/* {/* <Box position={[6, 2, 0]} /> */}
          {/* <Box position={[1, 1.5, 0]} /> */}
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
