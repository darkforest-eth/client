import { AttribProps, AttribType, ProgramClosure } from '../utils/EngineTypes';
import { glsl, programFromSources } from '../utils/EngineUtils';

// mask shader - takes in world coords and spits out red rects
const a = {
  position: 'a_position', // will be a list of quads
  // color: 'a_color',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
};
const v = {
  color: 'v_color',
};

// xy is pos, z is color
export const maskPosProps: AttribProps = {
  dim: 3,
  type: AttribType.Float,
  normalize: false,
  name: a.position,
};

const maskVert = glsl`
  in vec4 ${a.position};

  uniform mat4 ${u.matrix};

  out vec4 ${v.color};

  void main() {
    gl_Position = ${u.matrix} * ${a.position};

    vec4 c1 = vec4(0.030, 0.030, 0.060, 1.0);
    vec4 c2 = vec4(0.125, 0.125, 0.375, 1.0);
    vec4 c3 = vec4(0.140, 0.140, 0.510, 1.0);

    float color = ${a.position}.z;

    vec4 myColor = color == 0.0 ? c1 : color == 1.0 ? c2 : c3;

    ${v.color} = myColor;
  }
`;

const maskFrag = glsl`
  precision highp float;
  out vec4 outColor;

  in vec4 ${v.color};

  void main() {
    outColor = ${v.color};
  }
`;

export const getMaskProgram: ProgramClosure = (() => {
  let maskProgram: WebGLProgram | null = null;

  return (gl: WebGL2RenderingContext) => {
    if (maskProgram === null) {
      maskProgram = programFromSources(gl, maskVert, maskFrag);
      if (maskProgram === null) throw 'error compiling mask program';
    }

    return maskProgram;
  };
})();

export type MaskUniforms = {
  matrix: WebGLUniformLocation | null;
};

// TODO combine this with getMaskProgram
export function getMaskUniforms(gl: WebGL2RenderingContext): MaskUniforms {
  const maskProgram = getMaskProgram(gl);
  gl.useProgram(maskProgram); // may be superfluous;
  return {
    matrix: gl.getUniformLocation(maskProgram, u.matrix),
  };
}
