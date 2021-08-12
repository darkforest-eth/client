import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';

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

export const TEXT_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
    texture: { name: u.texture, type: UniformType.Texture },
  },
  attribs: {
    position: {
      dim: 3,
      type: AttribType.Float,
      normalize: false,
      name: a.position,
    },
    color: {
      dim: 4,
      type: AttribType.UByte,
      normalize: true,
      name: a.color,
    },
    texcoord: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.texcoord,
    },
  },
  vertexShader: glsl`
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
  `,
  fragmentShader: glsl`
    precision highp float;
    out vec4 outColor;

    uniform sampler2D ${u.texture};

    in vec4 ${v.color};
    in vec2 ${v.texcoord};

    void main() {
      vec4 texel = texture(${u.texture}, ${v.texcoord});
      outColor = texel * ${v.color};
    }
  `,
};
