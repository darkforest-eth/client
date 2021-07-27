import { HSLVec, RGBVec } from '../../Frontend/Renderers/GameRenderer/EngineTypes';
import { HatType } from '../../Frontend/Utils/Hats';

export type RuinsInfo = {
  [PlanetLevel: number]: {
    weights: [number, number, number, number];
    props: [number, number, number, number];
  };
};

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

  spacetime1: RGBVec;
  spacetime2: RGBVec;
  spacetime3: RGBVec;

  ruins?: RuinsInfo;
}
