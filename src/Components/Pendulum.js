import { useHingeConstraint } from "@react-three/cannon";
import Ball from "./Ball";
import Beam from "./Beam";

import { useMemo, useRef } from "react";

export default function Test({ xPos, position, startAngle = 0, id, color }) {
  const ballRef = useRef();
  const beamRef = useRef();

  // useHingeConstraint(ballRef, beamRef, {
  //   collideConnected: false,
  //   axisA: [0, 0, 1],
  //   axisB: [0, 0, 1],
  //   pivotA: [0, 4, 0],
  //   pivotB: [0, -xPos, 0],
  // });

  // const r = 4;
  // const x = useMemo(
  //   () => Math.round(xPos + r * Math.sin(startAngle)),
  //   [startAngle, xPos]
  // );
  // const y = useMemo(
  //   () => Math.round(3.5 + r * (1 - Math.cos(startAngle))),
  //   [startAngle]
  // );
  return (
    <>
      {/* <Beam position={[0, 7.5, 0]} beamRef={beamRef} /> */}
      <Ball
        ballRef={ballRef}
        color={color}
        id={id}
        // position={[xPos, 3.5, 0]}
        position={position}
        // rotation={[0, 0, startAngle]}
      />
    </>
  );
}
