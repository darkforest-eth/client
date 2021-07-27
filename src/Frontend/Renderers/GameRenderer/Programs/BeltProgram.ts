import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import { ShaderMixins } from '../WebGL/ShaderMixins';

const a = {
  position: 'a_position',
  color: 'a_color',
  rectPos: 'a_rectPos',
  props: 'a_props',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from screen coords to clipspace
  now: 'u_now',
};
const v = {
  color: 'v_color',
  rectPos: 'v_rectPos',
  astRad: 'v_astRad',
  num: 'v_num',
  xRad: 'v_xRad',
  yRad: 'v_yRad',
  perturb: 'v_perturb',
};

export const BELT_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
    now: { name: u.now, type: UniformType.Float },
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
    in vec4 ${a.props};

    uniform mat4 ${u.matrix};

    out vec4 ${v.color};
    out vec2 ${v.rectPos};

    out float ${v.num};
    out float ${v.xRad};
    out float ${v.yRad};
    out float ${v.astRad};
    out float ${v.perturb};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};
      ${v.color} = ${a.color};
      ${v.rectPos} = ${a.rectPos};

      ${v.num} = ${a.props}.x;
      ${v.xRad} = ${a.props}.y;
      ${v.yRad} = ${a.props}.z;
      ${v.astRad} = ${a.props}.w;
      ${v.perturb} = ${a.props}.x > 10. ? 1. : 0.;
    }
  `,
  fragmentShader: glsl`
    ${ShaderMixins.PI}

    precision highp float;
    out vec4 outColor;

    uniform float ${u.now};

    in vec4 ${v.color};
    in vec2 ${v.rectPos};

    in float ${v.num};
    in float ${v.xRad};
    in float ${v.yRad};
    in float ${v.perturb};
    in float ${v.astRad};

    ${ShaderMixins.arcTan}
    ${ShaderMixins.mod2pi}

    void main() {
      float r = ${v.astRad};

      float num = ${v.num};
      float xRad = ${v.xRad};
      float yRad = ${v.yRad};
      // do all calculations in rectPos

      float interval = (2.0 * PI) / num;

      bool disc = true;

      float trueZ = -99.0;
      float trueTheta = 0.0;

      float rX = ${v.rectPos}.x;
      float rY = ${v.rectPos}.y;

      // calculate x, y position
      float theta = ${u.now};
      float x = xRad * cos(theta);
      float y = yRad * sin(theta);

      bool isIn = false;
      vec4 myColor = vec4(1.);

      float distFromCenter = length(${v.rectPos} - vec2(x, y));
      if (distFromCenter < r) {
        myColor = ${v.color};
        isIn = true;
      }


      float eps = r * 0.3;

      if (
        !isIn &&
        pow(rX / (xRad - eps), 2.0) + 
        pow(rY / (yRad - eps), 2.0) > 1. &&
        pow(rX / (xRad + eps), 2.0) + 
        pow(rY / (yRad + eps), 2.0) < 1.
      ) {
        /* this code /should/ let you add a gradient, it's broken because theta1 - theta2
         doesn't take into account that there are two differences (since we're mod 2pi) - fix by adding a min */

        // float posOnArc = arcTan(rY / yRad, rX / xRad);
        // float gradient = (posOnArc - mod2pi(theta)) / (2. * PI); // 0 to 1
        // myColor.rgb = ${v.color}.rgb * (1. - vec3(gradient));
        myColor.rgb = ${v.color}.rgb * 0.8;
        isIn = true;
      }

      float posOnArc = arcTan(rY / yRad, rX / xRad);
      float darken = 0.7 + 0.3 * sin(posOnArc);


      if (!isIn) discard;

      myColor.rgb *= darken;

      outColor = myColor;
    }
  `,
};

export type BeltProps = [number, number, number, number];

// num, xRad, yRad,
export const propsFromIdx = (idx: number): BeltProps => [
  50 + 10 * idx,
  1.7 + 0.7 * idx,
  0.3 + 0.25 * idx,
  0.05,
];
