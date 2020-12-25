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
