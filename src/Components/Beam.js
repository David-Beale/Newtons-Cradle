import { useEffect, useRef } from "react";

export default function Beam() {
  const ref = useRef();
  useEffect(() => {
    ref.current.updateMatrix();
  }, []);
  return (
    <mesh
      ref={ref}
      frustumCulled={false}
      matrixAutoUpdate={false}
      position={[0, 4.5, 0]}
      rotation={[0, 0, Math.PI / 2]}
    >
      <cylinderBufferGeometry attach="geometry" args={[0.15, 0.15, 10, 12]} />
      <meshBasicMaterial color="black" attach="material" />
    </mesh>
  );
}
