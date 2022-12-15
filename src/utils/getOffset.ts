export const getOffset = (element) => {
  const {
    top, left, width, height, offsetHeight, offsetWidth, right,
  } = element.getBoundingClientRect();

  return {
    top,
    left: left - width,
    right: right - width,
    width: width || offsetHeight,
    height: height || offsetWidth,
  };
};

export const connect = (prev, target, next) => {
  const offsetBlock1 = getOffset(target);
  const offsetBlock2 = getOffset(prev);

  // x1, y1 - координата угла block1
  const x1 = offsetBlock1.left + offsetBlock1.width;
  const y1 = offsetBlock1.top + offsetBlock1.height / 2;

  // x2, y2 - координата угла block2
  const x2 = offsetBlock2.right + offsetBlock2.width;
  const y2 = offsetBlock2.top + offsetBlock2.height / 2;

  // x2, y2 - координата угла block2
  // const x3 = offsetBlock3.left + offsetBlock3.width;
  // const y3 = offsetBlock3.top;

  // формулу расстояния для расчета расстояния length между двумя углами
  const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

  const cx = ((x1 + x2) / 2) - (length / 2);
  const cy = ((y1 + y2) / 2);

  const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

  return `<div style='height:1px; position:absolute; left:${cx}px; top:${cy}px; width:${length}px; background: black; transform:rotate(${angle}deg);' />`;
};
