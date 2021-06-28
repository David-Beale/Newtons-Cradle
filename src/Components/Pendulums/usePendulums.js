import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import configs from "./cfgs";
import Pendulum from "./pendulum";

export const usePendulums = (configNumber, onHitSound) => {
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
          if (Math.abs(pendulum.angle) < 0.05) onHitSound();
          const rightCollision = pendulum.collisionCheck(pendulums[index + 1]);
          if (rightCollision) {
            pendulums[index + 1].swapVelocities(pendulums[index - 1]);
          } else {
            pendulum.swapVelocities(pendulums[index - 1]);
          }
        }
      });
    }
  });

  return pendulums;
};
