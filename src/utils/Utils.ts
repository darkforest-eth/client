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
  Location,
  ArtifactId,
  StatIdx,
  Upgrade,
} from '../_types/global/GlobalTypes';
import { CheckedTypeUtils } from './CheckedTypeUtils';
import _ from 'lodash';
import TerminalEmitter from './TerminalEmitter';
import {
  UnconfirmedBuyHat,
  UnconfirmedDepositArtifact,
  UnconfirmedFindArtifact,
  UnconfirmedMove,
  UnconfirmedUpgrade,
  UnconfirmedWithdrawArtifact,
} from '../_types/darkforest/api/ContractsAPITypes';
import mimcHash from '../miner/mimc';
import perlin from '../miner/perlin';
import { WorldCoords } from './Coordinates';

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

export const getTimeZone = (): string => {
  const off = -new Date().getTimezoneOffset() / 60;
  if (off < 0) return 'UTC' + off;
  else return 'UTC+' + off;
};

// these are the things we care about refreshing on a loop
export type PlanetStatsInfo = {
  energy: number;
  silver: number;
  hatLevel: number;
  upgradeState: UpgradeState;
  hasTriedFindingArtifact: boolean;
  unconfirmedDepartures: UnconfirmedMove[];
  unconfirmedUpgrades: UnconfirmedUpgrade[];
  unconfirmedBuyhats: UnconfirmedBuyHat[];
  unconfirmedFindArtifact?: UnconfirmedFindArtifact;
  unconfirmedDepositArtifact?: UnconfirmedDepositArtifact;
  unconfirmedWithdrawArtifact?: UnconfirmedWithdrawArtifact;
  artifactLockedTimestamp?: number;
  heldArtifactId: ArtifactId | undefined;
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
      hasTriedFindingArtifact: planet.hasTriedFindingArtifact,
      unconfirmedDepartures: planet.unconfirmedDepartures,
      unconfirmedUpgrades: planet.unconfirmedUpgrades,
      unconfirmedBuyhats: planet.unconfirmedBuyHats,
      unconfirmedFindArtifact: planet.unconfirmedFindArtifact,
      unconfirmedDepositArtifact: planet.unconfirmedDepositArtifact,
      unconfirmedWithdrawArtifact: planet.unconfirmedWithdrawArtifact,
      artifactLockedTimestamp: planet.artifactLockedTimestamp,
      heldArtifactId: planet.heldArtifactId,
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

export const planetCanUpgrade = (planet: Planet | null): boolean => {
  return !!(
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
    .map((word, i) => {
      // don't capitalize articles unless it's the first word
      if (i !== 0 && ['of', 'the'].includes(word)) return word;
      return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
    })
    .join(' ');

export const randomAddress = (): string => {
  return CheckedTypeUtils.address(
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

const bonusById = new Map<LocationId, Bonus>();

export const bonusFromHex = (hex: LocationId): Bonus => {
  const bonus = bonusById.get(hex);
  if (bonus) return bonus;

  const newBonus = Array(5).fill(false) as Bonus;

  for (let i = 0; i < newBonus.length; i++) {
    newBonus[i] = getBytesFromHex(hex, 9 + i, 10 + i).lesser(16);
  }

  bonusById.set(hex, newBonus);
  return newBonus;
};

export const planetHasBonus = (planet: Planet | null): boolean => {
  if (!planet) return false;
  return bonusFromHex(planet.locationId).reduce((a, b) => a || b);
};

export const hasOwner = (planet: Planet) => {
  // planet.owner should never be null
  return planet.owner !== CheckedTypeUtils.EMPTY_ADDRESS;
};

export function sleep<T>(timeout: number, returns?: T): Promise<T> {
  return new Promise<T>((resolve) =>
    setTimeout(() => resolve(returns as T), timeout)
  );
}

export async function rejectAfter<T>(ms: number, msg: string): Promise<T> {
  await sleep(ms);
  throw new Error(msg);
}

// this is slow, do not call in i.e. render/draw loop
export function locationFromCoords(coords: WorldCoords): Location {
  return {
    coords,
    hash: CheckedTypeUtils.locationIdFromBigInt(mimcHash(coords.x, coords.y)),
    perlin: perlin(coords),
    biomebase: perlin(coords, true, true),
  };
}

export function neverResolves(): Promise<void> {
  return new Promise(() => {});
}

export const aggregateBulkGetter = async <T>(
  total: number,
  querySize: number,
  getterFn: (startIdx: number, endIdx: number) => Promise<T[]>,
  printProgress = false,
  spacedInMs = 0
) => {
  const terminalEmitter = TerminalEmitter.getInstance();
  const promises: Promise<T[]>[] = [];
  let soFar = 0;

  for (let i = 0; i < total / querySize; i += 1) {
    const start = i * querySize;
    const end = Math.min((i + 1) * querySize, total);

    await sleep(spacedInMs);

    promises.push(
      new Promise<T[]>(async (resolve) => {
        let res: T[] = [];
        while (res.length === 0) {
          res = await getterFn(start, end);
          if (
            printProgress &&
            Math.floor((soFar * 20) / total) !==
              Math.floor(((soFar + querySize) * 20) / total)
          ) {
            // print every 5%
            let percent = Math.floor(((soFar + querySize) * 20) / total) * 5;
            percent = Math.min(percent, 100);
            terminalEmitter.print(`${percent}%... `);
          }
          soFar += querySize;
          console.log(`retrieved ${start}-${end}.`);
        }
        resolve(res);
      })
    );
  }
  const unflattenedResults = await Promise.all(promises);
  if (printProgress && total > 0) {
    terminalEmitter.newline();
  }
  return _.flatten(unflattenedResults);
};

export type RetryErrorHandler = (i: number, e: Error) => void;

export const callWithRetry = async <T>(
  fn: (...args: unknown[]) => Promise<T>,
  args: unknown[] = [],
  onError?: RetryErrorHandler,
  maxRetries = 10,
  retryInterval = 1000
): Promise<T> => {
  return new Promise<T>(async (resolve, reject) => {
    let res: T;
    for (let i = 0; i < maxRetries; i++) {
      try {
        res = await fn(...args);
        resolve(res);
        break;
      } catch (e) {
        console.error(`error: ${e}`);
        console.log(`retrying (${i}/${maxRetries})...`);

        if (onError) {
          try {
            onError(i, e);
          } catch (e) {
            console.log(`failed executing callWithRetry error handler`, e);
          }
        }

        if (i < maxRetries - 1) {
          await sleep(
            Math.min(retryInterval * 2 ** i + Math.random() * 100, 15000)
          );
        } else {
          reject(e);
        }
      }
    }
  });
};

export const isFirefox = () => navigator.userAgent.indexOf('Firefox') > 0;

export const isChrome = () => /Google Inc/.test(navigator.vendor);

export const isBrave = async () =>
  !!((navigator as any).brave && (await (navigator as any).brave.isBrave())); // eslint-disable-line @typescript-eslint/no-explicit-any

export const timeoutAfter = async <T>(
  promise: Promise<T>,
  ms: number,
  timeoutMsg: string
) => {
  return Promise.race([promise, rejectAfter<T>(ms, timeoutMsg)]);
};

export function deferred<T>(): [
  (t: T) => void,
  (t: Error) => void,
  Promise<T>
] {
  let resolve: ((t: T) => void) | null = null;
  let reject: ((t: Error) => void) | null = null;
  const promise = new Promise<T>((r, rj) => {
    resolve = (t: T) => r(t);
    reject = (e: Error) => rj(e);
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return [resolve as any, reject as any, promise];
}
