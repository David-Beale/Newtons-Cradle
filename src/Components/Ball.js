import { useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

const r = 5;
const clampVelocity = (vel, max) => {
  return Math.sign(vel) * Math.min(Math.abs(vel), max);
};
export default function Ball({
  store,
  ballRef,
  id,
  xPos,
  startAngle,
  onHitSound,
  ...props
}) {
  const color = useMemo(
    () => (startAngle === 0 ? "hotpink" : "limegreen"),
    [startAngle]
  );
  const onHit = (e) => {
    const target = e.body.userData;
    // console.log(
    //   id,
    //   target,
    //   store.current[target].speed,
    //   store.current[target].hit
    // );

    //there is a 1 frame delay when updating speed, so we set a marker
    //in the store to let us know what it should be e.g. noSpeed, newSpeed

    //ball hitting stationary target
    const targetIsStationary =
      (store.current[target].speed === 0 ||
        store.current[target].noSpeed > 0) &&
      store.current[target].newSpeed <= 0 &&
      store.current[target].p[1] < -0.48;
    if (targetIsStationary) {
      console.log(id, target, "now stationary");
      console.log(
        store.current[target].speed,
        store.current[target].noSpeed,
        store.current[target].newSpeed
      );
      //this ball loses all velocity
      api.position.set(xPos, -0.5, 0);
      api.velocity.set(0, 0, 0);
      onHitSound();
      store.current[id].newSpeed = 0;
      store.current[target].newSpeed = 2;
      store.current[target].updatedSpeed = store.current[id].v[0];
      return;
    }
    //stationary ball being hit. ignore hits at max height
    const currentBallStationary =
      (store.current[id].speed === 0 || store.current[id].noSpeed > 0) &&
      store.current[id].p[1] < -0.48;

    if (currentBallStationary) {
      store.current[target].noSpeed = 2;
    }
    //take velocity of other ball

    const clampedVel = clampVelocity(
      store.current[target].updatedSpeed || store.current[target].v[0],
      3.7
    );
    console.log(id, target, "now moving with vel", clampedVel);

    api.velocity.set(clampedVel * 1.025, store.current[target].v[1] * 1.025, 0);
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
    store.current[id] = {};
    store.current[id].newSpeed = 0;
    store.current[id].noSpeed = 0;
    const unsubscribe = api.velocity.subscribe((v) => {
      store.current[id].v = v;
      speed.set(...v);
      store.current[id].speed = Math.round(speed.length());
      store.current[id].newSpeed--;
      store.current[id].noSpeed--;
      if (store.current[id].newSpeed <= 0) store.current[id].updatedSpeed = 0;
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
