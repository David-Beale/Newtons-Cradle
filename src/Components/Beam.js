import { useBox } from "@react-three/cannon";

export default function Beam({ beamRef, ...props }) {
  useBox(
    () => ({
      type: "Static",
      args: [0.2, 10, 0.2],
      rotation: [0, 0, Math.PI / 2],
      ...props,
      collisionFilterGroup: 0,
    }),
    beamRef
  );

  return (
    <></>
    // <mesh ref={beamRef} frustumCulled={false}>
    //   <cylinderBufferGeometry attach="geometry" args={[0.15, 0.15, 10, 12]} />
    //   <meshBasicMaterial color="white" attach="material"  />
    // </mesh>
  );
}
