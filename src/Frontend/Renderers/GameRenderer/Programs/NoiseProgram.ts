import { glsl } from '../EngineUtils';

// noise shader
const nA = {
  position: 'a_position',
  noise: 'a_noise',
};
const nV = {
  position: 'v_position',
  noise: 'v_noise',
};

const _noiseVert = glsl`
  precision highp float;

  in vec4 ${nA.position};
  in float ${nA.noise};

  out vec4 ${nV.position};
  out float ${nV.noise};

  void main() {
    ${nV.position} = ${nA.position};
    ${nV.noise} = ${nA.noise};

    gl_Position = ${nA.position};
  }
`;

// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
const _noiseFrag = glsl`
  precision highp float;

  in vec4 ${nV.position};
  in float ${nV.noise};

  out vec4 outColor;

  void main() {
    float n = ${nV.noise};

    vec4 c1 = vec4(0.125, 0.125, 0.375, 1.0);
    vec4 c2 = vec4(0.140, 0.140, 0.510, 1.0);

    // outColor = n > 0.5 ? c1 : c2;
    outColor = c1;
  }
`;
