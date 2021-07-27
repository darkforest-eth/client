import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import { ShaderMixins } from '../WebGL/ShaderMixins';

const a = {
  position: 'a_position',
  rectPos: 'a_rectPos', // note that this is [+x, +y] to the upper-right
  color: 'a_color',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
  time: 'u_time',
};
const v = {
  color: 'v_color',
  rectPos: 'v_rectPos',
};

export const QUASARRAY_PROGRAM_DEFINITION = {
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
  },
  vertexShader: glsl`
    in vec4 ${a.position};
    in vec4 ${a.color};
    in vec2 ${a.rectPos};

    uniform mat4 ${u.matrix};

    out vec4 ${v.color};
    out vec2 ${v.rectPos};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};

      ${v.color} = ${a.color};
      ${v.rectPos} = ${a.rectPos};
    }
  `,
  fragmentShader: glsl`
    ${ShaderMixins.PI}

    precision highp float;

    in vec4 ${v.color};
    in vec2 ${v.rectPos};

    uniform float ${u.time};

    out vec4 outColor;

    ${ShaderMixins.simplex4}
    ${ShaderMixins.modFloat}
    ${ShaderMixins.mod2pi}
    ${ShaderMixins.arcTan}
    ${ShaderMixins.fade}

    void main() {
      float yP = ${v.rectPos}.y;
      float xP = ${v.rectPos}.x;

      /* calculate positions on noise map, assuming rectPos is [x', y'] */
      float nX = xP / (0.5 * yP);

      float offsetDir = ${v.rectPos}.y > 0. ? -1. : 1.;
      float timeOffset = ${u.time} * 1.5 * offsetDir;
      float nY = yP + timeOffset;

      float nZ = ${u.time};
      vec4 nIn = vec4(nX, nY, nZ, 0.);

      /* calculate noise value */
      float n = snoise(3. * nIn) * 0.5 + 0.7;

      /* calculate alpha from midline using theta */
      float theta = arcTan(yP, xP);
      float dist1 = abs(theta - PI / 2.);
      float dist2 = abs(theta - 3. * PI / 2.);
      float distFromMid = min(dist1, dist2);

      const float interval = PI / 14.;

      float baseAlpha = (distFromMid > interval) ? 0. : 1.;
      float midAlpha = baseAlpha * fade(distFromMid / interval, 0.15);

      /* calculate alpha from height */
      float heightAlpha = fade(abs(yP), 0.8) * fade(abs(yP), 0.3);

      /* calculate total alpha */
      float alpha = midAlpha * heightAlpha;

      /* select color based on noise value */
      vec4 c1 = ${v.color} * 0.95;
      vec4 c2 = ${v.color} * 0.7;
      vec4 c3 = ${v.color} * 0.2;

      vec4 nColor = n > 0.9 ? c1 : n > 0.33 ? c2 : c3;

      /* calculate final color */
      vec4 myColor = nColor;
      myColor.a *= alpha;

      outColor = myColor;
    }
  `,
};
