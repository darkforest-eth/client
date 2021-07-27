import { Biome, Planet } from '@darkforest_eth/types';
import { isLocatable } from '../../../../_types/global/GlobalTypes';
import { AttribType, UniformType } from '../EngineTypes';
import { glsl } from '../EngineUtils';
import { ShaderMixins } from '../WebGL/ShaderMixins';

const a = {
  position: 'a_position',
  color: 'a_color',
  color2: 'a_color2',
  color3: 'a_color3',
  rectPos: 'a_rectPos',
  props2: 'a_props2',
  props: 'a_props',
};
const u = {
  matrix: 'u_matrix',
  timeMatrix: 'u_timeMatrix', // TODO generate this in the shader
  time: 'u_time',
};
const v = {
  position: 'v_position',
  color: 'v_color',
  color2: 'v_color2',
  color3: 'v_color3',
  rectPos: 'v_rectPos',
  seed: 'v_seed',
  eps: 'v_eps', // epsilon; clipspace of one pixel
  alpha: 'v_alpha',
  distort: 'v_distort',
  // props
  morphSpeed: 'v_morphSpeed',
  numClouds: 'v_numClouds',
  octaves: 'v_octaves',
  showBeach: 'v_showBeach',
};

export const PLANET_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
    timeMatrix: { name: u.timeMatrix, type: UniformType.Mat4 },
    time: { name: u.time, type: UniformType.Float },
  },
  attribs: {
    position: {
      dim: 3,
      name: a.position,
      type: AttribType.Float,
      normalize: false,
    },
    rectPos: {
      dim: 2,
      name: a.rectPos,
      type: AttribType.Float,
      normalize: false,
    },
    color: {
      dim: 3,
      name: a.color,
      type: AttribType.UByte,
      normalize: true,
    },
    color2: {
      dim: 3,
      name: a.color2,
      type: AttribType.UByte,
      normalize: true,
    },
    color3: {
      dim: 3,
      name: a.color3,
      type: AttribType.UByte,
      normalize: true,
    },
    // props = [octaves (int), numClouds (int), morphSpeed, showBeach (bool)]
    props: {
      dim: 4,
      name: a.props,
      type: AttribType.Float,
      normalize: false,
    },
    // [seed, eps, alpha, distort]
    props2: {
      dim: 4,
      name: a.props2,
      type: AttribType.Float,
      normalize: false,
    },
  },

  vertexShader: glsl`
    in vec4 ${a.position};
    in vec4 ${a.color};
    in vec4 ${a.color2};
    in vec4 ${a.color3};
    in vec2 ${a.rectPos};
    in vec4 ${a.props2};
    in vec4 ${a.props};

    uniform mat4 ${u.matrix};

    out vec4 ${v.position};
    out vec4 ${v.color};
    out vec4 ${v.color2};
    out vec4 ${v.color3};
    out vec2 ${v.rectPos};
    out float ${v.seed};
    out float ${v.eps};
    out float ${v.alpha};
    out float ${v.distort};

    out float ${v.octaves};
    out float ${v.numClouds};
    out float ${v.morphSpeed};
    out float ${v.showBeach};

    void main() {
      vec4 realPos = ${u.matrix} * ${a.position};
      gl_Position = realPos;

      // pass down attrs into varyings
      ${v.position} = ${a.position};
      ${v.color} = ${a.color};
      ${v.color2} = ${a.color2};
      ${v.color3} = ${a.color3};
      ${v.rectPos} = ${a.rectPos};

      // unwrap props2
      ${v.seed} = ${a.props2}.x;
      ${v.eps} = ${a.props2}.y;
      ${v.alpha} = ${a.props2}.z;
      ${v.distort} = ${a.props2}.w;

      // unwrap props
      ${v.octaves} = ${a.props}.x;
      ${v.numClouds} = ${a.props}.y;
      ${v.morphSpeed} = ${a.props}.z;
      ${v.showBeach} = ${a.props}.w;
    }
  `,

  fragmentShader: glsl`
    ${ShaderMixins.PI}

    precision highp float;
    in vec4 ${v.position};
    in vec4 ${v.color};
    in vec4 ${v.color2};
    in vec4 ${v.color3};
    in vec2 ${v.rectPos};
    in float ${v.seed};
    in float ${v.eps};
    in float ${v.alpha};
    in float ${v.distort};

    in float ${v.octaves};
    in float ${v.numClouds};
    in float ${v.morphSpeed};
    in float ${v.showBeach};

    uniform mat4 ${u.timeMatrix};
    uniform float ${u.time};

    out vec4 outColor;

    ${ShaderMixins.simplex4}
    ${ShaderMixins.seededRandom}
    ${ShaderMixins.blend}
    ${ShaderMixins.arcTan}

    float r = 1.0;
    float inR = 0.9;

    // returns [rho, theta, phi]
    vec3 getSpherical(vec3 coords) {
      float x = coords.x; float y = coords.y; float z = coords.z;
      float rho = length(coords);

      float theta = arcTan(y, x);
      float phi = acos(z / rho);

      return vec3(rho, theta, phi);
    }


    // f([x, y, z]) -> [0, 1]
    float blobFn(vec3 coords) {
      float distort = ${v.distort};
      vec4 rot = ${u.timeMatrix} * vec4(coords, 1.);
      float n = snoise(vec4(rot.xyz * 1.5, ${u.time} * (1.2 - 8. * distort)));
      return (1. - distort) + distort * n;
    }

    float blobAtSpherical(float rho, float theta, float phi) {
      float x = rho * sin(phi) * cos(theta);
      float y = rho * sin(phi) * sin(theta);
      float z = rho * cos(phi);

      return blobFn(vec3(x, y, z));
    }

    // add shadow to a bg color
    vec4 getShadow(vec4 bg) {
      float shadowDist = length(${v.rectPos} - vec2(-0.35, -0.25));
      bool isShadow = shadowDist > pow(1.05, 2.0);
      vec4 shadowColor = isShadow ? vec4(vec3(0.0), 0.3) : vec4(0.0);
      return blend(shadowColor, bg);
    }

    // give an x, y, z in noise space and it returns a color
    vec4 getTerrainColor(vec3 tCoords, float offW) {
      float offX = seededRandom(${v.seed}) * 8376.0;
      float offY = seededRandom(${v.seed} * 2.0) * 8376.0;
      float offZ = seededRandom(${v.seed} * 3.0) * 8376.0;

      vec3 nIn3 = tCoords * 1.43 + vec3(offX, offY, offZ);
      vec4 nIn = vec4(nIn3, offW);

      float n = 0.;
      for (float i = 0.; i < ${v.octaves}; i += 1.) {
        float fac = pow(2.0, i);
        n += snoise(nIn * fac) * (1. / fac);
      }

      vec4 withBeach = n > 0.16 ? ${v.color} : ${v.color3};
      vec4 landColor = (${v.showBeach} > 0.) ? withBeach : ${v.color};

      vec4 beachColor2 = vec4(vec3(${v.color3}.rgb + ${v.color2}.rgb) * 0.8, 1.);
      vec4 withBeach2 = n < -0.16 ? ${v.color2} : beachColor2;
      vec4 waterColor = (${v.showBeach} > 1.) ? withBeach2 : ${v.color2};

      vec4 colorAt = n > 0. ? landColor : waterColor;

      return colorAt;
    }

    bool isPlanet(float r, float theta) {
      float limit = blobAtSpherical(1., theta, PI / 2.);
      return r < limit;
      // return pow(x, 2.) + pow(y, 2.) < 1.;
    }

    vec4 getPlanetColor(float xPre, float yPre, float offW) {
      /* do transformations */
      float xNorm = xPre * (1. / inR);
      float yNorm = yPre * (1. / inR);
      float zNorm = sqrt(1. - pow(xNorm, 2.0) - pow(yNorm, 2.0));
      vec3 normalized = vec3(xNorm, yNorm, zNorm);

      /* from now on we are always in normalized [0, 1] land */

      // vec4 preImage = vec4(xPre, yPre, pZ, 1.0);
      // vec4 image = ${u.timeMatrix} * preImage;
      vec4 rot = ${u.timeMatrix} * vec4(normalized, 1.);
      vec3 image = rot.xyz;

      /* recover spherical coords + polar */
      vec3 spherical = getSpherical(normalized);
      float rho = spherical.x; // should always be 1
      float theta = spherical.y;
      float phi = spherical.z;
      float r = length(vec2(xNorm, yNorm));

      float morph = blobAtSpherical(rho, theta, phi);

      // get terrain color
      vec4 terrainColor = getTerrainColor(image.xyz * morph, offW);

      // check if it should be inside or not
      bool isPlanet = isPlanet(r, theta);

      // filter out the stuff that's not inside
      vec4 planetColor = isPlanet ? terrainColor : vec4(0.0);

      // finally, apply shadow
      return getShadow(planetColor);
    }

    vec4 getCloudColor(float xPre, float yPre, float cloudIdx) {
      float noiseW = cloudIdx * 0.2;

      float cZ = sqrt(r - pow(xPre, 2.0) - pow(yPre, 2.0));
      vec4 cPre = vec4(xPre, yPre, cZ, 1.0);

      mat4 myMatrix = ${u.timeMatrix};

      for (float i = 0.; i < cloudIdx * 0.5; i++) {
        myMatrix = myMatrix * ${u.timeMatrix};
      }

      vec4 cImage = myMatrix * cPre;
      vec3 cIn3 = cImage.xyz / 1.2;
      cIn3.y = cIn3.y * 5.0;

      float w = ${v.seed} + noiseW /*+ ${u.time}*/;
      float cn1 = snoise(vec4(cIn3, w));
      float cn2 = snoise(vec4(cIn3 * 2.0, w)) * 0.5;

      float cn = cn1 + cn2;

      vec4 cloudColor = cn > 0.5 ? vec4(vec3(1.0), 0.7) : vec4(0.0);

      bool isIn = length(${v.rectPos}) <= r;

      return isIn ? cloudColor : vec4(0.0);
    }

    void main() {
      float xPre = ${v.rectPos}.x;
      float yPre = ${v.rectPos}.y;

      // planet stuff
      vec4 planetColor = getPlanetColor(xPre, yPre, ${u.time} * ${v.morphSpeed});

      // do antialiasing
      float ratio = (inR - length(${v.rectPos})) / ${v.eps};

      if (ratio < 1.) {
        planetColor.a *= ratio;
      }

      // calculate cloud stuff
      vec4 myColor = planetColor;
      for (float i = 0.; i < ${v.numClouds}; i += 1.) {
        vec4 cloudColor = getCloudColor(xPre, yPre, i);
        myColor = blend(cloudColor, myColor);
      }

      // discard fragments for depth buffer sorting
      if (myColor.a < 0.5) discard; // clouds look slightly funky but whatever

      myColor.a *= ${v.alpha};
      outColor = myColor;
    }
  `,
};

