import Ball from "../Ball";

import sound from "../../Assets/hit3.mp3";
import { usePendulums } from "./usePendulums";

const hitSound = new Audio(sound);

export default function Pendulums({ configNumber, soundOn }) {
  const onHitSound = () => {
    if (soundOn === false || (hitSound.played.length && !hitSound.ended))
      return;
    hitSound.currentTime = 0;
    hitSound.play();
  };

  const pendulums = usePendulums(configNumber, onHitSound);

  return (
    <>
      {pendulums.map((pendulum, index) => (
        <Ball key={index} pendulum={pendulum} />
      ))}
    </>
  );
}
