import { Fraction, getRandomGradientAt, PerlinConfig, rand } from '@darkforest_eth/hashing';
import { WorldCoords } from '@darkforest_eth/types';
import { Rectangle } from '../../../../_types/global/GlobalTypes';

/* types */
type Vector = { x: number; y: number };
export const valueOf = (v: Vector): [number, number] => [v.x.valueOf(), v.y.valueOf()];

export type PerlinRand = ReturnType<typeof rand>;

export type GridPoint = WorldCoords & { __value: never };

export const enum PerlinOctave {
  _0 = 0,
  _1 = 1,
  _2 = 2,
}

/* grid point / rect utils */
export function right(topLeft: GridPoint, scale: number): GridPoint {
  return { x: topLeft.x + scale, y: topLeft.y } as GridPoint;
}

export function up(topLeft: GridPoint, scale: number): GridPoint {
  return { x: topLeft.x, y: topLeft.y + scale } as GridPoint;
}

export function isGridPoint(coords: WorldCoords, scale: number): coords is GridPoint {
  const isGrid = coords.x % scale === 0 && coords.y % scale === 0;
  if (!isGrid) throw 'tried to get gradient of a non-grid point!';

  return isGrid;
}

export function getGridPoint(bottomLeft: WorldCoords, scale: number): GridPoint {
  const { x, y } = bottomLeft;
  return {
    x: Math.floor(x / scale) * scale,
    y: Math.floor(y / scale) * scale,
  } as GridPoint;
}

export function getPerlinChunks(footprint: Rectangle, lengthScale: number): Iterable<Rectangle> {
  const { bottomLeft, sideLength } = footprint;
  if (sideLength <= lengthScale) throw 'getPerlinChunks called on a small chunk';

  const perlinChunks: Set<Rectangle> = new Set();

  perlinChunks.add(footprint);

  for (let x = bottomLeft.x; x < bottomLeft.x + sideLength; x += lengthScale) {
    for (let y = bottomLeft.y; y < bottomLeft.y + sideLength; y += lengthScale) {
      perlinChunks.add({ bottomLeft: { x, y }, sideLength: lengthScale });
    }
  }

  return perlinChunks;
}

/* gradient caching */
function gradientKey(coords: GridPoint, config: PerlinConfig, pow: PerlinOctave): string {
  return `${config.key}-${config.scale}-${pow}-${coords.x}-${coords.y}`;
}

const gradientCache: Map<string, Vector> = new Map();

const randFns: { [k: number]: PerlinRand } = {};

export function getCachedGradient(
  coords: GridPoint,
  config: PerlinConfig,
  pow: PerlinOctave
): Vector {
  const { scale, key } = config;
  const gradKey = gradientKey(coords, config, pow);

  let myRand = randFns[key];
  if (!myRand) {
    myRand = rand(key);
    randFns[key] = myRand;
  }

  const cached = gradientCache.get(gradKey);
  if (cached) return cached;

  const res = getRandomGradientAt(
    { x: new Fraction(coords.x), y: new Fraction(coords.y) },
    new Fraction(scale * 2 ** pow),
    myRand
  );

  const ret = { x: res.x.valueOf(), y: res.y.valueOf() };
  gradientCache.set(gradKey, ret);

  return ret;
}
