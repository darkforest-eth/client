import { HSLVec, RGBVec } from '../../../../../app/renderer/utils/EngineTypes';
import { HatType } from '../../../../../utils/Hats';

export interface PlanetCosmeticInfo {
  baseHue: number;

  baseStr: string;
  bgStr: string;

  baseColor: RGBVec;
  baseColor2: RGBVec;
  baseColor3: RGBVec;

  mtnColor: RGBVec;
  mtnColor2: RGBVec;
  mtnColor3: RGBVec;

  backgroundColor: RGBVec;
  previewColor: RGBVec;

  landRgb: RGBVec;
  oceanRgb: RGBVec;
  beachRgb: RGBVec;

  asteroidHsl: HSLVec;

  seed: number;

  hatType: HatType;
}
