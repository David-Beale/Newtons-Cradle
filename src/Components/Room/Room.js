import Plane from "./Plane";

export default function Room({ quality }) {
  return (
    <>
      <Plane
        position={[0, -7.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        quality={quality}
      />
      <Plane
        position={[-9, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        quality={quality}
      />
      <Plane
        position={[9, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        quality={quality}
      />
      <Plane position={[0, 0, -10]} rotation={[-0.0, 0, 0]} quality={quality} />
    </>
  );
}
