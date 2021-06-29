import Ball from "../Ball";

import { usePendulums } from "./usePendulums";

export default function Pendulums({ configNumber, soundOn }) {
  const pendulums = usePendulums(configNumber, soundOn);
  return (
    <>
      {pendulums.map((pendulum) => (
        <Ball key={pendulum.id} pendulum={pendulum} />
      ))}
    </>
  );
}
