import { formatNumber } from '@darkforest_eth/gamelogic';
import { EthAddress, Planet, SpaceType, Upgrade, UpgradeBranchName } from '@darkforest_eth/types';
import * as bigInt from 'big-integer';
import { BigInteger } from 'big-integer';
import { StatIdx } from '../../_types/global/GlobalTypes';

export const ONE_DAY = 24 * 60 * 60 * 1000;

type NestedBigIntArray = (BigInteger | string | NestedBigIntArray)[];
type NestedStringArray = (string | NestedStringArray)[];

export const hexifyBigIntNestedArray = (arr: NestedBigIntArray): NestedStringArray => {
  return arr.map((value) => {
    if (Array.isArray(value)) {
      return hexifyBigIntNestedArray(value);
    } else {
      if (typeof value === 'string') {
        const valueBI = bigInt(value as string);
        return '0x' + valueBI.toString(16);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return '0x' + (value as any).toString(16);
      }
    }
  });
};

/*
 * returns stat of an upgrade given a stat index
 */
export const getUpgradeStat = (upgrade: Upgrade, stat: StatIdx): number => {
  if (stat === StatIdx.EnergyCap) return upgrade.energyCapMultiplier;
  else if (stat === StatIdx.EnergyGro) return upgrade.energyGroMultiplier;
  else if (stat === StatIdx.Range) return upgrade.rangeMultiplier;
  else if (stat === StatIdx.Speed) return upgrade.speedMultiplier;
  else if (stat === StatIdx.Defense) return upgrade.defMultiplier;
  else return upgrade.energyCapMultiplier;
};

// color utils

export const hslStr: (h: number, s: number, l: number) => string = (h, s, l) => {
  return `hsl(${h % 360},${s}%,${l}%)`;
};
function hashToHue(hash: string): number {
  let seed = bigInt(hash, 16).and(0xffffff).toString(16);
  seed = '0x' + '0'.repeat(6 - seed.length) + seed;

  const baseHue = parseInt(seed) % 360;
  return baseHue;
}

export const getPlayerColor: (player: EthAddress) => string = (player) => {
  return hslStr(hashToHue(player.slice(2)), 100, 70); // remove 0x
};

export const getOwnerColor: (planet: Planet) => string = (planet) => {
  return planet.owner ? getPlayerColor(planet.owner) : 'hsl(0,1%,50%)';
};

export const getRandomActionId = () => {
  const hex = '0123456789abcdef';

  let ret = '';
  for (let i = 0; i < 10; i += 1) {
    ret += hex[Math.floor(hex.length * Math.random())];
  }
  return ret;
};

export const getFormatProp = (planet: Planet | undefined, prop: string): string => {
  if (!planet) return '0';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myPlanet = planet as any;
  if (prop === 'silverGrowth') return formatNumber(myPlanet[prop] * 60);
  else return formatNumber(myPlanet[prop]);
};

export const getPlanetRank = (planet: Planet | undefined): number => {
  if (!planet) return 0;
  return planet.upgradeState.reduce((a, b) => a + b);
};

export const getPlanetShortHash = (planet: Planet | undefined): string => {
  if (!planet) return '00000';
  else return planet.locationId.substring(4, 9);
};

export const getPlayerShortHash = (address: EthAddress): string => {
  return address.substring(0, 6);
};

export const isFullRank = (planet: Planet | undefined): boolean => {
  if (!planet) return true;
  const maxRank = getPlanetMaxRank(planet);
  const rank = getPlanetRank(planet);

  return rank >= maxRank;
};

export const upgradeName = (branchName: UpgradeBranchName) => {
  return ['Defense', 'Range', 'Speed'][branchName];
};

export const getPlanetMaxRank = (planet: Planet | undefined): number => {
  if (!planet) return 0;

  if (planet.spaceType === SpaceType.NEBULA) return 3;
  else if (planet.spaceType === SpaceType.SPACE) return 4;
  else return 5;
};

export const titleCase = (title: string): string =>
  title
    .split(/ /g)
    .map((word, i) => {
      // don't capitalize articles unless it's the first word
      if (i !== 0 && ['of', 'the'].includes(word)) return word;
      return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
    })
    .join(' ');
