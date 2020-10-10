import * as bigInt from 'big-integer';
import { BigInteger } from 'big-integer';
import {
  Planet,
  LocationId,
  Bonus,
  EthAddress,
  PlanetResource,
  SpaceType,
  UpgradeState,
} from '../_types/global/GlobalTypes';
import { address, emptyAddress } from './CheckedTypeUtils';
import _ from 'lodash';
import TerminalEmitter from './TerminalEmitter';
import {
  UnconfirmedBuyHat,
  UnconfirmedMove,
  UnconfirmedUpgrade,
} from '../_types/darkforest/api/ContractsAPITypes';

export const ONE_DAY = 24 * 60 * 60 * 1000;

type NestedBigIntArray = (BigInteger | string | NestedBigIntArray)[];
type NestedStringArray = (string | NestedStringArray)[];

export const hexifyBigIntNestedArray = (
  arr: NestedBigIntArray
): NestedStringArray => {
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

// these are the things we care about refreshing on a loop
export type PlanetStatsInfo = {
  energy: number;
  silver: number;
  hatLevel: number;
  upgradeState: UpgradeState;
  unconfirmedDepartures: UnconfirmedMove[];
  unconfirmedUpgrades: UnconfirmedUpgrade[];
  unconfirmedBuyhats: UnconfirmedBuyHat[];
};

// this function exists because Object.assign() and _.clone() seem to be slow
// i suspect they also copy prototypes etc somehow?
export const copyPlanetStats = (
  planet: Planet | null
): PlanetStatsInfo | null => {
  if (planet === null) return null;
  else {
    return {
      energy: planet.energy,
      silver: planet.silver,
      hatLevel: planet.hatLevel,
      upgradeState: planet.upgradeState,
      unconfirmedDepartures: planet.unconfirmedDepartures,
      unconfirmedUpgrades: planet.unconfirmedUpgrades,
      unconfirmedBuyhats: planet.unconfirmedBuyHats,
    };
  }
};

// color utils

export const hslStr: (h: number, s: number, l: number) => string = (
  h,
  s,
  l
) => {
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

export const formatNumber = (num: number): string => {
  if (num < 1000) return `${num.toFixed(0)}`;

  const suffixes = ['', 'K', 'M', 'B', 'T', 'q', 'Q'];
  let log000 = 0;
  let rem = num;
  while (rem / 1000 >= 1) {
    rem /= 1000;
    log000++;
  }

  if (log000 === 0) return `${Math.floor(num)}`;

  if (rem < 10) return `${rem.toFixed(2)}${suffixes[log000]}`;
  else if (rem < 100) return `${rem.toFixed(1)}${suffixes[log000]}`;
  /*rem < 1000*/ else return `${rem.toFixed(0)}${suffixes[log000]}`;
};

export const getRandomActionId = () => {
  const hex = '0123456789abcdef';

  let ret = '';
  for (let i = 0; i < 10; i += 1) {
    ret += hex[Math.floor(hex.length * Math.random())];
  }
  return ret;
};

export const seededRandom = (s: number) => {
  const x = Math.sin(s) * 10000;
  return x - Math.floor(x);
};

export const getFormatProp = (
  planet: Planet | PlanetStatsInfo | null,
  prop: string
): string => {
  if (!planet) return '0';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myPlanet = planet as any;
  if (prop === 'silverGrowth') return formatNumber(myPlanet[prop] * 60);
  else return formatNumber(myPlanet[prop]);
};

export const getPlanetRank = (planet: Planet | null): number => {
  if (!planet) return 0;
  return planet.upgradeState.reduce((a, b) => a + b);
};

export const getPlanetShortHash = (planet: Planet | null): string => {
  if (!planet) return '00000';
  else return planet.locationId.substring(4, 9);
};

export const getPlayerShortHash = (address: EthAddress): string => {
  return address.substring(0, 6);
};

export const isFullRank = (planet: Planet | null): boolean => {
  if (!planet) return true;
  const rank = getPlanetRank(planet);
  if (planet.spaceType === SpaceType.NEBULA) return rank >= 3;
  else if (planet.spaceType === SpaceType.SPACE) return rank >= 4;
  else return rank >= 5;
};

export const planetCanUpgrade = (planet: Planet | null) => {
  return (
    planet &&
    !isFullRank(planet) &&
    planet.planetLevel !== 0 &&
    planet.planetResource !== PlanetResource.SILVER
  );
};
//https://stackoverflow.com/questions/32589197/how-can-i-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript/45620677#45620677
export const titleCase = (title: string): string =>
  title
    .split(/ /g)
    .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
    .join(' ');

export const randomAddress = (): string => {
  return address(
    '0x' +
      _.join(
        _.times(40, () => _.random(0, 15).toString(16)),
        ''
      )
  );
};

export const moveShipsDecay = (
  shipsMoved: number,
  fromPlanet: Planet,
  dist: number
) => {
  const scale = (1 / 2) ** (dist / fromPlanet.range);
  let ret = scale * shipsMoved - 0.05 * fromPlanet.energyCap;
  if (ret < 0) ret = 0;

  return ret;
};

export const getBytesFromHex = (
  hexStr: string,
  startByte: number,
  endByte: number
) => {
  const byteString = hexStr.substring(2 * startByte, 2 * endByte);
  return bigInt(`0x${byteString}`);
};

export const bonusFromHex = (hex: LocationId): Bonus => {
  const bonuses = Array(5).fill(false) as Bonus;

  for (let i = 0; i < bonuses.length; i++) {
    bonuses[i] = getBytesFromHex(hex, 9 + i, 10 + i).lesser(16);
  }

  return bonuses;
};

export const planetHasBonus = (planet: Planet | null): boolean => {
  if (!planet) return false;
  return bonusFromHex(planet.locationId).reduce((a, b) => a || b);
};

export const hasOwner = (planet: Planet) => {
  // planet.owner should never be null
  return planet.owner !== emptyAddress;
};

export const aggregateBulkGetter = async <T>(
  total: number,
  querySize: number,
  getterFn: (startIdx: number, endIdx: number) => Promise<T[]>,
  printProgress = false
) => {
  const terminalEmitter = TerminalEmitter.getInstance();
  const promises: Promise<T[]>[] = [];
  let soFar = 0;
  for (let i = 0; i < total / querySize; i += 1) {
    const start = i * querySize;
    const end = Math.min((i + 1) * querySize, total);
    promises.push(
      new Promise<T[]>(async (resolve) => {
        let res: T[] = [];
        let tries = 0;
        while (res.length === 0) {
          // retry with exponential backoff if request fails
          await new Promise<void>((resolve) => {
            setTimeout(resolve, Math.min(15, 2 ** tries - 1) * 1000);
          });
          res = await getterFn(start, end)
            .then((res) => {
              if (
                printProgress &&
                Math.floor((soFar * 20) / total) !==
                  Math.floor(((soFar + querySize) * 20) / total)
              ) {
                // print every 5%
                let percent =
                  Math.floor(((soFar + querySize) * 20) / total) * 5;
                percent = Math.min(percent, 100);
                terminalEmitter.print(`${percent}%... `);
              }
              soFar += querySize;
              console.log(`retrieved ${start}-${end}.`);
              return res;
            })
            .catch(() => {
              console.error(
                `error occurred querying ${start}-${end}. retrying...`
              );
              return [];
            });
          tries += 1;
        }
        resolve(res);
      })
    );
  }
  const unflattenedResults = await Promise.all(promises);
  if (printProgress) {
    terminalEmitter.newline();
  }
  return _.flatten(unflattenedResults);
};

export const isFirefox = () => navigator.userAgent.indexOf('Firefox') > 0;

export const isChrome = () => /Google Inc/.test(navigator.vendor);

export const isBrave = async () =>
  !!((navigator as any).brave && (await (navigator as any).brave.isBrave())); // eslint-disable-line @typescript-eslint/no-explicit-any
