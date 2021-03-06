import { useEffect, useRef } from "react";

export default function Ball({ pendulum, quality }) {
  const pendulumRef = useRef();
  const ballRef = useRef();
  const stringRef = useRef();
  const colorRef1 = useRef();
  const colorRef2 = useRef();
  const colorRef3 = useRef();

  useEffect(() => {
    pendulum.setRefs(
      pendulumRef.current,
      ballRef.current,
      stringRef.current,
      colorRef1.current,
      colorRef2.current,
      colorRef3.current
    );
  }, [pendulum, quality]);

  return (
    <group
      ref={pendulumRef}
      position={[pendulum.xPos, 4.5, pendulum.zPos]}
      rotation={[0, 0, pendulum.angle]}
    >
      <mesh ref={stringRef} position={[0, -2.5, 0]}>
        <boxBufferGeometry args={[0.03, 5, 0.03]} />
        {quality === 3 ? (
          <meshStandardMaterial color="black" />
        ) : (
          <meshBasicMaterial color="black" />
        )}
      </mesh>
      <mesh ref={ballRef} position={[0, -5, 0]}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial ref={colorRef1} />
      </mesh>
      {quality > 1 && (
        <pointLight
          ref={colorRef2}
          position={[0, -5, 4]}
          intensity={9}
          distance={8}
          decay={3}
        />
      )}
      {quality > 2 && (
        <pointLight
          ref={colorRef3}
          position={[0, -5, -6]}
          intensity={11}
          distance={30}
          decay={3}
        />
      )}
    </group>
  );
}
