import { useBox, useCompoundBody, useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import sound from "../Assets/hit3.mp3";
let play = false;
const hitSound = new Audio(sound);

const r = 8;
const color2 = "hotpink";
const color1 = "limegreen";
export default function Ball({
  store,
  ballRef,
  color,
  id,
  xPos,
  startAngle,
  ...props
}) {
  // const [color, setColor] = useState(startAngle > 0 ? color2 : color1);
  const onHit = (e) => {
    // console.log(id, target, store.current[target]);
    const target = e.body.userData;

    if (store.current[target].speed === 0) {
      api.position.set(xPos, -0.5, 0);
      api.velocity.set(0, 0, 0);
      // setColor(color1);
    } else {
      // setColor(color2);
      api.velocity.set(
        store.current[target].v[0],
        store.current[target].v[1],
        0
      );
    }
    if (play === false || (hitSound.played.length && !hitSound.ended)) return;
    hitSound.currentTime = 0;
    hitSound.play();
  };

  const [, api] = useSphere(
    () => ({
      mass: 10,
      position: [
        xPos + r * Math.sin(startAngle),
        -0.5 + r * (1 - Math.cos(startAngle)),
        0,
      ],
      rotation: [0, 0, startAngle],
      args: [0.5],
      userData: id,
      onCollide: onHit,
      collisionResponse: 0,
      linearDamping: 0,
      angularDamping: 0,
    }),
    ballRef
  );

  useEffect(() => {
    const speed = new THREE.Vector3();
    store.current[id] = { start: props.position };
    const unsubscribe = api.velocity.subscribe((v) => {
      store.current[id].v = v;
      speed.set(...v);
      store.current[id].speed = Math.round(speed.length());
    });
    const unsubscribe2 = api.position.subscribe((p) => {
      store.current[id].p = p;
    });
    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [api, id, store, props.position]);

  return (
    <group ref={ballRef} onPointerDown={() => (play = true)}>
      <mesh castShadow position={[0, 4, 0]}>
        <boxBufferGeometry args={[0.03, 8, 0.03]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <pointLight
        position={[0, 0, 4]}
        intensity={9}
        distance={8}
        decay={3}
        color={color}
      />
      <pointLight
        position={[0, 0, -6]}
        intensity={11}
        distance={30}
        decay={3}
        color={color}
      />
    </group>
  );
}
