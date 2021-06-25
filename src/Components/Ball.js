import { useBox, useCompoundBody, useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";

const r = 5;
export default function Ball({
  store,
  ballRef,
  color,
  id,
  xPos,
  startAngle,
  onHitSound,
  ...props
}) {
  const stamp = useRef();
  const onHit = (e) => {
    const target = e.body.userData;
    // console.log(
    //   id,
    //   target,
    //   store.current[target].speed,
    //   store.current[target].hit
    // );

    if (
      (store.current[target].speed === 0 &&
        store.current[target].p[1] < -0.48) ||
      store.current[target].hit
    ) {
      api.position.set(xPos, -0.5, 0);
      api.velocity.set(0, 0, 0);
      onHitSound();
    } else {
      if (
        (store.current[e.target.userData].speed === 0 ||
          store.current[e.target.userData].hit) &&
        store.current[e.target.userData].p[1] < -0.48
      ) {
        store.current[target].hit = true;
        stamp.current = Date.now();
        const checkStamp = stamp.current;
        setTimeout(() => {
          if (checkStamp === stamp.current) store.current[target].hit = false;
        }, 25);
      }
      let velX = store.current[target].v[0] * 1.022;
      velX = Math.sign(velX) * Math.min(Math.abs(velX), 3.7);

      api.velocity.set(velX * 1.025, store.current[target].v[1] * 1.025, 0);
    }
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
    <group ref={ballRef}>
      <mesh castShadow position={[0, 2.5, 0]}>
        <boxBufferGeometry args={[0.03, 5, 0.03]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow>
        <sphereBufferGeometry args={[0.55, 16, 16]} />
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
