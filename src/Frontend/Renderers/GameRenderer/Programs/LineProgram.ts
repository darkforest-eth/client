import { engineConsts } from '../EngineConsts';
import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';

const a = {
  position: 'a_position',
  color: 'a_color',
  dist: 'a_dist', // cumulative dist so far
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
};
const v = {
  color: 'v_color',
  dist: 'v_dist',
};

export const LINE_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
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
    dist: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.dist,
    },
  },
  vertexShader: glsl`
    in vec4 ${a.position};
    in vec4 ${a.color};
    in float ${a.dist};

    uniform mat4 ${u.matrix};

    out vec4 ${v.color};
    out float ${v.dist};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};

      ${v.color} = ${a.color};
      ${v.dist} = ${a.dist};
    }
  `,
  fragmentShader: glsl`
    precision highp float;
    out vec4 outColor;

    in vec4 ${v.color};
    in float ${v.dist};

    void main() {
      // solid in the 0 regions
      float interval = ${v.dist} / ${engineConsts.dashLength.toFixed(1)};
      float modulo = interval - 2.0 * floor(interval / 2.0);
      bool isGap = modulo > 1.0;

      outColor = isGap ? vec4(0.0, 0.0, 0.0, 0.0) : ${v.color};
    }
  `,
};
