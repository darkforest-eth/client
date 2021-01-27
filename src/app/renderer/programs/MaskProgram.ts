import { AttribType, UniformType } from '../utils/EngineTypes';
import { glsl } from '../utils/EngineUtils';

// mask shader - takes in world coords and spits out red rects
const a = {
  position: 'a_position', // will be a list of quads
  // color: 'a_color',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
};
const v = {
  color: 'v_color',
};

export const MASK_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
  },
  attribs: {
    // xy is pos, z is color
    position: {
      dim: 3,
      type: AttribType.Float,
      normalize: false,
      name: a.position,
    },
  },
  vertexShader: glsl`
    in vec4 ${a.position};

    uniform mat4 ${u.matrix};

    out vec4 ${v.color};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};

      vec4 c1 = vec4(0.030, 0.030, 0.060, 1.0);
      vec4 c2 = vec4(0.125, 0.125, 0.375, 1.0);
      vec4 c3 = vec4(0.140, 0.140, 0.510, 1.0);

      float color = ${a.position}.z;

      vec4 myColor = color == 0.0 ? c1 : color == 1.0 ? c2 : c3;

      ${v.color} = myColor;
    }
  `,
  fragmentShader: glsl`
    precision highp float;
    out vec4 outColor;

    in vec4 ${v.color};

    void main() {
      outColor = ${v.color};
    }
  `,
};
