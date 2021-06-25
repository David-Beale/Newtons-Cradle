import { useHingeConstraint } from "@react-three/cannon";
import Ball from "./Ball";
import Beam from "./Beam";

import { useMemo, useRef } from "react";

export default function Test({ store, xPos, startAngle = 0, id, color }) {
  const ballRef = useRef();
  const beamRef = useRef();

  useHingeConstraint(ballRef, beamRef, {
    collideConnected: false,
    axisA: [0, 0, 1],
    axisB: [0, 0, 1],
    pivotA: [0, 8, 0],
    pivotB: [0, -xPos, 0],
  });

  return (
    <>
      <Beam position={[0, 7.5, 0]} beamRef={beamRef} />
      <Ball
        store={store}
        ballRef={ballRef}
        color={color}
        id={id}
        startAngle={startAngle}
        xPos={xPos}
      />
    </>
  );
}
