import { useCompoundBody } from "@react-three/cannon";

export default function Ball({ ballRef, ...props }) {
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
    }),
    ballRef
  );

  return (
    <group ref={ballRef}>
      <mesh castShadow>
        <boxBufferGeometry args={[0.01, 8, 0.01]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow position={[0, -4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="silver" metalness={1} roughness={0.5} />
      </mesh>
    </group>
  );
}
