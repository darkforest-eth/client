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

/**
 * constructors for specific types
 * this pattern ensures that LocationIds and Addresses can only be initialized through constructors that do
 * appropriate validation
 * see https://stackoverflow.com/questions/51813272/declaring-string-type-with-min-max-length-in-typescript
 */
export class CheckedTypeUtils {
  public static EMPTY_ADDRESS = CheckedTypeUtils.address(
    '0000000000000000000000000000000000000000'
  );

  public static EMPTY_LOCATION_ID = CheckedTypeUtils.locationIdFromHexStr(
    '0000000000000000000000000000000000000000000000000000000000000000'
  );

  public static locationIdFromHexStr(location: string) {
    const locationBI = bigInt(location, 16);
    if (locationBI.geq(LOCATION_ID_UB)) throw new Error('not a valid location');
    let ret = locationBI.toString(16);
    while (ret.length < 64) ret = '0' + ret;
    return ret as LocationId;
  }

  public static locationIdFromDecStr(location: string) {
    const locationBI = bigInt(location);
    if (locationBI.geq(LOCATION_ID_UB)) throw new Error('not a valid location');
    let ret = locationBI.toString(16);
    while (ret.length < 64) ret = '0' + ret;
    return ret as LocationId;
  }

  public static artifactIdFromDecStr(artifactId: string): ArtifactId {
    const locationBI = bigInt(artifactId);
    let ret = locationBI.toString(16);
    while (ret.length < 64) ret = '0' + ret;
    return ret as ArtifactId;
  }

  public static locationIdFromBigInt(location: BigInteger): LocationId {
    const locationBI = bigInt(location);
    if (locationBI.geq(LOCATION_ID_UB)) throw new Error('not a valid location');
    let ret = locationBI.toString(16);
    while (ret.length < 64) ret = '0' + ret;
    return ret as LocationId;
  }

  public static locationIdFromEthersBN(location: EthersBN): LocationId {
    return CheckedTypeUtils.locationIdFromDecStr(location.toString());
  }

  public static artifactIdFromEthersBN(artifactId: EthersBN): ArtifactId {
    return CheckedTypeUtils.artifactIdFromDecStr(artifactId.toString());
  }

  public static locationIdToDecStr(locationId: LocationId): string {
    return bigInt(locationId, 16).toString(10);
  }

  public static artifactIdToDecStr(artifactId: ArtifactId): string {
    return bigInt(artifactId, 16).toString(10);
  }

  public static address(str: string): EthAddress {
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
  }

  /**
   * this shouldn't be used in render loop or anywhere where calls are made very frequently (mimc is expensive)
   */
  public static locationIdFromCoords(location: WorldCoords): LocationId {
    return CheckedTypeUtils.locationIdFromBigInt(
      mimcHash(location.x, location.y)
    );
  }
}
