import Plane from "./Plane";

export default function Room() {
  return (
    <>
      <Plane position={[0, -7.5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane position={[-9, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[9, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[0, 0, -9]} rotation={[-0.0, 0, 0]} />
    </>
  );
}
