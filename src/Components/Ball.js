import { useBox, useCompoundBody, useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import sound from "../Assets/hit3.mp3";
let play = false;
const hitSound = new Audio(sound);

export default function Ball({ ballRef, color, id, ...props }) {
  const vel = useRef();
  const onHit = (e) => {
    console.log("hit");
    // const totalVel = vel.current[0] + vel.current[1];
    // const xProportion = vel.current[0] / totalVel;
    // const yProportion = vel.current[1] / totalVel;
    // console.log(vel.current[0], xProportion, yProportion);
    // console.log("current:", e.body.userData, "target:", e.target.userData);
    // const force =
    //   0.5 *
    //   10 *
    //   e.contact.impactVelocity ** 2 *
    //   Math.sign(e.contact.contactNormal[0]);
    // console.log(e);
    // api.applyLocalForce([force, 0, 0], [0, 0, 0]);
    if (play === false || (hitSound.played.length && !hitSound.ended)) return;
    hitSound.currentTime = 0;
    hitSound.play();
  };

  // const [, api] = useCompoundBody(
  //   () => ({
  //     mass: 1,
  //     ...props,
  //     shapes: [
  //       {
  //         type: "Box",
  //         position: [0, 0, 0],
  //         rotation: [0, 0, 0],
  //         args: [0.01, 8, 0.01],
  //         mass: 1,
  //       },
  //       {
  //         type: "Sphere",
  //         position: [0, -4, 0],
  //         args: [0.5],
  //         mass: 10,
  //       },
  //     ],
  //     userData: id,
  //     onCollide: onHit,
  //     // collisionResponse: 0,
  //   }),
  //   ballRef
  // );
  const [, api] = useSphere(
    () => ({
      mass: 10,
      ...props,
      // position: [0, 0, 0],
      args: [1],
      userData: id,
      onCollide: onHit,
      // collisionResponse: 1,
    }),
    ballRef
  );

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => {
      // vel.current = Math.round(100 * v[0]) / 100;
      vel.current = v;
    });
    return () => unsubscribe();
  }, [api.velocity]);

  return (
    <group ref={ballRef} onPointerDown={() => (play = true)}>
      <mesh castShadow>
        <boxBufferGeometry args={[0.03, 8, 0.03]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow position={[0, -4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <sphereBufferGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <pointLight
        position={[0, -4, 4]}
        intensity={9}
        distance={8}
        decay={3}
        color={color}
      />
      <pointLight
        position={[0, -4, -6]}
        intensity={11}
        distance={30}
        decay={3}
        color={color}
      />
    </group>
  );
}
