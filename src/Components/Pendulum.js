import { useHingeConstraint } from "@react-three/cannon";
import Ball from "./Ball";
import Beam from "./Beam";

import { useRef } from "react";

export default function Test({ xPos, startAngle = 0 }) {
  const ballRef = useRef();
  const beamRef = useRef();

  useHingeConstraint(ballRef, beamRef, {
    collideConnected: false,
    axisA: [0, 0, 1],
    axisB: [0, 0, 1],
    pivotA: [0, 4, 0],
    pivotB: [0, -xPos, 0],
  });

  const r = 4;

  return (
    <>
      <Beam position={[0, 7.5, 0]} beamRef={beamRef} />
      <Ball
        ballRef={ballRef}
        position={[
          xPos + r * Math.sin(startAngle),
          3.5 + r * (1 - Math.cos(startAngle)),
          0,
        ]}
        rotation={[0, 0, startAngle]}
      />
    </>
  );
}
