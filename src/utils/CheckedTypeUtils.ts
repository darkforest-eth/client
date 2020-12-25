import {
  ArtifactId,
  EthAddress,
  LocationId,
} from '../_types/global/GlobalTypes';
import * as bigInt from 'big-integer';
import { LOCATION_ID_UB } from './constants';
import { BigInteger } from 'big-integer';
import { BigNumber as EthersBN } from 'ethers';
import mimcHash from '../miner/mimc';
import { WorldCoords } from './Coordinates';

// constructors for specific types
// this pattern ensures that LocationIds and Addresses can only be initialized through constructors that do
// appropriate validation
// see https://stackoverflow.com/questions/51813272/declaring-string-type-with-min-max-length-in-typescript
export const locationIdFromHexStr: (location: string) => LocationId = (
  location
) => {
  const locationBI = bigInt(location, 16);
  if (locationBI.geq(LOCATION_ID_UB)) throw new Error('not a valid location');
  let ret = locationBI.toString(16);
  while (ret.length < 64) ret = '0' + ret;
  return ret as LocationId;
};

export const locationIdFromDecStr: (location: string) => LocationId = (
  location
) => {
  const locationBI = bigInt(location);
  if (locationBI.geq(LOCATION_ID_UB)) throw new Error('not a valid location');
  let ret = locationBI.toString(16);
  while (ret.length < 64) ret = '0' + ret;
  return ret as LocationId;
};

export const artifactIdFromDecStr: (artifactId: string) => ArtifactId = (
  artifactId
) => {
  const locationBI = bigInt(artifactId);
  let ret = locationBI.toString(16);
  while (ret.length < 64) ret = '0' + ret;
  return ret as ArtifactId;
};

export const locationIdFromBigInt: (location: BigInteger) => LocationId = (
  location
) => {
  const locationBI = bigInt(location);
  if (locationBI.geq(LOCATION_ID_UB)) throw new Error('not a valid location');
  let ret = locationBI.toString(16);
  while (ret.length < 64) ret = '0' + ret;
  return ret as LocationId;
};

export const locationIdFromEthersBN: (location: EthersBN) => LocationId = (
  location
) => {
  return locationIdFromDecStr(location.toString());
};

export const artifactIdFromEthersBN: (artifactId: EthersBN) => ArtifactId = (
  artifactId
) => {
  return artifactIdFromDecStr(artifactId.toString());
};

export const locationIdToDecStr: (locationId: LocationId) => string = (
  locationId
) => {
  return bigInt(locationId, 16).toString(10);
};

export const artifactIdToDecStr: (artifactId: ArtifactId) => string = (
  artifactId
) => {
  return bigInt(artifactId, 16).toString(10);
};

export const address: (str: string) => EthAddress = (str) => {
  let ret = str.toLowerCase();
  if (ret.slice(0, 2) === '0x') {
    ret = ret.slice(2);
  }
  for (const c of ret) {
    if ('0123456789abcdef'.indexOf(c) === -1)
      throw new Error('not a valid address');
  }
  if (ret.length !== 40) throw new Error('not a valid address');
  return `0x${ret}` as EthAddress;
};

export const emptyAddress = address('0000000000000000000000000000000000000000');

export const emptyLocationId = locationIdFromHexStr(
  '0000000000000000000000000000000000000000000000000000000000000000'
);

/**
 * this shouldn't be used in render loop or anywhere where calls are made very frequently (mimc is expensive)
 */
export function locationIdFromCoords(location: WorldCoords): LocationId {
  return locationIdFromBigInt(mimcHash(location.x, location.y));
}
