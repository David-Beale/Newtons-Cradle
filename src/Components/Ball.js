import { useEffect, useRef } from "react";

export default function Ball({ pendulum }) {
  const pendulumRef = useRef();
  const ballRef = useRef();
  const colorRef1 = useRef();
  const colorRef2 = useRef();
  const colorRef3 = useRef();

  useEffect(() => {
    pendulum.setRefs(
      pendulumRef.current,
      ballRef.current,
      colorRef1.current,
      colorRef2.current,
      colorRef3.current
    );
  }, [pendulum]);

  return (
    <group
      ref={pendulumRef}
      position={[pendulum.xPos, 4.5, 0]}
      rotation={[0, 0, pendulum.angle]}
    >
      <mesh position={[0, -2.5, 0]}>
        <boxBufferGeometry args={[0.03, 5, 0.03]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh ref={ballRef} position={[0, -5, 0]}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial ref={colorRef1} />
      </mesh>
      <pointLight
        ref={colorRef2}
        position={[0, -5, 4]}
        intensity={9}
        distance={8}
        decay={3}
      />
      <pointLight
        ref={colorRef3}
        position={[0, -5, -6]}
        intensity={11}
        distance={30}
        decay={3}
      />
    </group>
  );
}
