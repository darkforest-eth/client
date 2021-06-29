import * as bigInt from 'big-integer';
import { BigInteger } from 'big-integer';
import { StatIdx } from '../../_types/global/GlobalTypes';
import { Planet, EthAddress, SpaceType, Upgrade, UpgradeBranchName } from '@darkforest_eth/types';
import _ from 'lodash';
import { EMPTY_ADDRESS } from '@darkforest_eth/constants';

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

// smallDec represents the decimals to show for small numbers
export const formatNumber = (num: number, smallDec = 0): string => {
  if (num < 1000) {
    if (`${num}` === num.toFixed(0)) {
      return `${num.toFixed(0)}`;
    } else {
      return `${num.toFixed(smallDec)}`;
    }
  }

  const suffixes = ['', 'K', 'M', 'B', 'T', 'q', 'Q'];
  let log000 = 0;
  let rem = num;
  while (rem / 1000 >= 1) {
    rem /= 1000;
    log000++;
  }

  if (log000 === 0) return `${Math.floor(num)}`;

  if (rem < 10) return `${rem.toFixed(1)}${suffixes[log000]}`;
  else if (rem < 100) return `${rem.toFixed(1)}${suffixes[log000]}`;
  else if (log000 < suffixes.length) return `${rem.toFixed(0)}${suffixes[log000]}`;
  else return `${rem.toFixed(0)}E${log000 * 3}`;
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

export const hasOwner = (planet: Planet) => {
  return planet.owner !== EMPTY_ADDRESS;
};

export function sleep<T>(timeout: number, returns?: T): Promise<T> {
  return new Promise<T>((resolve) => setTimeout(() => resolve(returns as T), timeout));
}

export async function rejectAfter<T>(ms: number, msg: string): Promise<T> {
  await sleep(ms);
  throw new Error(msg);
}

export function neverResolves(): Promise<void> {
  return new Promise(() => {});
}

export const aggregateBulkGetter = async <T>(
  logTag: string,
  total: number,
  querySize: number,
  getterFn: (startIdx: number, endIdx: number) => Promise<T[]>,
  // the parameter to this function is a value between 0 and 1. We guarantee at least one call to
  // `onProgress` if you provide it. The guaranteed call is the one at the end, where the value is 1.
  onProgress?: (fractionCompleted: number) => void
) => {
  const promises: Promise<T[]>[] = [];
  let loadedSoFar = 0;

  for (let i = 0; i < total / querySize; i += 1) {
    const start = i * querySize;
    const end = Math.min((i + 1) * querySize, total);
    const loadedThisBatch = end - start;

    promises.push(
      new Promise<T[]>(async (resolve) => {
        let res: T[] = [];
        while (res.length === 0) {
          res = await getterFn(start, end);
          loadedSoFar += loadedThisBatch;
          console.log(`[bulk-fetch] retrieved ${logTag} ${start}-${end}.`);
          onProgress && onProgress(loadedSoFar / total);
        }

        resolve(res);
      })
    );
  }
  const unflattenedResults = await Promise.all(promises);
  onProgress && onProgress(1);
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
          await sleep(Math.min(retryInterval * 2 ** i + Math.random() * 100, 15000));
        } else {
          reject(e);
        }
      }
    }
  });
};

export const timeoutAfter = async <T>(promise: Promise<T>, ms: number, timeoutMsg: string) => {
  return Promise.race([promise, rejectAfter<T>(ms, timeoutMsg)]);
};

export function deferred<T>(): [(t: T) => void, (t: Error) => void, Promise<T>] {
  let resolve: ((t: T) => void) | null = null;
  let reject: ((t: Error) => void) | null = null;
  const promise = new Promise<T>((r, rj) => {
    resolve = (t: T) => r(t);
    reject = (e: Error) => rj(e);
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return [resolve as any, reject as any, promise];
}
