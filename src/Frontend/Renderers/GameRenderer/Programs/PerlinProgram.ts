import { MAX_PERLIN_VALUE } from '@darkforest_eth/hashing';
import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import { ShaderMixins } from '../WebGL/ShaderMixins';

const a = {
  position: 'a_position',

  p0topGrad: 'a_p0topGrad',
  p0botGrad: 'a_p0botGrad',

  p1topGrad: 'a_p1topGrad',
  p1botGrad: 'a_p1botGrad',

  p2topGrad: 'a_p2topGrad',
  p2botGrad: 'a_p2botGrad',

  worldCoords: 'a_worldCoords', // 0 to 1
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
  thresholds: 'u_thresholds',
  lengthScale: 'u_lengthScale',
};
const v = {
  p0topLeftGrad: 'v_p0topLeftGrad',
  p0topRightGrad: 'v_p0topRightGrad',
  p0botLeftGrad: 'v_p0botLeftGrad',
  p0botRightGrad: 'v_p0botRightGrad',

  p1topLeftGrad: 'v_p1topLeftGrad',
  p1topRightGrad: 'v_p1topRightGrad',
  p1botLeftGrad: 'v_p1botLeftGrad',
  p1botRightGrad: 'v_p1botRightGrad',

  p2topLeftGrad: 'v_p2topLeftGrad',
  p2topRightGrad: 'v_p2topRightGrad',
  p2botLeftGrad: 'v_p2botLeftGrad',
  p2botRightGrad: 'v_p2botRightGrad',

  worldCoords: 'v_worldCoords', // 0 to 1
};

const gradProps = {
  dim: 4,
  type: AttribType.Float,
  normalize: false,
};

