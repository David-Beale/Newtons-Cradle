const buildCfg12 = (num) => {
  let array = [];
  let zPos = -9.5;
  let len = 1.5;
  for (let i = 0; i < num; i++) {
    array.push({
      id: num - i,
      xPos: 0,
      zPos,
      startAngle: Math.PI / 4,
      disabledCollisions: true,
      len,
      color: 1,
    });
    zPos += 1;
    len -= 0.05;
  }
  array.reverse();
  return array;
};

const configs = {
  1: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: 0 },
    { id: 3, xPos: 0.0, startAngle: 0 },
    { id: 4, xPos: -1, startAngle: 0 },
    { id: 5, xPos: -2, startAngle: 0 },
  ],
  2: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: Math.PI / 4, color: 1 },
    { id: 3, xPos: 0.0, startAngle: 0 },
    { id: 4, xPos: -1, startAngle: 0 },
    { id: 5, xPos: -2, startAngle: 0 },
  ],
  3: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: Math.PI / 4, color: 1 },
    { id: 3, xPos: 0.0, startAngle: Math.PI / 4, color: 1 },
    { id: 4, xPos: -1, startAngle: 0 },
    { id: 5, xPos: -2, startAngle: 0 },
  ],
  4: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: 0 },
    { id: 3, xPos: 0.0, startAngle: 0 },
    { id: 4, xPos: -1, startAngle: 0 },
    { id: 5, xPos: -2, startAngle: -Math.PI / 4, color: 1 },
  ],
  5: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: Math.PI / 4, color: 1 },
    { id: 3, xPos: 0.0, startAngle: 0 },
    { id: 4, xPos: -1, startAngle: -Math.PI / 4, color: 1 },
    { id: 5, xPos: -2, startAngle: -Math.PI / 4, color: 1 },
  ],
  6: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: Math.PI / 4, color: 1 },
    { id: 3, xPos: 0.0, startAngle: Math.PI / 4, color: 1 },
    { id: 4, xPos: -1, startAngle: -Math.PI / 4 },
    { id: 5, xPos: -2, startAngle: -Math.PI / 4 },
  ],
  7: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: Math.PI / 4, color: 1 },
    { id: 3, xPos: 0.0, startAngle: Math.PI / 4, color: 1 },
    { id: 4, xPos: -1, startAngle: 0 },
    { id: 5, xPos: -2, startAngle: -Math.PI / 4, color: 1 },
  ],
  8: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: Math.PI / 4, color: 1 },
    { id: 3, xPos: 0.0, startAngle: 0 },
    { id: 4, xPos: -1, startAngle: 0 },
    { id: 5, xPos: -2, startAngle: -Math.PI / 4, color: 1 },
  ],
  9: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: 0 },
    // id:3, { xPos: 0.0, startAngle: 0 },
    { id: 4, xPos: -1, startAngle: 0 },
    { id: 5, xPos: -2, startAngle: -Math.PI / 4, color: 1 },
  ],
  10: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, vel: -0.01, color: 1 },
    { id: 2, xPos: 1, startAngle: 0 },
    { id: 3, xPos: 0.0, startAngle: 0 },
    { id: 4, xPos: -1, startAngle: 0 },
    { id: 5, xPos: -2, startAngle: -Math.PI / 4, color: 1 },
  ],
  11: [
    { id: 1, xPos: 2, startAngle: Math.PI / 4, color: 1 },
    { id: 2, xPos: 1, startAngle: Math.PI / 6, vel: -0.01 },
    { id: 3, xPos: 0.0, startAngle: 0 },
    { id: 4, xPos: -1, startAngle: -Math.PI / 6, vel: 0.01 },
    { id: 5, xPos: -2, startAngle: -Math.PI / 4, color: 1 },
  ],
  12: buildCfg12(15),
};

export default configs;
