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

  xRad: 'v_xRad',
  yRad: 'v_yRad',
  delTheta: 'v_delTheta',
};

export const RING_PROGRAM_DEFINITION = {
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
      dim: 3,
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

    out float ${v.xRad};
    out float ${v.yRad};
    out float ${v.delTheta};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};
      ${v.color} = ${a.color};
      ${v.rectPos} = ${a.rectPos};

      ${v.xRad} = ${a.props}.x;
      ${v.yRad} = ${a.props}.y;
      ${v.delTheta} = ${a.props}.z;
    }
  `,
  fragmentShader: glsl`
    ${ShaderMixins.PI}

    precision highp float;
    out vec4 outColor;

    uniform float ${u.now};

    in vec4 ${v.color};
    in vec2 ${v.rectPos};

    in float ${v.xRad};
    in float ${v.yRad};
    in float ${v.delTheta};

    ${ShaderMixins.arcTan}
    ${ShaderMixins.mod2pi}
    ${ShaderMixins.simplex4}

    void main() {
      /* unwrap values */
      float xRad = ${v.xRad};
      float yRad = ${v.yRad};

      float x = ${v.rectPos}.x;
      float y = ${v.rectPos}.y;

      /* define bounds */
      float xIn = xRad - 0.23;
      float xOut = xRad + 0.23;

      float yIn = yRad - 0.07;
      float yOut = yRad + 0.07;

      // discard inner values
      if (pow(x / xIn, 2.) + pow(y / yIn, 2.) < 1.) discard;
      // discard outer values
      if (pow(x / xOut, 2.) + pow(y / yOut, 2.) > 1.) discard;

      /* calculate perlin value */
      float nX = x / xRad; float nY = y / yRad;
      float r = length(vec2(nX, nY));

      float theta = ${u.now} * ${v.delTheta} - 2. * pow(r, 2.5);
      float cosT = cos(theta); float sinT = sin(theta);


      // transform via rotation
      float xP = cosT * nX - sinT * nY;
      float yP = sinT * nX + cosT * nY;

      float n = snoise(2. * vec4(xP, yP, ${u.now} * 0.2 * ${v.delTheta}, 0.));

      // outColor = vec4(vec3(n), 1.);
      if (n > 0.17) discard;
      outColor = ${v.color};
      if (n > -0.1) outColor.rgb *= 0.6;
    }
  `,
};

export type RingProps = [number, number, number];

// xRad, yRad, delTheta
export const propsFromIdx = (idx: number): RingProps => [
  1.7 + 0.7 * idx,
  0.3 + 0.25 * idx,
  1.2 * 0.45 ** idx,
];
