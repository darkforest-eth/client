import { hslToRgb } from '../../../utils/ProcgenUtils';
import { RGBVec } from './EngineTypes';

export const engineConsts = {
  fontStyle: '64px monospace',
  dashLength: 10,
  planet: {
    maxRadius: 4,
  },
  glyphs: {
    glyphW: 40,
    glyphH: 64,
    rowL: 13,
    canvasDim: 1024,
    scale: 4,
  },
  colors: {
    artifacts: {
      shine: [255, 251, 207] as RGBVec,
      trim: [240, 227, 86] as RGBVec,
    },
    gold: [255, 221, 48] as RGBVec,
    barbs: [153, 102, 102] as RGBVec,
    white: [255, 255, 255] as RGBVec,
    red: [255, 0, 0] as RGBVec,
    range: {
      dash: [150, 145, 191] as RGBVec,
      energy: [245, 180, 130] as RGBVec,
    },
    voyage: {
      enemy: [255, 0, 0] as RGBVec,
      mine: [0, 0, 255] as RGBVec,
    },
    bonus: {
      energyCap: hslToRgb([360, 73, 70]) as RGBVec,
      energyGro: hslToRgb([136, 73, 70]) as RGBVec,
      speed: hslToRgb([290, 73, 70]) as RGBVec,
      range: hslToRgb([50, 73, 70]) as RGBVec,
      defense: hslToRgb([231, 73, 70]) as RGBVec,
    },
    belt: {
      silver: [240, 180, 50] as RGBVec,
      speed: hslToRgb([290, 85, 80]) as RGBVec,
      range: hslToRgb([50, 85, 80]) as RGBVec,
      defense: hslToRgb([231, 85, 80]) as RGBVec,
    },
  },
};
