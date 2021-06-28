import { Text } from "@react-three/drei";

export default function SoundButton({
  setHovered,
  onClick,
  cfg,
  xPos,
  yPos,
  disabled,
}) {
  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => onClick(cfg)}
      position={[xPos, yPos, -9.9]}
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
        <circleBufferGeometry args={[0.6, 32]} />
        <meshBasicMaterial color={disabled ? "#063D5F" : "#33A0F4"} />
      </mesh>
    </group>
  );
}
