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
          args: [0.1, 8, 0.1],
          mass: 1,
        },
        {
          type: "Box",
          position: [0, -4, 0],
          rotation: [0, 0, Math.PI / 4],
          args: [1, 1, 1],
          mass: 10,
        },
      ],
    }),
    ballRef
  );

  return (
    <group ref={ballRef}>
      <mesh castShadow>
        <boxBufferGeometry args={[0.1, 8, 0.1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <mesh castShadow position={[0, -4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <sphereBufferGeometry args={[0.5 * Math.sqrt(2), 16, 16]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </group>
  );
}
