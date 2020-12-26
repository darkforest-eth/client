// TODO we should do the &never TS thing for world / canvas coords; as this is a common source of bugs

export interface WorldCoords {
  x: number;
  y: number;
}

export const compareWorldCoords = (a: WorldCoords, b: WorldCoords): boolean =>
  a.x === b.x && a.y === b.y;

export interface CanvasCoords {
  x: number;
  y: number;
}

export const distL2 = (
  a: CanvasCoords | WorldCoords,
  b: CanvasCoords | WorldCoords
): number => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

// returns pythagorean dist for this vector
export const vecLen = (a: CanvasCoords | WorldCoords): number =>
  Math.sqrt(a.x ** 2 + a.y ** 2);

// returns the vector with len 1
export const normalize = (a: WorldCoords): WorldCoords => {
  const len = vecLen(a);

  if (len < 0.00001) return a; // prevent div by 0

  return {
    x: a.x / len,
    y: a.y / len,
  };
};

// returns vector scaled by k
export const vecScale = (a: WorldCoords, k: number) => {
  const norm = normalize(a);
  const len = vecLen(a);

  return {
    x: norm.x * k * len,
    y: norm.y * k * len,
  };
};
