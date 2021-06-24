import { usePlane } from "@react-three/cannon";

export default function Plane(props) {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      {/* <mesh receiveShadow> */}
      <planeBufferGeometry args={[15, 15]} />
      <meshStandardMaterial color="rgb(2, 1, 19)" />
    </mesh>
  );
}
