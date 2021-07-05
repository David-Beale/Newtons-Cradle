export default function Plane({ position, rotation, quality }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeBufferGeometry args={[20, 20]} />
      <meshStandardMaterial
        color={quality === 3 ? "rgb(2, 1, 19)" : "rgb(70, 70, 88)"}
        metalness={0.3}
        roughness={0.75}
      />
    </mesh>
  );
}
