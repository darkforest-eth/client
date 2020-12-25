import { AttribProps, AttribType } from '../utils/EngineTypes';
import { glsl, programFromSources } from '../utils/EngineUtils';
// isn't used anywhere, mostly this is used for copy-pasting. later we will make it a proper class
const a = {
  position: 'a_position',
  color: 'a_color',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from screen coords to clipspace
};
const v = {
  color: 'v_color',
};

export const genPosProps: AttribProps = {
  dim: 3,
  type: AttribType.Float,
  normalize: false,
  name: a.position,
};
export const genColorProps: AttribProps = {
  dim: 3,
  type: AttribType.UByte,
  normalize: true,
  name: a.color,
};

const vert = glsl`
  in vec4 ${a.position};
  in vec4 ${a.color};

  uniform mat4 ${u.matrix};

  out vec4 ${v.color};

  void main() {
    gl_Position = ${u.matrix} * ${a.position};
    ${v.color} = ${a.color};
  }
`;

const frag = glsl`
  precision highp float;
  out vec4 outColor;

  in vec4 ${v.color};

  void main() {
    outColor = ${v.color};
  }
`;

export type GenericUniforms = {
  matrix: WebGLUniformLocation | null;
};

export type GenericProgramWithUniforms = {
  program: WebGLProgram;
  uniforms: GenericUniforms;
};

export const getGenericProgramAndUniforms = (
  gl: WebGL2RenderingContext
): GenericProgramWithUniforms => {
  const program = programFromSources(gl, vert, frag);
  if (program === null) throw 'error compiling planet program';

  gl.useProgram(program); // may be superfluous;
  const uniforms = {
    matrix: gl.getUniformLocation(program, u.matrix),
  };

  return {
    program,
    uniforms,
  };
};
