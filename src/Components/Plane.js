import { usePlane } from "@react-three/cannon";

export default function Plane(props) {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={[5, 5]} />
      <shadowMaterial color="#171717" />
    </mesh>
  );
}
