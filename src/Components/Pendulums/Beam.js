import { useEffect } from "react";

export default function Beam({ beamRef }) {
  useEffect(() => {
    beamRef.current.updateMatrix();
  }, [beamRef]);
  return (
    <mesh
      ref={beamRef}
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
