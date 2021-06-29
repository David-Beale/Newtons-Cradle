const buildData = (rows, cols) => {
  const array = [];
  const xPosStart = -4;
  const yPosStart = -5;
  for (let i = 0; i < rows * cols; i++) {
    array.push({
      id: i + 1,
      xPos: xPosStart + (i % 6) * 1.75,
      yPos: yPosStart + Math.floor(i / 6) * -1.5,
    });
  }
  return array;
};

export const buttonsData = buildData(2, 6);