export const octavesFromPlanet = (p: Planet): number =>
  [
    1, // Asteroid
    1, // BrownDwarf
    2, // RedDwarf
    2, // WhiteDwarf
    2, // YellowStar
    3, // BlueStar
    3, // Giant
    3, // Supergiant
    3, // level 8
    4, // level 9
  ][p.planetLevel];

export const cloudsFromPlanet = (p: Planet): number =>
  [
    0, // Asteroid
    0, // BrownDwarf
    1, // RedDwarf
    1, // WhiteDwarf
    1, // YellowStar
    2, // BlueStar
    2, // Giant
    3, // Supergiant
    3, // level 8
    4, // level 9
  ][p.planetLevel];

export const morphFromPlanet = (p: Planet): number => {
  if (isLocatable(p) && (p.biome === Biome.LAVA || p.biome === Biome.CORRUPTED))
    return [
      0.8, // Asteroid
      1.0, // BrownDwarf
      1, // RedDwarf
      0.8, // WhiteDwarf
      0.6, // YellowStar
      0.6, // BlueStar
      0.4, // Giant
      0.4, // Supergiant
      0.3, // level 8
      0.25, // level 9
    ][p.planetLevel];
  return 0;
};

export function distortFromPlanet(p: Planet): number {
  if (isLocatable(p) && p.biome === Biome.CORRUPTED)
    return [
      0.04, // Asteroid
      0.06, // BrownDwarf
      0.06, // RedDwarf
      0.08, // WhiteDwarf
      0.08, // YellowStar
      0.1, // BlueStar
      0.1, // Giant
      0.12, // Supergiant
      0.13, // level 8
      0.14, // level 9
    ][p.planetLevel];
  return 0;
}

export const beachFromPlanet = (p: Planet): number =>
  [
    0, // Asteroid
    0, // BrownDwarf
    0, // RedDwarf
    0, // WhiteDwarf
    1, // YellowStar
    1, // BlueStar
    1, // Giant
    1, // Supergiant
    2, // level 8
    2, // level 9
  ][p.planetLevel];

export const propsFromPlanet = (p: Planet): [number, number, number, number] => [
  octavesFromPlanet(p),
  cloudsFromPlanet(p),
  morphFromPlanet(p),
  beachFromPlanet(p),
];
