import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import { ShaderMixins } from '../WebGL/ShaderMixins';

const a = {
  position: 'a_position',
  rectPos: 'a_rectPos',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
  now: 'u_now',
};
const v = {
  rectPos: 'v_rectPos',
};

export const BLACKDOMAIN_PROGRAM_DEFINITION = {
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
    rectPos: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.rectPos,
    },
  },
  vertexShader: glsl`
    in vec4 ${a.position};
    in vec2 ${a.rectPos};

    uniform mat4 ${u.matrix};

    out vec2 ${v.rectPos};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};
      ${v.rectPos} = ${a.rectPos};
    }
  `,
  fragmentShader: glsl`
    precision highp float;
    out vec4 outColor;

    in vec2 ${v.rectPos};

    uniform float ${u.now};

    ${ShaderMixins.simplex4}

    void main() {
      float rx = ${v.rectPos}.x;
      float ry = ${v.rectPos}.y;

      float z = sqrt(1. - pow(rx, 2.) - pow(ry, 2.));

      if (length(${v.rectPos}) > 1.) discard;

      float n = snoise(vec4(rx, ry, z, ${u.now}));

      outColor = vec4(vec3(n), 0.8);
    }
  `,
};
