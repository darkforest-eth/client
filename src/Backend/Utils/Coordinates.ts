import { CanvasCoords, WorldCoords } from '@darkforest_eth/types';

export const coordsEqual = (a: WorldCoords, b: WorldCoords): boolean => a.x === b.x && a.y === b.y;

export const distL2 = (a: CanvasCoords | WorldCoords, b: CanvasCoords | WorldCoords): number =>
  (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

export const vectorLength = (a: CanvasCoords | WorldCoords): number =>
  Math.sqrt(a.x ** 2 + a.y ** 2);

export const normalizeVector = (a: WorldCoords): WorldCoords => {
  const len = vectorLength(a);

  if (len < 0.00001) return a; // prevent div by 0

  return {
    x: a.x / len,
    y: a.y / len,
  };
};

export const scaleVector = (a: WorldCoords, k: number) => {
  const norm = normalizeVector(a);
  const len = vectorLength(a);

  return {
    x: norm.x * k * len,
    y: norm.y * k * len,
  };
};
