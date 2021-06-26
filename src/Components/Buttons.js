import { useState } from "react";
import { Text, useTexture } from "@react-three/drei";
import soundOn from "../Assets/soundOn.png";
import soundOff from "../Assets/soundOff.png";

export default function Buttons({ onToggleSound }) {
  const textureOn = useTexture(soundOn);
  const textureOff = useTexture(soundOff);
  const [texture, setTexture] = useState(textureOff);

  const onClick = () => {
    onToggleSound();
    setTexture((prevTexture) =>
      prevTexture === textureOn ? textureOff : textureOn
    );
  };
  return (
    <>
      {/* <Text
        fontSize={0.5}
        position={[-7, -6, -9.8]}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        ♫
      </Text> */}

      <mesh position={[-7, -6, -9.8]} rotation={[0, 0, 0]}>
        <planeBufferGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} color={"#49A6EE"} />
      </mesh>
      <mesh
        onPointerDown={onClick}
        position={[-7, -6, -9.9]}
        rotation={[0, 0, 0]}
      >
        <circleBufferGeometry args={[1, 32]} />
        <meshBasicMaterial color={"#49A6EE"} />
      </mesh>
    </>
  );
}
