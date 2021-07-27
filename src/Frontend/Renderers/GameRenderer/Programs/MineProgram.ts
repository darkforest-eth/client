import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import { ShaderMixins } from '../WebGL/ShaderMixins';

const a = {
  position: 'a_position',
  color: 'a_color',
  radius: 'a_radius',
  seed: 'a_seed',
  offset: 'a_offset',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from screen coords to clipspace
  now: 'u_now',
};
const v = {
  color: 'v_color',
  darken: 'v_darken',
  seed: 'v_seed',
};

export const MINE_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
    now: { name: u.now, type: UniformType.Float },
  },
  attribs: {
    position: {
      dim: 3,
      type: AttribType.Float,
      normalize: false,
      name: a.position,
    },
    color: {
      dim: 3,
      type: AttribType.UByte,
      normalize: true,
      name: a.color,
    },
    radius: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.radius,
    },
    seed: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.seed,
    },
    offset: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.offset,
    },
  },
  vertexShader: glsl`
    in vec4 ${a.position};
    in vec4 ${a.color};
    in float ${a.radius};
    in float ${a.seed};
    in float ${a.offset};
  
    uniform mat4 ${u.matrix};
    uniform float ${u.now};
  
    out vec4 ${v.color};
    out float ${v.darken}; // between 0 and 1
    out float ${v.seed};
  
    ${ShaderMixins.mod2pi}
  
    void main() {
      float radius = ${a.radius} * 0.5;
  
      float theta = mod2pi(${u.now} + ${a.offset});
  
      // these are all in screen coords
      float dX = 0.7 * ${a.radius} * cos(theta);
      float dY = 0.35 * ${a.radius} * sin(theta);
      float dZ = -0.00001 * sin(theta); // essentially flat
  
      vec4 dVec = vec4(dX, dY, dZ, 0.0);
      vec4 realPos = ${a.position} + dVec;
  
      gl_Position = ${u.matrix} * realPos;
      ${v.color} = ${a.color};
  
      float delRad = 1.0 + 0.3 * sin(theta);
      ${v.darken} = 0.7 + 0.3 * sin(theta);
      gl_PointSize = 2.0 * radius * delRad;
  
      ${v.seed} = ${a.seed};
    }
  `,
  fragmentShader: glsl`
    precision highp float;
    out vec4 outColor;
  
    uniform float ${u.now};
  
    in vec4 ${v.color};
    in float ${v.darken};
    in float ${v.seed};
  
    ${ShaderMixins.noiseVec3}
    ${ShaderMixins.radAtAngle}
    ${ShaderMixins.mod2pi}
    ${ShaderMixins.seededRandom}
  
    void main() {
      vec2 rectPos = 2.0 * gl_PointCoord - vec2(1.0);
  
  
      float angle = atan(rectPos.y, rectPos.x) + ${u.now};
      angle = mod2pi(angle);
      float radAtAngle = radAtAngle(angle, 10. * seededRandom(${v.seed} + length(${v.color})));
  
      if (length(rectPos) > pow(radAtAngle, 2.0)) discard;
  
      outColor = vec4(${v.darken} * ${v.color}.xyz, 1.0);
    }
  `,
};
