import { usePlane } from "@react-three/cannon";

export default function Plane(props) {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      {/* <mesh receiveShadow> */}
      <planeBufferGeometry args={[20, 20]} />
      <meshStandardMaterial
        color="rgb(2, 1, 19)"
        metalness={0.4}
        roughness={0.8}
      />
    </mesh>
  );
}
