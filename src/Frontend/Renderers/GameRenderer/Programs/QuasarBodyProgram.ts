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

export const QUASARBODY_PROGRAM_DEFINITION = {
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
      /* calculate [x, y] from [x, y]' (rectPos) */

      vec2 pos = vec2(${v.rectPos}.x, ${v.rectPos}.y * 3.0);

      /* calculate [r, theta] from [x, y] */
      float r = length(pos);
      float theta = arcTan(pos.y, pos.x);

      /* offset theta in proportion to r */
      float timeOffset = mod2pi(${u.time}) * 2.;
      float tPrime = theta - 3. * pow(r, 1.4) + timeOffset;

      /* map back onto x, y space */
      float nX = cos(tPrime) * r;
      float nY = sin(tPrime) * r;
      float nZ = ${u.time};
      vec4 nIn = vec4(nX, nY, nZ, 0.);

      float n = snoise(3. * nIn) * 0.5 + 0.7;

      // outColor = ${v.color};
      float alpha = n;
      if (r > 1.) alpha = 0.;

      /* calculate edge alpha */
      float edgeAlpha = r > 1. ? 0. : 1.;
      edgeAlpha *= fade(r, 0.1);

      /* select color based on noise value */
      vec4 c1 = vec4(${v.color}.rgb * 1.2, 0.95);
      vec4 c2 = ${v.color} * 0.7;
      vec4 c3 = ${v.color} * 0.2;
      vec4 c4 = vec4(0.);

      vec4 nColor = n > 0.85 ? c1 : n > 0.50 ? c2 : n > 0.25 ? c3 : c4;

      /* calculate final color */
      vec4 myColor = nColor;
      myColor.a *= edgeAlpha;

      outColor = myColor;
    }
  `,
};
