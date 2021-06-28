import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import configs from "./cfgs";
import Pendulum from "./pendulum";
import sound from "../../Assets/hit3.mp3";
const hitSound = new Audio(sound);

export const usePendulums = (configNumber, soundOn) => {
  const onHitSound = (velocity) => {
    if (soundOn === false || (hitSound.played.length && !hitSound.ended))
      return;
    hitSound.currentTime = 0;
    hitSound.volume = Math.min(velocity * 50, 1);
    hitSound.play();
  };

  const [pendulums, setPendulums] = useState([]);
  const progress = useRef(false);

  useEffect(() => {
    const config = configs[configNumber];
    let newPendulums;
    setPendulums((prev) => {
      if (prev.length > config.length) {
        newPendulums = prev.slice(0, config.length);
      } else {
        const newArray = [];
        for (let i = 0; i < config.length - prev.length; i++) {
          newArray.push(new Pendulum(config[prev.length + i]));
        }
        newPendulums = [...prev, ...newArray];
      }
      return newPendulums;
    });

    if (progress.current === false) progress.current = 1;
    else {
      progress.current = 0;
      newPendulums.forEach((pendulum, index) => {
        pendulum.setNewAngle(config[index].startAngle);
      });
    }
  }, [configNumber]);

  useFrame(() => {
    if (progress.current < 1) {
      progress.current += 0.02;

      pendulums.forEach((pendulum) => {
        pendulum.interpolate(progress.current);
      });
    } else {
      pendulums.forEach((pendulum) => {
        pendulum.update();
      });

      // Collision Check

      pendulums.forEach((pendulum, index) => {
        const leftCollision = pendulum.collisionCheck(pendulums[index - 1]);

        //check left collision:
        if (leftCollision) {
          let impactVelocity;
          const rightCollision = pendulum.collisionCheck(pendulums[index + 1]);
          if (rightCollision) {
            impactVelocity = pendulums[index + 1].swapVelocities(
              pendulums[index - 1]
            );
          } else {
            impactVelocity = pendulum.swapVelocities(pendulums[index - 1]);
          }
          if (impactVelocity > 0.0035) onHitSound(impactVelocity);
        }
      });
    }
  });

  return pendulums;
};
