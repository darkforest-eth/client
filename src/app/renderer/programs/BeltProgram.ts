import { AttribType, UniformType } from '../utils/EngineTypes';
import { glsl } from '../utils/EngineUtils';
import { ShaderMixins } from '../webgl/ShaderMixins';

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
    #define PI 3.1415926535

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

    ${ShaderMixins.noiseVec3}
    ${ShaderMixins.radAtAngle}
    ${ShaderMixins.seededRandom}

    float rand(float i, float iter) {
      return seededRandom(i + iter * 100.);
    }

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

      int color = 0;

      float rX = ${v.rectPos}.x;
      float rY = ${v.rectPos}.y;

      float eps = r * 3.0;

      float xBound = xRad + eps;
      float yBound = yRad + eps;

      if (
        pow(rX / (xRad - eps), 2.0) + 
        pow(rY / (yRad - eps), 2.0) < 1. ||
        pow(rX / (xRad + eps), 2.0) + 
        pow(rY / (yRad + eps), 2.0) > 1.
      ) discard;


      for(float i = 0.; i < num; i+= 1.) {
        float tOffset = (i + rand(i, 0.) * ${v.perturb}) * interval;
        float theta = ${u.now} + tOffset;

        float perturb = sin(6.28 * rand(i, 2.) + 0.5 * ${u.now}) * ${v.perturb};
        float x = xRad * cos(theta) + perturb * r;
        float y = yRad * sin(theta) + perturb * r;

        float z = sin(theta); // positive in front

        vec2 dotCenter = vec2(x, y);
        vec2 delVec = ${v.rectPos} - dotCenter;
        float dist = length(delVec);

        float angle = atan(delVec.y, delVec.x) + ${u.now};
        float radAtAngle = radAtAngle(angle, 10. * i);

        float randRad = 0.2 + rand(i, 1.) * 2.0;
        float delRad = 1.0 - 0.3 * sin(theta);


        if (dist < delRad * r * radAtAngle * randRad) {
          disc = false;

          if (z > trueZ) {
            trueZ = z;
            trueTheta = theta;
            if (rand(i, 3.) > 0.5) color = 1;
          }
        }
      }

      if (disc) discard;

      float darken = 0.8 - 0.2 * sin(trueTheta);

      vec4 myColor = vec4(darken * ${v.color}.xyz, 1.0);

      if (color == 1) {
        myColor = vec4(myColor.rgb * 0.4, 1.0);
      }
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
