/* unused right now, later we're going to write a cleaner webgl layer */

// enum DataType {
//   // Float32,
//   Vec2,
//   Vec3,
//   Vec4,
//   Mat4,
//   Mat3,
// }

type DataType = Float32Array;

export interface Uniforms {
  [k: string]: DataType;
}
export type UniformSetters<U extends Uniforms> = {
  [key in keyof U]: (arg: U[key]) => void;
};

export interface Attributes {
  [k: string]: DataType;
}
export type AttributeSetters<U extends Attributes> = {
  [key in keyof U]: (arg: U[key]) => void;
};

export type CompiledProgram<U extends Uniforms> = {
  program: WebGLProgram;

  setUniform: UniformSetters<U>;
  // setAttribute: AttributeSetters<A>;
};

// for program setup

// i'm going to punt on finishing this so we can get something working first
export type ProgramInfo = {
  vertexShader: string;
  fragShader: string;

  uniforms: Uniforms;
};
