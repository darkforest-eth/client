import { Planet } from '@darkforest_eth/types';
import { RenderZIndex, RGBVec } from './EngineTypes';

/* generic template string which, combined with a vscode package, let us get syntax highlighting. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toStrSafe = (x: any) => (x ? x.toString() : '');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const glsl = (arr: TemplateStringsArray, ...args: any[]): string =>
  '#version 300 es\n' +
  arr.reduce((acc, curr, idx) => {
    return toStrSafe(acc) + toStrSafe(args[idx - 1]) + toStrSafe(curr);
  });

export default class EngineUtils {
  // 12000 is a nicely divisible number, 2pi ensures periodicity
  public static getNow = (): number => (Date.now() / 1000) % (2 * Math.PI * 12000);

  // prettier-ignore
  public static fillTexture(gl: WebGL2RenderingContext) {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
  }

  public static rgbVecToHex(rgb: RGBVec): string {
    const [r, g, b] = rgb;
    const hex = (x: number): string => x.toString(16).padStart(2, '0');
    return `#${hex(r)}${hex(g)}${hex(b)}`;
  }

  private static rotateIndices(b: number[], i: number, j: number, angle: number): void {
    const [x, y] = [b[i], b[j]];
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    b[i] = c * x - s * y;
    b[j] = s * x + c * y;
  }
  // works on 3d quads
  public static rotateQuad(b: number[], angle: number): void {
    EngineUtils.rotateIndices(b, 0, 1, angle);
    EngineUtils.rotateIndices(b, 3, 4, angle);
    EngineUtils.rotateIndices(b, 6, 7, angle);

    EngineUtils.rotateIndices(b, 9, 10, angle);
    EngineUtils.rotateIndices(b, 12, 13, angle);
    EngineUtils.rotateIndices(b, 15, 16, angle);
  }

  public static rotateQuadVec2(b: number[], angle: number): void {
    EngineUtils.rotateIndices(b, 0, 1, angle);
    EngineUtils.rotateIndices(b, 2, 3, angle);
    EngineUtils.rotateIndices(b, 4, 5, angle);

    EngineUtils.rotateIndices(b, 6, 7, angle);
    EngineUtils.rotateIndices(b, 8, 9, angle);
    EngineUtils.rotateIndices(b, 10, 11, angle);
  }

  private static translateIndices(
    b: number[],
    i: number,
    j: number,
    [tx, ty]: [number, number]
  ): void {
    b[i] += tx;
    b[j] += ty;
  }

  public static translateQuad(b: number[], t: [number, number]): void {
    EngineUtils.translateIndices(b, 0, 1, t);
    EngineUtils.translateIndices(b, 3, 4, t);
    EngineUtils.translateIndices(b, 6, 7, t);

    EngineUtils.translateIndices(b, 9, 10, t);
    EngineUtils.translateIndices(b, 12, 13, t);
    EngineUtils.translateIndices(b, 15, 16, t);
  }

  public static translateQuadVec2(b: number[], t: [number, number]): void {
    EngineUtils.translateIndices(b, 0, 1, t);
    EngineUtils.translateIndices(b, 2, 3, t);
    EngineUtils.translateIndices(b, 4, 5, t);

    EngineUtils.translateIndices(b, 6, 7, t);
    EngineUtils.translateIndices(b, 8, 9, t);
    EngineUtils.translateIndices(b, 10, 11, t);
  }

  public static makeEmptyQuad(): number[] {
    return Array(6 * 3).fill(0);
  }

  public static makeEmptyQuadVec2(): number[] {
    return Array(6 * 2).fill(0);
  }

  public static makeEmptyDoubleQuad(): number[] {
    return Array(6 * 2 * 2).fill(0);
  }

  /* makes a 3d quad */
  public static makeQuad(x1: number, y1: number, x2: number, y2: number, z: number): number[] {
    // prettier-ignore
    return [
      x1, y1, z,
      x1, y2, z,
      x2, y1, z,

      x2, y1, z,
      x1, y2, z,
      x2, y2, z
    ];
  }

  /* makes a 3d quad and writes it into buffer b. saves time from GC. */
  // prettier-ignore
  public static makeQuadBuffered (
    b: number[], // quadBuffer
    x1: number, y1: number,
    x2: number, y2: number,
    z: number,
  ): void {
    b[0]  = x1; b[1]  = y1; b[2]  = z;
    b[3]  = x1; b[4]  = y2; b[5]  = z;
    b[6]  = x2; b[7]  = y1; b[8]  = z;

    b[9]  = x2; b[10] = y1; b[11] = z;
    b[12] = x1; b[13] = y2; b[14] = z;
    b[15] = x2; b[16] = y2; b[17] = z;
  }

  /* like above, but 2d */
  public static makeQuadVec2(x1: number, y1: number, x2: number, y2: number): number[] {
    // prettier-ignore
    return [
      x1, y1,
      x1, y2,
      x2, y1,

      x2, y1,
      x1, y2,
      x2, y2,
    ];
  }

  /* like above, but 2d */
  // prettier-ignore
  public static makeQuadVec2Buffered (
    b: number[], // quadBuffer
    x1: number, y1: number,
    x2: number, y2: number,
  ): void {
    b[0] = x1; b[1] = y1;
    b[2] = x1; b[3] = y2;
    b[4] = x2; b[5] = y1;

    b[6] = x2; b[7] = y1;
    b[8] = x1; b[9] = y2;
    b[10] = x2; b[11] = y2;
  }
  /* buffers two 2d rects into a 4d quad. minor perf optimization that saves GPU calls */
  // prettier-ignore
  public static makeDoubleQuadBuffered(
    b: number[],

    ax1: number, ay1: number,
    ax2: number, ay2: number,

    bx1: number, by1: number,
    bx2: number, by2: number,
  ): void {
    b[0]  = ax1; b[1]  = ay1; b[2]  = bx1; b[3]  = by1;
    b[4]  = ax1; b[5]  = ay2; b[6]  = bx1; b[7]  = by2;
    b[8]  = ax2; b[9]  = ay1; b[10] = bx2; b[11] = by1;

    b[12] = ax2; b[13] = ay1; b[14] = bx2; b[15] = by1;
    b[16] = ax1; b[17] = ay2; b[18] = bx1; b[19] = by2;
    b[20] = ax2; b[21] = ay2; b[22] = bx2; b[23] = by2;
  }

  public static getPlanetZIndex = (planet: Planet): number =>
    RenderZIndex.Planets + planet.planetLevel;
}
