import { usePlane } from "@react-three/cannon";

export default function Plane(props) {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      {/* <mesh receiveShadow> */}
      <planeBufferGeometry args={[40, 40]} />
      <meshStandardMaterial
        color="rgb(2, 1, 19)"
        metalness={0.3}
        roughness={0.75}
      />
    </mesh>
  );
}
