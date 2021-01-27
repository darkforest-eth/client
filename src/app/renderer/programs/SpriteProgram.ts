import { AttribType, UniformType } from '../utils/EngineTypes';
import { glsl } from '../utils/EngineUtils';
import { ShaderMixins } from '../webgl/ShaderMixins';

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

export const SPRITE_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
    texture: { name: u.texture, type: UniformType.Texture },
  },
  attribs: {
    position: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.position,
    },
    texcoord: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.texcoord,
    },
    rectPos: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.rectPos,
    },
    color: {
      dim: 4,
      type: AttribType.UByte,
      normalize: true,
      name: a.color,
    },
    shine: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.shine,
    },
    invert: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.invert,
    },
  },
  vertexShader: glsl`
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
  `,
  fragmentShader: glsl`
    precision highp float;
    out vec4 outColor;

    in vec2 ${v.texcoord};
    in vec2 ${v.rectPos};
    in vec4 ${v.color};
    in float ${v.shine};
    in float ${v.invert};

    uniform sampler2D ${u.texture};

    ${ShaderMixins.invertColors}
    ${ShaderMixins.desaturate}

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
      float shine = -0.5 + 12. * ${v.shine};
      float x = ${v.rectPos}.x;
      float y = ${v.rectPos}.y;
      if (abs((x - shine) - 0.25 * (y - 0.5)) < 0.05) {
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
  `,
};
