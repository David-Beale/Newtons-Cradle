import { useCompoundBody } from "@react-three/cannon";
import sound from "../Assets/hit3.mp3";
let play = false;
const hitSound = new Audio(sound);

const onHit = () => {
  if (play === false || (hitSound.played.length && !hitSound.ended)) return;
  hitSound.currentTime = 0;
  hitSound.play();
};
export default function Ball({ ballRef, color, ...props }) {
  useCompoundBody(
    () => ({
      mass: 1,
      ...props,
      shapes: [
        {
          type: "Box",
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          args: [0.01, 8, 0.01],
          mass: 1,
        },
        {
          type: "Sphere",
          position: [0, -4, 0],
          rotation: [0, 0, Math.PI / 4],
          args: [0.5],
          mass: 10,
        },
      ],
      onCollide: onHit,
    }),
    ballRef
  );
  return (
    <group ref={ballRef} onPointerDown={() => (play = true)}>
      <mesh castShadow>
        <boxBufferGeometry args={[0.01, 8, 0.01]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow position={[0, -4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <pointLight
        position={[0, -4, 4]}
        intensity={9}
        distance={8}
        decay={3}
        color={color}
      />
      <pointLight
        position={[0, -4, -6]}
        intensity={11}
        distance={30}
        decay={3}
        color={color}
      />
    </group>
  );
}
