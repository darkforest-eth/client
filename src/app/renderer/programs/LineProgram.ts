import { engineConsts } from '../utils/EngineConsts';
import { AttribProps, AttribType, ProgramClosure } from '../utils/EngineTypes';
import { glsl, programFromSources } from '../utils/EngineUtils';

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

// TODO combine this with getMaskProgram in this file somewhere
export const linePosProps: AttribProps = {
  dim: 3,
  type: AttribType.Float,
  normalize: false,
  name: a.position,
};

export const lineColorProps: AttribProps = {
  dim: 3,
  type: AttribType.UByte,
  normalize: true,
  name: a.color,
};

export const lineDistProps: AttribProps = {
  dim: 1,
  type: AttribType.Float,
  normalize: false,
  name: a.dist,
};

const lineVert = glsl`
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
`;

const lineFrag = glsl`
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
`;

export const getLineProgram: ProgramClosure = (() => {
  let program: WebGLProgram | null = null;

  return (gl: WebGL2RenderingContext) => {
    if (program === null) {
      program = programFromSources(gl, lineVert, lineFrag);
      if (program === null) throw 'error compiling line program';
    }

    return program;
  };
})();

export type LineUniforms = {
  matrix: WebGLUniformLocation | null;
};

// TODO combine this with getMaskProgram
export function getLineUniforms(gl: WebGL2RenderingContext): LineUniforms {
  const program = getLineProgram(gl);
  gl.useProgram(program); // may be superfluous;
  return {
    matrix: gl.getUniformLocation(program, u.matrix),
  };
}
