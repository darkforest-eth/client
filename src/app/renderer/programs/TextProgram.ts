import { AttribProps, AttribType, ProgramClosure } from '../utils/EngineTypes';
import { glsl, programFromSources } from '../utils/EngineUtils';

const a = {
  position: 'a_position',
  color: 'a_color',
  texcoord: 'a_texcoord',
};
const u = {
  matrix: 'u_matrix',
  texture: 'u_texture',
};
const v = {
  color: 'v_color',
  texcoord: 'v_texcoord',
};

export const textPosProps: AttribProps = {
  dim: 3,
  type: AttribType.Float,
  normalize: false,
  name: a.position,
};

export const textColorProps: AttribProps = {
  dim: 4,
  type: AttribType.UByte,
  normalize: true,
  name: a.color,
};

export const textTexcoordProps: AttribProps = {
  dim: 2,
  type: AttribType.Float,
  normalize: false,
  name: a.texcoord,
};

const textVert = glsl`
  in vec4 ${a.position};
  in vec4 ${a.color};
  in vec2 ${a.texcoord};

  uniform mat4 ${u.matrix};

  out vec4 ${v.color};
  out vec2 ${v.texcoord};

  void main() {
    gl_Position = ${u.matrix} * ${a.position};

    ${v.color} = ${a.color};
    ${v.texcoord} = ${a.texcoord};
  }
`;

const textFrag = glsl`
  precision highp float;
  out vec4 outColor;

  uniform sampler2D ${u.texture};

  in vec4 ${v.color};
  in vec2 ${v.texcoord};

  void main() {
    vec4 texel = texture(${u.texture}, ${v.texcoord});
    outColor = texel * ${v.color};
  }
`;

export const getTextProgram: ProgramClosure = (() => {
  let program: WebGLProgram | null = null;

  return (gl: WebGL2RenderingContext) => {
    if (program === null) {
      program = programFromSources(gl, textVert, textFrag);
      if (program === null) throw 'error compiling text program';
    }

    return program;
  };
})();

export type RectUniforms = {
  matrix: WebGLUniformLocation | null;
  texture: WebGLUniformLocation | null;
};

export function getTextUniforms(gl: WebGL2RenderingContext): RectUniforms {
  const program = getTextProgram(gl);
  gl.useProgram(program); // may be superfluous;
  return {
    matrix: gl.getUniformLocation(program, u.matrix),
    texture: gl.getUniformLocation(program, u.texture),
  };
}
