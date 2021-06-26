import { Text } from "@react-three/drei";

export default function SoundButton({ setHovered, onClick, cfg, xPos }) {
  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => onClick(cfg)}
      position={[xPos, -6, -9.9]}
    >
      <Text
        fontSize={0.7}
        position={[0, 0, 0.1]}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {cfg}
      </Text>
      <mesh>
        <circleBufferGeometry args={[0.7, 32]} />
        <meshBasicMaterial color={"#33A0F4"} />
      </mesh>
    </group>
  );
}
