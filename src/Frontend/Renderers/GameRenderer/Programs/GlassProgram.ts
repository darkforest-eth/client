import { AttribProps, AttribType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import ProgramUtils from '../WebGL/ProgramUtils';

const a = {
  position: 'a_position',
  texcoord: 'a_texcoord',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from screen coords to clipspace
  texture: 'u_texture',
};
const v = {
  texcoord: 'v_texcoord',
};

export const glassPosProps: AttribProps = {
  dim: 2,
  type: AttribType.Float,
  normalize: false,
  name: a.position,
};
export const glassTexProps: AttribProps = {
  dim: 2,
  type: AttribType.Float,
  normalize: false,
  name: a.texcoord,
};

const vert = glsl`
  in vec4 ${a.position};
  in vec2 ${a.texcoord};

  uniform mat4 ${u.matrix};

  out vec2 ${v.texcoord};

  void main() {
    gl_Position = ${u.matrix} * ${a.position};
    ${v.texcoord} = ${a.texcoord};
  }
`;

const frag = glsl`
  precision highp float;
  out vec4 outColor;

  in vec2 ${v.texcoord};

  uniform sampler2D ${u.texture};

  void main() {
    vec4 texel = texture(${u.texture}, ${v.texcoord});

    if (texel.a < 0.5) discard;
    texel = vec4(1.);
 
    outColor = texel;
  }
`;

export type GlassUniforms = {
  matrix: WebGLUniformLocation | null;
  texture: WebGLUniformLocation | null;
};

export type GlassProgramWithUniforms = {
  program: WebGLProgram;
  uniforms: GlassUniforms;
};

export const getGlassProgramAndUniforms = (
  gl: WebGL2RenderingContext
): GlassProgramWithUniforms => {
  const program = ProgramUtils.programFromSources(gl, vert, frag);
  if (program === null) throw 'error compiling planet program';

  gl.useProgram(program); // may be superfluous;
  const uniforms = {
    matrix: gl.getUniformLocation(program, u.matrix),
    texture: gl.getUniformLocation(program, u.texture),
  };

  return {
    program,
    uniforms,
  };
};
