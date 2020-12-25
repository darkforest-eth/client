export type Translation = {
  x: number;
  y: number;
};

export type Scaling = {
  x: number;
  y: number;
};

export enum AttribType {
  Float = window.WebGL2RenderingContext && WebGL2RenderingContext['FLOAT'],
  UByte = window.WebGL2RenderingContext &&
    WebGL2RenderingContext['UNSIGNED_BYTE'],
}

export type GLArray = Float32Array | Uint8Array;

export type GLArrayConstructor =
  | Float32ArrayConstructor
  | Uint8ArrayConstructor;

export type AttribProps = {
  dim: number;
  type: AttribType; // gl.FLOAT, etc
  normalize: boolean;
  name: string;
};

export type ProgramClosure = (gl: WebGL2RenderingContext) => WebGLProgram;

export type RGBVec = [number, number, number];

export type RGBAVec = [number, number, number, number];

export type HSLVec = [number, number, number];

export enum TextAlign {
  Left = 0,
  Center = 0.5,
  Right = 1,
}

export enum TextAnchor {
  Top = 0,
  Middle = 0.5,
  Bottom = 1,
}

export enum RenderZIndex {
  Background = 0,
  Voyages = -1,
  Planets = -10,
  Text = -11,
  UI = -12,

  DEFAULT = -98,
  MAX = -99,
}
/*
export enum BeltType {
  Silver,
  EnergyCap,
  EnergyGro,
  Range,
  Speed,
  Defense,
}
*/
