export const getOffset = (element: HTMLElement) => {
  const {
    top, left, width, height, right,
  }: DOMRect = element.getBoundingClientRect();

  return {
    top,
    left: left - width,
    right: right - width,
    width,
    height,
  };
};

export const connect = ({ element, targetElement }: Record<string, HTMLElement>) => {
  const offsetBlock1 = getOffset(targetElement);
  const offsetBlock2 = getOffset(element);

  // x1, y1 - coordinates for angle offsetBlock1
  const x1 = offsetBlock1.left + offsetBlock1.width;
  const y1 = offsetBlock1.top + offsetBlock1.height / 2;

  // x2, y2 - coordinates for angle offsetBlock2
  const x2 = offsetBlock2.right + offsetBlock2.width;
  const y2 = offsetBlock2.top + offsetBlock2.height / 2;

  // formula for getting distance between elements;
  const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

  // getting left and top offset
  const cx = `${((x1 + x2) / 2) - (length / 2)}px`;
  const cy = `${((y1 + y2) / 2)}px`;

  const angle = `${Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI)}deg`;

  return `<div class="line" style="height: 0.5px;position:absolute;left:${cx};top:${cy};width:${length}px;background: #000;rotate:${angle};" />`;
};
