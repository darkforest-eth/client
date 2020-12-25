import { AttribProps, AttribType, ProgramClosure } from '../utils/EngineTypes';
import { glsl, programFromSources } from '../utils/EngineUtils';

const a = {
  position: 'a_position', // as [posx, posy, rectposx, rectposy]
  color: 'a_color',
  props: 'a_props', // as [stroke, angle, dash]
  eps: 'a_eps',
};
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
};
const v = {
  color: 'v_color',
  stroke: 'v_stroke',
  angle: 'v_angle',
  dash: 'v_dash',
  rectPos: 'v_rectPos',
  eps: 'v_eps',
};

export const circPosProps: AttribProps = {
  dim: 4,
  type: AttribType.Float,
  normalize: false,
  name: a.position,
};

export const circEpsProps: AttribProps = {
  dim: 1,
  type: AttribType.Float,
  normalize: false,
  name: a.eps,
};

export const circColorProps: AttribProps = {
  dim: 4,
  type: AttribType.UByte,
  normalize: true,
  name: a.color,
};

export const circPropsProps: AttribProps = {
  dim: 3,
  type: AttribType.Float,
  normalize: false,
  name: a.props,
};

const circVert = glsl`
  in vec4 ${a.position};
  in vec4 ${a.color};
  in vec3 ${a.props};
  in float ${a.eps};

  uniform mat4 ${u.matrix};

  out vec4 ${v.color};
  out vec2 ${v.rectPos};
  out float ${v.stroke};
  out float ${v.angle};
  out float ${v.dash};
  out float ${v.eps};


  void main() {
    gl_Position = ${u.matrix} * vec4(${a.position}.xy, 0.0, 1.0);

    ${v.rectPos} = ${a.position}.zw;
    ${v.color} = ${a.color};
    ${v.stroke} = ${a.props}.x;
    ${v.angle} = ${a.props}.y;
    ${v.dash} = ${a.props}.z;
    ${v.eps} = ${a.eps};
  }
`;

const circFrag = glsl`
  #define PI 3.1415926535

  precision highp float;
  out vec4 outColor;

  in vec4 ${v.color};
  in vec2 ${v.rectPos};
  in float ${v.stroke};
  in float ${v.angle};
  in float ${v.dash};
  in float ${v.eps};

  void main() {
    vec4 color = ${v.color};
    float dist = length(${v.rectPos});

    if (dist > 1.0) discard; // if it's outside the circle

    // anti-aliasing if barely in the circle
    float ratio = (1.0 - dist) / ${v.eps};
    if (ratio < 1.) {
      color.a *= ratio;
    }

    /* do stroke check - discard inner circle if stroke */
    float rad = 1.0 - ${v.eps};

    // keep a band of stroke +- epsilon
    bool hasStroke = ${v.stroke} > 0.0;
    bool outer = dist > rad - ${v.stroke} - ${v.eps};
    
    if (hasStroke) {
      if (!outer) discard;
      // anti-aliasing
      float inRatio = (dist - (rad - ${v.stroke} - ${v.eps})) / ${v.eps};
      if (inRatio < 1.) color.a *= inRatio; // flip direction 
    }

    /* get angle for both angle + dash checks */
    float angle = atan(${v.rectPos}.y, ${v.rectPos}.x);

    // add 5pi/2 to translate it to [-PI/2, 3PI / 2]
    float check = angle + (5.0 * PI / 2.0);
    check -= (check > 2.0 * PI ? 2.0 * PI : 0.0);
    float pct = check / (2.0 * PI);

    /* do angle check */

    if (${v.angle} != 1.0 && pct > ${v.angle}) discard;

    /* do dash check */
    bool isDash = ${v.dash} > 0.0;
    float interval = angle / ${v.dash};
    float modulo = interval - 2.0 * floor(interval / 2.0);
    bool isGap = modulo > 1.0;
    if (isDash && isGap) discard;

    /* now draw it */
    outColor = color;
  }
`;

export const getCircleProgram: ProgramClosure = (() => {
  let program: WebGLProgram | null = null;

  return (gl: WebGL2RenderingContext) => {
    if (program === null) {
      program = programFromSources(gl, circVert, circFrag);
      if (program === null) throw 'error compiling circle program';
    }

    return program;
  };
})();

export type CircleUniforms = {
  matrix: WebGLUniformLocation | null;
};

export function getCircleUniforms(gl: WebGL2RenderingContext): CircleUniforms {
  const program = getCircleProgram(gl);
  gl.useProgram(program); // may be superfluous;
  return {
    matrix: gl.getUniformLocation(program, u.matrix),
  };
}
