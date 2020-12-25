import { Planet } from '../../../_types/global/GlobalTypes';
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

// 12000 is a nicely divisible number, 2pi ensures periodicity
export const getNow = (): number => (Date.now() / 1000) % (2 * Math.PI * 12000);

// prettier-ignore
export const fillTexture = (gl: WebGL2RenderingContext) => {
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
};

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    console.error('error creating shader');
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;

  // log errors
  console.error('error compiling shader');
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

/* these are 'includes' that you can add into shader template strings as in `${include}` */

export const desaturate = `
vec4 desaturate(vec4 color, float factor) {
	vec3 lum = vec3(0.299, 0.587, 0.114);
	vec3 gray = vec3(dot(lum, color.rgb));
	return vec4(mix(color.rgb, gray, factor), color.a);
}`;

// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
// generic 3d noise seems to output from 0 to 1
export const noiseVec3 = `
  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

  float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
  }
`;

/* returns radius of a blob at angle theta as a float from 0 to 1. requires the above guy (noiseVec3)
   used for asteroids and belts. */
export const radAtAngle = `
float radAtAngle(float angle, float offset) {
  vec2 ptOnCircle = vec2(cos(angle), sin(angle));
  float noiseAtAngle = 0.5 * noise(vec3(0.8 * ptOnCircle, offset));
  return 1.0 - noiseAtAngle;
}
`;

/* clips a float to be mod 2pi. useful because sin() and cos() sometimes get mad otherwise. */
export const mod2pi = `
float mod2pi(float theta) {
  float twoPi = 6.283185307;
  return theta - twoPi * floor(theta / twoPi);
}
`;

/* 4d simplex noise */
// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83

export const simplex4 = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

vec4 grad4(float j, vec4 ip){
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; 

  return p;
}

float snoise(vec4 v){
  const vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4
                        0.309016994374947451); // (sqrt(5) - 1)/4   F4
// First corner
  vec4 i  = floor(v + dot(v, C.yyyy) );
  vec4 x0 = v -   i + dot(i, C.xxxx);

// Other corners

// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;

  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
//  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;

//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;

  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C 
  vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
  vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
  vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
  vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

// Permutations
  i = mod(i, 289.0); 
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
// Gradients
// ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
// 7*7*6 = 294, which is close to the ring size 17*17 = 289.

  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

// Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

// Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;

}
`;

// useful seeded random function
export const shaderSeededRandom = `
  float seededRandom(float s) {
    return fract(sin(s) * 7626.1234);
  }
`;

// inverts colors
export const invertColors = `
  vec4 invert(vec4 cin) {
    return vec4(1. - cin.r, 1. - cin.g, 1. - cin.b, cin.a);
  }
`;

export const rgbVecToHex = (rgb: RGBVec): string => {
  const [r, g, b] = rgb;
  const hex = (x: number): string => x.toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) {
    console.error('error creating program');
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;

  // log errors
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

// adds line numbers to a string. useful for debugging shaders
const withLineNums = (shader: string): string =>
  shader
    .split('\n')
    .reduce((acc, curr, i) => acc + `[${i}] ` + curr + '\n', '');

export function programFromSources(
  gl: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragShaderSource: string
): WebGLProgram | null {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);

  if (!vertexShader || !fragShader) {
    console.error('shader compile error: ', !!vertexShader, !!fragShader);
    console.log('vertex', withLineNums(vertexShaderSource));
    console.log('fragment', withLineNums(fragShaderSource));
    return null;
  }

  const program = createProgram(gl, vertexShader, fragShader);
  if (!program) console.error('error creating program');

  return program;
}

function rotateIndices(b: number[], i: number, j: number, angle: number): void {
  const [x, y] = [b[i], b[j]];
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  b[i] = c * x - s * y;
  b[j] = s * x + c * y;
}

// works on 3d quads
export const rotateQuad = (b: number[], angle: number): void => {
  rotateIndices(b, 0, 1, angle);
  rotateIndices(b, 3, 4, angle);
  rotateIndices(b, 6, 7, angle);

  rotateIndices(b, 9, 10, angle);
  rotateIndices(b, 12, 13, angle);
  rotateIndices(b, 15, 16, angle);
};

function translateIndices(
  b: number[],
  i: number,
  j: number,
  [tx, ty]: [number, number]
): void {
  b[i] += tx;
  b[j] += ty;
}

export const translateQuad = (b: number[], t: [number, number]): void => {
  translateIndices(b, 0, 1, t);
  translateIndices(b, 3, 4, t);
  translateIndices(b, 6, 7, t);

  translateIndices(b, 9, 10, t);
  translateIndices(b, 12, 13, t);
  translateIndices(b, 15, 16, t);
};

/* makes a 3d quad */
// prettier-ignore
export const makeQuad = (
  x1: number, y1: number,
  x2: number, y2: number,
  z: number,
): number[] => [
  x1, y1, z,
  x1, y2, z,
  x2, y1, z,

  x2, y1, z,
  x1, y2, z,
  x2, y2, z
];

/* makes a 3d quad and writes it into buffer b. saves time from GC. */
// prettier-ignore
export const makeQuadBuffered = (
  b: number[], // quadBuffer
  x1: number, y1: number,
  x2: number, y2: number,
  z: number,
): void => {
  b[0]  = x1; b[1]  = y1; b[2]  = z;
  b[3]  = x1; b[4]  = y2; b[5]  = z;
  b[6]  = x2; b[7]  = y1; b[8]  = z;

  b[9]  = x2; b[10] = y1; b[11] = z;
  b[12] = x1; b[13] = y2; b[14] = z;
  b[15] = x2; b[16] = y2; b[17] = z;
}

/* like above, but 2d */
// prettier-ignore
export const makeQuadVec2 = (
  x1: number, y1: number,
  x2: number, y2: number,
): number[] => [
  x1, y1, 
  x1, y2, 
  x2, y1, 

  x2, y1, 
  x1, y2, 
  x2, y2,
];

/* like above, but 2d */
// prettier-ignore
export const makeQuadVec2Buffered = (
  b: number[], // quadBuffer
  x1: number, y1: number,
  x2: number, y2: number,
): void => {
  b[0] = x1; b[1] = y1;
  b[2] = x1; b[3] = y2;
  b[4] = x2; b[5] = y1;

  b[6] = x2; b[7] = y1;
  b[8] = x1; b[9] = y2;
  b[10] = x2; b[11] = y2;
};

/* buffers two 2d rects into a 4d quad. minor perf optimization that saves GPU calls */
// prettier-ignore
export const makeDoubleQuadBuffered = (
  b: number[],

  ax1: number, ay1: number,
  ax2: number, ay2: number,

  bx1: number, by1: number,
  bx2: number, by2: number,
): void => {
  b[0]  = ax1; b[1]  = ay1; b[2]  = bx1; b[3]  = by1;
  b[4]  = ax1; b[5]  = ay2; b[6]  = bx1; b[7]  = by2;
  b[8]  = ax2; b[9]  = ay1; b[10] = bx2; b[11] = by1;

  b[12] = ax2; b[13] = ay1; b[14] = bx2; b[15] = by1;
  b[16] = ax1; b[17] = ay2; b[18] = bx1; b[19] = by2;
  b[20] = ax2; b[21] = ay2; b[22] = bx2; b[23] = by2;
}

export const getPlanetZIndex = (planet: Planet): number =>
  RenderZIndex.Planets + planet.planetLevel;
