import Plane from "./Plane";

export default function Room() {
  return (
    <>
      <Plane position={[0, -15, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane position={[-18, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[18, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[0, 0, -20]} rotation={[-0.0, 0, 0]} />
    </>
  );
}
