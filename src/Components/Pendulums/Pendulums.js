import { useRef } from "react";
import Ball from "./Ball";
import Beam from "./Beam";
import { usePendulums } from "./usePendulums";

export default function Pendulums({ configNumber, soundOn }) {
  const beamRef = useRef();
  const pendulums = usePendulums(configNumber, soundOn, beamRef);
  return (
    <>
      <Beam beamRef={beamRef} />
      {pendulums.map((pendulum) => (
        <Ball key={pendulum.id} pendulum={pendulum} />
      ))}
    </>
  );
}
