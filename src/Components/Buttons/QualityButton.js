import { Text } from "@react-three/drei";
const lookup = {
  3: "HQ",
  2: "MQ",
  1: "LQ",
};

export default function QualityButton({ quality, setQuality, setHovered }) {
  const onClick = (e) => {
    e.stopPropagation();
    let nextValue = quality - 1;
    if (nextValue === 0) nextValue += 3;
    setQuality(nextValue);
  };
  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={onClick}
      position={[-7.5, -6.5, -9.9]}
    >
      <Text
        fontSize={0.5}
        position={[0, 0, 0.1]}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {lookup[quality]}
      </Text>
      <mesh>
        <circleBufferGeometry args={[0.6, 32]} />
        <meshBasicMaterial color={"#33A0F4"} />
      </mesh>
    </group>
  );
}
