import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import configs from "./cfgs";
import Pendulum from "./pendulum";
import sound from "../../Assets/hit3.mp3";
const hitSound = new Audio(sound);

export const usePendulums = (configNumber, soundOn, beamRef) => {
  const onHitSound = (velocity) => {
    if (soundOn === false) return;
    hitSound.currentTime = 0.06;
    hitSound.volume = Math.min(velocity * 50, 1);
    hitSound.play();
  };

  const [pendulums, setPendulums] = useState([]);
  const progress = useRef(false);

  const updatePendulums = (config) => {
    let newPendulums;
    setPendulums((prev) => {
      newPendulums = [...prev];
      if (prev.length > config.length) {
        loop1: for (let i = prev.length - 1; i >= 0; i--) {
          for (let j = 0; j < config.length; j++) {
            if (config[j].id === prev[i].id) continue loop1;
          }
          newPendulums.splice(i, 1);
        }
      } else {
        loop1: for (let i = 0; i < config.length; i++) {
          for (let j = 0; j < prev.length; j++) {
            if (config[i].id === prev[j].id) continue loop1;
          }
          newPendulums.push(new Pendulum(config[i]));
        }
      }
      newPendulums.sort((a, b) => a.id - b.id);
      return newPendulums;
    });
    return newPendulums;
  };

  useEffect(() => {
    const config = configs[configNumber];
    const newPendulums = updatePendulums(config);

    if (progress.current === false) progress.current = 1;
    else {
      progress.current = 0;
      newPendulums.forEach((pendulum, index) => {
        pendulum.setNewAngle(config[index]);
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
        if (pendulum.disabledCollisions) return;
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
