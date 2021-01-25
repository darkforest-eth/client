import { AttribProps, AttribType, ProgramClosure } from '../utils/EngineTypes';
import { glsl } from '../utils/EngineUtils';
import ProgramUtils from '../webgl/ProgramUtils';

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

export const rectPosProps: AttribProps = {
  dim: 3,
  type: AttribType.Float,
  normalize: false,
  name: a.position,
};

export const rectColorProps: AttribProps = {
  dim: 3,
  type: AttribType.UByte,
  normalize: true,
  name: a.color,
};

export const rectRectPosProps: AttribProps = {
  dim: 2,
  type: AttribType.Float,
  normalize: false,
  name: a.rectPos,
};

export const rectStrokeXProps: AttribProps = {
  dim: 1,
  type: AttribType.Float,
  normalize: false,
  name: a.strokeX,
};

export const rectStrokeYProps: AttribProps = {
  dim: 1,
  type: AttribType.Float,
  normalize: false,
  name: a.strokeY,
};

const rectVert = glsl`
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
`;

const rectFrag = glsl`
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
`;

export const getRectProgram: ProgramClosure = (() => {
  let program: WebGLProgram | null = null;

  return (gl: WebGL2RenderingContext) => {
    if (program === null) {
      program = ProgramUtils.programFromSources(gl, rectVert, rectFrag);
      if (program === null) throw 'error compiling rect program';
    }

    return program;
  };
})();

export type RectUniforms = {
  matrix: WebGLUniformLocation | null;
};

export function getRectUniforms(gl: WebGL2RenderingContext): RectUniforms {
  const program = getRectProgram(gl);
  gl.useProgram(program); // may be superfluous;
  return {
    matrix: gl.getUniformLocation(program, u.matrix),
  };
}
