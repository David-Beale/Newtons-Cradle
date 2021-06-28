import { useState } from "react";
import { useTexture } from "@react-three/drei";
import soundOn from "../../Assets/soundOn.png";
import soundOff from "../../Assets/soundOff.png";

export default function SoundButton({ onToggleSound, setHovered }) {
  const textureOn = useTexture(soundOn);
  const textureOff = useTexture(soundOff);
  const [texture, setTexture] = useState(textureOff);

  const onClick = (e) => {
    e.stopPropagation();
    onToggleSound();
    setTexture((prevTexture) =>
      prevTexture === textureOn ? textureOff : textureOn
    );
  };
  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={onClick}
      position={[-7.5, -5.5, -9.9]}
    >
      <mesh position={[0, 0, 0.1]}>
        <planeBufferGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial map={texture} color={"#33A0F4"} />
      </mesh>
      <mesh>
        <circleBufferGeometry args={[0.7, 32]} />
        <meshBasicMaterial color={"#33A0F4"} />
      </mesh>
    </group>
  );
}
