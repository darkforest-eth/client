import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';

const a = {
  position: 'a_position',
  color: 'a_color',
  rectPos: 'a_rectPos',
  strokeX: 'a_strokeX',
  strokeY: 'a_strokeY',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
};
const v = {
  color: 'v_color',
  rectPos: 'v_rectPos',
  strokeX: 'v_strokeX',
  strokeY: 'v_strokeY',
};

export const RECT_PROGRAM_DEFINITION = {
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
    rectPos: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.rectPos,
    },
    strokeX: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.strokeX,
    },
    strokeY: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.strokeY,
    },
  },
  vertexShader: glsl`
    in vec4 ${a.position};
    in vec4 ${a.color};
    in vec2 ${a.rectPos};
    in float ${a.strokeX};
    in float ${a.strokeY};

    uniform mat4 ${u.matrix};

    out vec4 ${v.color};
    out vec2 ${v.rectPos};
    out float ${v.strokeX};
    out float ${v.strokeY};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};

      ${v.color} = ${a.color};
      ${v.rectPos} = ${a.rectPos};
      ${v.strokeX} = ${a.strokeX};
      ${v.strokeY} = ${a.strokeY};
    }
  `,
  fragmentShader: glsl`
    precision highp float;
    out vec4 outColor;

    in vec4 ${v.color};
    in vec2 ${v.rectPos};
    in float ${v.strokeX}; // pct of width that should be stroke
    in float ${v.strokeY}; // pct of height that should be stroke

    void main() {
      bool hasStroke = ${v.strokeX} > 0.0;
      float rx = ${v.rectPos}.x;
      float ry = ${v.rectPos}.y;

      bool xTest = rx > ${v.strokeX} && rx < 1.0 - ${v.strokeX};
      bool yTest = ry > ${v.strokeY} && ry < 1.0 - ${v.strokeY};

      if (hasStroke && xTest && yTest) discard;

      outColor = ${v.color};
    }
  `,
};
