import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';

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

      vec4 c0 = vec4(0.000, 0.080, 0.320, 1.0);
      vec4 c1 = vec4(0.000, 0.021, 0.170, 1.0);
      vec4 c2 = vec4(0.008, 0.000, 0.024, 1.0);
      vec4 c3 = vec4(0.147, 0.000, 0.141, 1.0);
      vec4 c4 = vec4(1.000, 0.000, 0.000, 1.0);

      float color = ${a.position}.z;

      vec4 myColor = color == 0.0 ? c0 : color == 1.0 ? c1 : color == 2.0 ? c2 : color == 3.0 ? c3 : c4;

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
