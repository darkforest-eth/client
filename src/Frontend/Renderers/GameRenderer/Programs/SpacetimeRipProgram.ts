import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import { ShaderMixins } from '../WebGL/ShaderMixins';

const a = {
  position: 'a_position',
  rectPos: 'a_rectPos', // note that this is [+x, +y] to the upper-right
  color: 'a_color',
  inColor1: 'a_inColor1',
  inColor2: 'a_inColor2',
  inColor3: 'a_inColor3',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
  time: 'u_time',
};
const v = {
  color: 'v_color',
  rectPos: 'v_rectPos',
  inColor1: 'v_inColor1',
  inColor2: 'v_inColor2',
  inColor3: 'v_inColor3',
};

export const SPACETIMERIP_PROGRAM_DEFINITION = {
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
    inColor1: {
      dim: 3,
      type: AttribType.UByte,
      normalize: true,
      name: a.inColor1,
    },
    inColor2: {
      dim: 3,
      type: AttribType.UByte,
      normalize: true,
      name: a.inColor2,
    },
    inColor3: {
      dim: 3,
      type: AttribType.UByte,
      normalize: true,
      name: a.inColor3,
    },
  },
  vertexShader: glsl`
    in vec4 ${a.position};
    in vec4 ${a.color};
    in vec2 ${a.rectPos};

    in vec4 ${a.inColor1};
    in vec4 ${a.inColor2};
    in vec4 ${a.inColor3};  

    uniform mat4 ${u.matrix};

    out vec4 ${v.color};
    out vec2 ${v.rectPos};

    out vec4 ${v.inColor1};
    out vec4 ${v.inColor2};
    out vec4 ${v.inColor3};  

    void main() {
      gl_Position = ${u.matrix} * ${a.position};

      
      ${v.color} = ${a.color};
      ${v.inColor1} = ${a.inColor1};
      ${v.inColor2} = ${a.inColor2};
      ${v.inColor3} = ${a.inColor3};

      ${v.rectPos} = ${a.rectPos};
    }
  `,
  fragmentShader: glsl`
    ${ShaderMixins.PI}

    precision highp float;

    in vec4 ${v.color};
    in vec2 ${v.rectPos};

    in vec4 ${v.inColor1};
    in vec4 ${v.inColor2};
    in vec4 ${v.inColor3};  

    uniform float ${u.time};

    out vec4 outColor;

    ${ShaderMixins.simplex4}
    ${ShaderMixins.modFloat}
    ${ShaderMixins.mod2pi}
    ${ShaderMixins.arcTan}
    ${ShaderMixins.fade}
    ${ShaderMixins.blend}

    void main() {
      /* calculate [x, y] from [x, y]' (rectPos) */
      vec2 pos = vec2(${v.rectPos}.x, ${v.rectPos}.y);

      /* calculate [r, theta] from [x, y] */
      float r = length(pos);
      float theta = arcTan(pos.y, pos.x);

      /* offset theta in proportion to r */
      float timeOffset = mod2pi(${u.time}) * 3.;
      float tPrime = theta - 3. * pow(r, 1.4) + timeOffset;

      /* map back onto x, y space */
      float nX = cos(tPrime) * r;
      float nY = sin(tPrime) * r;
      float nZ = ${u.time};
      vec4 nIn = vec4(nX, nY, nZ, 0.);

      float n = snoise(3. * nIn) * 0.5 + 0.7;

      float alpha = n;
      if (r > 1.) alpha = 0.;

      /* calculate edge alpha */
      float edgeAlpha = r > 0.9 ? 0. : 1.;

      /* select color based on noise value */
      vec4 c2 = vec4(${v.color}.rgb + vec3(0.1, 0.1, 0.1), 1.);
      vec4 c1 = vec4(c2.rgb * 1.5, 1.);
      vec4 c3 = vec4(0.);
      vec4 c4 = vec4(0.);

      vec4 nColor = n > 0.9 ? c1 : n > 0.75 ? c2 : n > 0.25 ? c3 : c4;

      /* calculate final color of wormhole bit */
      vec4 warpColor = nColor;
      warpColor.a *= edgeAlpha;

      /* calculate center hole stuff */
      const float holeR = 0.4;

      vec2 nOffset = ${u.time} * vec2(0.5);
      vec4 nInR = 2.0 * vec4(pos + 1.0 * nOffset, 0.5 * ${u.time}, 0.);
      float nR = snoise(nInR) + 0.5 * snoise(2. * nInR);

      vec4 nInG = 2.3 * vec4(pos + 1.2 * nOffset, 0.5 * ${u.time}, 0.) + vec4(17.);
      float nG = snoise(nInG) + 0.5 * snoise(2. * nInG);

      vec4 nInB = 2.6 * vec4(pos + 1.3 * nOffset, 0.5 * ${u.time}, 0.) + vec4(34.); 
      float nB = snoise(nInB) + 0.5 * snoise(2. * nInB);

      vec4 blended = vec4(${v.inColor1} * nR + ${v.inColor2} * nG + ${v.inColor3} * nB);
      vec3 holeRgb = blended.rgb;
      vec3 holeSquash = pow(holeRgb - vec3(0.5), vec3(1.5)) - vec3(0.1);

      vec4 holeColor = vec4(holeSquash, 1.);

      /* apply a color ramp (glow effect) to the wormhole color */
      const float inR = 0.3; const float rFac = 1. / inR;
      float ramp = pow(1. - rFac * (r - holeR), 2.); // 0 to 1

      if (r < holeR + inR) warpColor.rgb *= 1. + (ramp * 2.);

      /* calculate the blended color between holeR and holeR + eps */
      const float eps = 0.05;
      float blendA = (r - holeR) / eps;
      vec4 blendFg = vec4(warpColor.rgb, blendA);
      vec4 blendBg = holeColor;
      
      vec4 blendColor = blend(blendFg, blendBg);

      /* calculate final color */
      vec4 finalColor = r < holeR ? holeColor : r < holeR + eps ? blendColor : warpColor;

      if (finalColor.a < 0.5) discard;
      outColor = finalColor;
    }
  `,
};
