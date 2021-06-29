export default function Plane({ position, rotation }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeBufferGeometry args={[20, 20]} />
      <meshStandardMaterial
        color="rgb(2, 1, 19)"
        metalness={0.3}
        roughness={0.75}
      />
    </mesh>
  );
}
