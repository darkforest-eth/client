import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import { ShaderMixins } from '../WebGL/ShaderMixins';

const a = {
  position: 'a_position',
  texcoord: 'a_texcoord',
  rectPos: 'a_rectPos',
  color: 'a_color',
  shine: 'a_shine', // -0.5 to 0.5
  invert: 'a_invert',
  mythic: 'a_mythic',
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
  mythic: 'v_mythic',
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
    mythic: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.mythic,
    },
  },
  vertexShader: glsl`
    in vec4 ${a.position};
    in vec2 ${a.texcoord};
    in vec4 ${a.color};
    in float ${a.shine};
    in float ${a.invert};
    in float ${a.mythic};
    in vec2 ${a.rectPos};

    uniform mat4 ${u.matrix};

    out vec2 ${v.texcoord};
    out vec4 ${v.color};
    out float ${v.shine};
    out float ${v.invert};
    out float ${v.mythic};
    out vec2 ${v.rectPos};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};
      ${v.texcoord} = ${a.texcoord};
      ${v.color} = ${a.color};
      ${v.shine} = ${a.shine};
      ${v.invert} = ${a.invert};
      ${v.rectPos} = ${a.rectPos};
      ${v.mythic} = ${a.mythic};
    }
  `,
  fragmentShader: glsl`
    ${ShaderMixins.PI}

    precision highp float;
    out vec4 outColor;

    in vec2 ${v.texcoord};
    in vec2 ${v.rectPos};
    in vec4 ${v.color};
    in float ${v.shine};
    in float ${v.invert};
    in float ${v.mythic};

    uniform sampler2D ${u.texture};

    ${ShaderMixins.invertColors}
    ${ShaderMixins.desaturate}
    ${ShaderMixins.simplex4}

    void main() {
      vec4 texel = texture(${u.texture}, ${v.texcoord});

      // initial checks
      if (texel.a < 0.5) discard;
      if (${v.invert} > 0.) texel = invert(texel);
      if (${v.mythic} > 0.) {
        float theta = ${v.shine} * 2. * PI;

        float x = 8. * (${v.rectPos}.x);
        float y = 2. * (${v.rectPos}.y - 0.5);
        float z = sqrt(1. - y * y);

        float yP = cos(theta) * y + sin(theta) * z;
        float zP = sin(theta) * y - cos(theta) * z;

        vec4 nIn = vec4(x, yP, zP, 0.);

        float rand = snoise(nIn);

        bool isBlack = texel.r < 0.05 && texel.g < 0.05 && texel.b < 0.05;
        bool isWhite = texel.r > 0.95 && texel.g > 0.95 && texel.b > 0.95;

        if (isBlack) { } 
        else if (isWhite) { } 
        else {
          texel.rgb = ((texel.rgb - 0.35) * max(3., 0.)) + 0.35;
          texel.rgb *= 0.5 * rand + 0.6;
        }
      }

      // see if we should recolor it
      bool shouldColor = ${v.color}.x != 0. || ${v.color}.y != 0. || ${v.color}.z != 0.;
      if (shouldColor && texel.a > 0.5) texel.rgb = ${v.color}.rgb;

      // shine
      float shine = -0.5 + 12. * ${v.shine};
      float x = ${v.rectPos}.x;
      float y = ${v.rectPos}.y;
      if (abs((x - shine) - 0.25 * (y - 0.5)) < 0.05) {
        texel = vec4(1., 1., 1., 1.);
      }

      // apply alpha
      if (texel.a > 0.5) {
        texel.a *= ${v.color}.a;
      }

      outColor = texel;
    }
  `,
};