export const PERLIN_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
    thresholds: { name: u.thresholds, type: UniformType.Vec3 },
    lengthScale: { name: u.lengthScale, type: UniformType.Float },
  },
  attribs: {
    position: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.position,
    },
    worldCoords: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.worldCoords,
    },

    p0topGrad: {
      ...gradProps,
      name: a.p0topGrad,
    },
    p0botGrad: {
      ...gradProps,
      name: a.p0botGrad,
    },

    p1topGrad: {
      ...gradProps,
      name: a.p1topGrad,
    },
    p1botGrad: {
      ...gradProps,
      name: a.p1botGrad,
    },

    p2topGrad: {
      ...gradProps,
      name: a.p2topGrad,
    },
    p2botGrad: {
      ...gradProps,
      name: a.p2botGrad,
    },
  },
  vertexShader: glsl`
    in vec4 ${a.position};

    in vec4 ${a.p0topGrad};
    in vec4 ${a.p0botGrad};
    in vec4 ${a.p1topGrad};
    in vec4 ${a.p1botGrad};
    in vec4 ${a.p2topGrad};
    in vec4 ${a.p2botGrad};

    in vec2 ${a.worldCoords};

    uniform mat4 ${u.matrix};

    out vec2 ${v.p0topLeftGrad};
    out vec2 ${v.p0topRightGrad};
    out vec2 ${v.p0botLeftGrad};
    out vec2 ${v.p0botRightGrad};

    out vec2 ${v.p1topLeftGrad};
    out vec2 ${v.p1topRightGrad};
    out vec2 ${v.p1botLeftGrad};
    out vec2 ${v.p1botRightGrad};

    out vec2 ${v.p2topLeftGrad};
    out vec2 ${v.p2topRightGrad};
    out vec2 ${v.p2botLeftGrad};
    out vec2 ${v.p2botRightGrad};

    out vec2 ${v.worldCoords};

    void main() {
      gl_Position = ${u.matrix} * ${a.position};

      ${v.worldCoords} = ${a.worldCoords};

      ${v.p0topLeftGrad} = ${a.p0topGrad}.xy;
      ${v.p0topRightGrad} = ${a.p0topGrad}.zw;
      ${v.p0botLeftGrad} = ${a.p0botGrad}.xy;
      ${v.p0botRightGrad} = ${a.p0botGrad}.zw;

      ${v.p1topLeftGrad} = ${a.p1topGrad}.xy;
      ${v.p1topRightGrad} = ${a.p1topGrad}.zw;
      ${v.p1botLeftGrad} = ${a.p1botGrad}.xy;
      ${v.p1botRightGrad} = ${a.p1botGrad}.zw;

      ${v.p2topLeftGrad} = ${a.p2topGrad}.xy;
      ${v.p2topRightGrad} = ${a.p2topGrad}.zw;
      ${v.p2botLeftGrad} = ${a.p2botGrad}.xy;
      ${v.p2botRightGrad} = ${a.p2botGrad}.zw;
    }
  `,
  fragmentShader: glsl`
    precision highp float;
    out vec4 outColor;

    in vec2 ${v.p0topLeftGrad};
    in vec2 ${v.p0topRightGrad};
    in vec2 ${v.p0botLeftGrad};
    in vec2 ${v.p0botRightGrad};

    in vec2 ${v.p1topLeftGrad};
    in vec2 ${v.p1topRightGrad};
    in vec2 ${v.p1botLeftGrad};
    in vec2 ${v.p1botRightGrad};

    in vec2 ${v.p2topLeftGrad};
    in vec2 ${v.p2topRightGrad};
    in vec2 ${v.p2botLeftGrad};
    in vec2 ${v.p2botRightGrad};

    in vec2 ${v.worldCoords};

    uniform vec3 ${u.thresholds};
    uniform float ${u.lengthScale};

    ${ShaderMixins.modFloat}

    float perlin(float scale, float x, float y, vec2 blGrad, vec2 brGrad, vec2 tlGrad, vec2 trGrad) {
      float gridX = floor(x / scale) * scale;
      float gridY = floor(y / scale) * scale;

      float px = (x - gridX) / scale;
      float py = (y - gridY) / scale;

      // 0 to 1 within each chunk
      vec2 pos = vec2(px, py); 

      vec2 botLeftDiff = pos - vec2(0., 0.);
      vec2 botRightDiff = pos - vec2(1., 0.);
      vec2 topLeftDiff = pos - vec2(0., 1.);
      vec2 topRightDiff = pos - vec2(1., 1.);

      float botLeft = dot(botLeftDiff, blGrad);
      float botRight = dot(botRightDiff, brGrad);
      float topLeft = dot(topLeftDiff, tlGrad);
      float topRight = dot(topRightDiff, trGrad);

      float botLeftW = pos.x * pos.y;
      float botRightW = (1. - pos.x) * pos.y;
      float topLeftW = pos.x * (1. - pos.y);
      float topRightW = (1. - pos.x) * (1. - pos.y);

      float res = botLeft * topRightW + 
                  botRight * topLeftW + 
                  topLeft * botRightW + 
                  topRight * botLeftW;

      return res;
    }

    void main() {
      float scale = ${u.lengthScale};
      float x = ${v.worldCoords}.x;
      float y = ${v.worldCoords}.y;

      float p0 = perlin(scale * 1., x, y, ${v.p0botLeftGrad}, ${v.p0botRightGrad}, ${v.p0topLeftGrad}, ${v.p0topRightGrad});
      float p1 = perlin(scale * 2., x, y, ${v.p1botLeftGrad}, ${v.p1botRightGrad}, ${v.p1topLeftGrad}, ${v.p1topRightGrad});
      float p2 = perlin(scale * 4., x, y, ${v.p2botLeftGrad}, ${v.p2botRightGrad}, ${v.p2topLeftGrad}, ${v.p2topRightGrad});

      float res = (p0 + p0 + p1 + p2) / 4.;

      float m = ${MAX_PERLIN_VALUE}.;
      float p = res * (m / 2.) + (m / 2.);

      vec4 c0 = vec4(0.000, 0.080, 0.320, 1.0);
      vec4 c1 = vec4(0.000, 0.021, 0.170, 1.0);
      vec4 c2 = vec4(0.008, 0.000, 0.024, 1.0);
      vec4 c3 = vec4(0.000, 0.141, 0.000, 1.0);


      float t1 = ${u.thresholds}.x;
      float t2 = ${u.thresholds}.y;
      float t3 = ${u.thresholds}.z;

      outColor = p < t1 ? c0 : p < t2 ? c1 : p < t3 ? c2 : c3;
    }
  `,
};
