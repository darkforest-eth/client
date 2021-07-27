import { mat3, mat4 } from 'gl-matrix';

//eslint-disable-next-line @projectsophon/typescript-enum/no-enum
export enum AttribType {
  Float = window.WebGL2RenderingContext && WebGL2RenderingContext['FLOAT'],
  UByte = window.WebGL2RenderingContext && WebGL2RenderingContext['UNSIGNED_BYTE'],
}

//eslint-disable-next-line @projectsophon/typescript-enum/no-enum
export enum DrawMode {
  Triangles = window.WebGL2RenderingContext && WebGL2RenderingContext['TRIANGLES'],
  Lines = window.WebGL2RenderingContext && WebGL2RenderingContext['LINES'],
  Points = window.WebGL2RenderingContext && WebGL2RenderingContext['POINTS'],
}

export type AttribProps = {
  dim: number;
  type: AttribType; // gl.FLOAT, etc
  normalize: boolean;
  name: string;
};

export const enum UniformType {
  Mat4,
  Mat3,
  UByte,
  Float,
  Texture,
  Vec3,
}

export type Vec3 = [number, number, number];

export type UniformJSType = mat4 | mat3 | number | Vec3;

export type UniformProps = {
  name: string;
  type: UniformType;
};

export type RGBVec = [number, number, number];

export type RGBAVec = [number, number, number, number];

export type Translation = {
  x: number;
  y: number;
};

export type Scaling = {
  x: number;
  y: number;
};
export type HSLVec = readonly [number, number, number];

export const enum TextAlign {
  Left = 0,
  Center = 0.5,
  Right = 1,
}

export const enum TextAnchor {
  Top = 0,
  Middle = 0.5,
  Bottom = 1,
}

export const enum RenderZIndex {
  Background = 0,
  Voyages = -1,
  Planets = -10,
  Text = -11,
  UI = -12,

  DEFAULT = -98,
  MAX = -99,
}
