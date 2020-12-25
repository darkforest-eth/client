import { AttribProps, AttribType } from '../renderer/utils/EngineTypes';
import {
  desaturate,
  glsl,
  invertColors,
  programFromSources,
} from '../renderer/utils/EngineUtils';

const a = {
  position: 'a_position',
  texcoord: 'a_texcoord',
  rectPos: 'a_rectPos',
  color: 'a_color',
  shine: 'a_shine', // -0.5 to 0.5
  invert: 'a_invert',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from screen coords to clipspace
  texture: 'u_texture',
};
const v = {
  texcoord: 'v_texcoord',
  color: 'v_color',
  shine: 'v_shine',
  invert: 'v_invert',
  rectPos: 'v_rectPos',
};

export const spritePosProps: AttribProps = {
  dim: 2,
  type: AttribType.Float,
  normalize: false,
  name: a.position,
};
export const spriteTexProps: AttribProps = {
  dim: 2,
  type: AttribType.Float,
  normalize: false,
  name: a.texcoord,
};
export const spriteRectPosProps: AttribProps = {
  dim: 2,
  type: AttribType.Float,
  normalize: false,
  name: a.rectPos,
};
export const spriteColorProps: AttribProps = {
  dim: 4,
  type: AttribType.UByte,
  normalize: true,
  name: a.color,
};
export const spriteShineProps: AttribProps = {
  dim: 1,
  type: AttribType.Float,
  normalize: false,
  name: a.shine,
};
export const spriteInvertProps: AttribProps = {
  dim: 1,
  type: AttribType.Float,
  normalize: false,
  name: a.invert,
};

const vert = glsl`
  in vec4 ${a.position};
  in vec2 ${a.texcoord};
  in vec4 ${a.color};
  in float ${a.shine};
  in float ${a.invert};
  in vec2 ${a.rectPos};

  uniform mat4 ${u.matrix};

  out vec2 ${v.texcoord};
  out vec4 ${v.color};
  out float ${v.shine};
  out float ${v.invert};
  out vec2 ${v.rectPos};

  void main() {
    gl_Position = ${u.matrix} * ${a.position};
    ${v.texcoord} = ${a.texcoord};
    ${v.color} = ${a.color};
    ${v.shine} = ${a.shine};
    ${v.invert} = ${a.invert};
    ${v.rectPos} = ${a.rectPos};
  }
`;

const frag = glsl`
  precision highp float;
  out vec4 outColor;

  in vec2 ${v.texcoord};
  in vec2 ${v.rectPos};
  in vec4 ${v.color};
  in float ${v.shine};
  in float ${v.invert};

  uniform sampler2D ${u.texture};

  ${invertColors}
  ${desaturate}

  void main() {
    vec4 texel = texture(${u.texture}, ${v.texcoord});

    // initial checks
    if (texel.a < 0.5) discard;
    if (${v.invert} > 0.) texel = invert(texel);

    // see if we should recolor it
    bool shouldColor = ${v.color}.x != 0. || ${v.color}.y != 0. || ${v.color}.z != 0.;
    // if (shouldColor && ${v.color}.a < 1.) discard; // don't do alpha for strokes
    if (shouldColor && texel.a > 0.5) texel = ${v.color};


    // shine
    float x = ${v.rectPos}.x - 0.5;
    float y = ${v.rectPos}.y - 0.5;

    if (abs((-4. * x + y) - ${v.shine}) < 0.15) {
      texel = vec4(1., 1., 1., 1.);
    }


    // desaturate + darken for artifact dex
    float alpha = ${v.color}.a;
    if (alpha < 1.0) {
      texel = desaturate(texel, 0.8);
      texel.rgb *= alpha;
    }

    outColor = texel;
  }
`;

export type SpriteUniforms = {
  matrix: WebGLUniformLocation | null;
  texture: WebGLUniformLocation | null;
};

export type SpriteProgramWithUniforms = {
  program: WebGLProgram;
  uniforms: SpriteUniforms;
};

export const getSpriteProgramAndUniforms = (
  gl: WebGL2RenderingContext
): SpriteProgramWithUniforms => {
  const program = programFromSources(gl, vert, frag);
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
