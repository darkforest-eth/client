import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import { ShaderMixins } from '../WebGL/ShaderMixins';

const a = {
  position: 'a_position',
  rectPos: 'a_rectPos',
  color: 'a_color',
  weights: 'a_weights',
  props: 'a_props', // leaves, reflect, mvt velocity
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
  time: 'u_time',
};
const v = {
  color: 'v_color',
  rectPos: 'v_rectPos',
  weights: 'v_weights',
  props: 'v_props',
};

export const RUINS_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
    time: { name: u.time, type: UniformType.Float },
  },
  attribs: {
    position: {
      dim: 3,
      type: AttribType.Float,
      normalize: false,
      name: a.position,
    },
    rectPos: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.rectPos,
    },
    color: {
      dim: 3,
      type: AttribType.UByte,
      normalize: true,
      name: a.color,
    },
    weights: {
      dim: 4,
      type: AttribType.Float,
      normalize: false,
      name: a.weights,
    },
    props: {
      dim: 4,
      type: AttribType.Float,
      normalize: false,
      name: a.props,
    },
  },
  vertexShader: glsl`
    in vec4 ${a.position};
    in vec4 ${a.color};
    in vec2 ${a.rectPos};
    in vec4 ${a.weights};
    in vec4 ${a.props};

    uniform mat4 ${u.matrix};

    out vec4 ${v.color};
    out vec2 ${v.rectPos};
    out vec4 ${v.weights};
    out vec4 ${v.props};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};
  
      ${v.color} = ${a.color};
      ${v.rectPos} = ${a.rectPos};
      ${v.weights} = ${a.weights};
      ${v.props} = ${a.props};
    }
  `,
  fragmentShader: glsl`
    ${ShaderMixins.PI}

    precision highp float;

    in vec4 ${v.color};
    in vec2 ${v.rectPos};
    in vec4 ${v.weights};
    in vec4 ${v.props};

    uniform float ${u.time};

    out vec4 outColor;

    ${ShaderMixins.arcTan}
    ${ShaderMixins.modFloat}

    float rotSymmetric(float theta, float segments, bool shouldReflect) {
      float interval = (2. * PI) / segments;
      float midpoint = interval / 2.;
      float modT = modF(theta, interval);

      float tPrime = modT;

      if (shouldReflect) {
        bool isSecond = modT > midpoint;
        if (isSecond) tPrime = midpoint - (modT - midpoint);
      }

      return tPrime;
    }

    // r(t) contour function
    float contour(float tPrime) {
      float w1 = ${v.weights}.x * sin(tPrime + 0.2 * sin(1.1 * ${u.time} + 1.0 * PI));
      float w2 = ${v.weights}.y * cos(tPrime + 0.3 * sin(1.2 * ${u.time} + 1.5 * PI));
      float w3 = 0.8 * ${v.weights}.z * 1. / sin(0.7 * tPrime + sin(0.9 * ${u.time} + 0.5 * PI));
      float w4 = 0.8 * ${v.weights}.w * 1. / cos(0.7 * tPrime + cos(1.3 * ${u.time}));

      return w1 + w2 + w3 + w4;
    }


    void main() {
      // unwrap props - leaves, reflect, mvt velocity
      float numSegments = ${v.props}.x;
      bool shouldReflect = ${v.props}.y > 0.;
      float vel = ${v.props}.z;

      // do calculations
      float r = length(${v.rectPos});
      if (r > 1.) discard;

      float theta = arcTan(${v.rectPos}.y, ${v.rectPos}.x);
      float tPrime = rotSymmetric(theta + ${u.time} * vel, numSegments, shouldReflect);

      /*
      float wiggle1 = 0.3 + 0.2 * cos(2.8 * ${u.time});
      float wiggle2 = 0.7 + 0.3 * sin(1.7 * ${u.time});
      */

      vec4 myColor = vec4(${v.color}.rgb, 0.);
      if (r < contour(tPrime)) myColor.a = 1.;
      if (r < 0.15 * cos(tPrime)) myColor.a = 1.;

      if (myColor.a < 0.5) discard;
      outColor = myColor;
    }
  `,
};
