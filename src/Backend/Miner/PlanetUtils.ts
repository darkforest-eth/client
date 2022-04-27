import { getBytesFromHex } from "@darkforest_eth/hexgen";
import { LocationId } from "@darkforest_eth/types";
import * as bigInt from 'big-integer';

export function planetLevelBelowLevel0Threshold(hex: LocationId, thresholds: number[]): boolean {
  const levelBigInt = getBytesFromHex(hex, 4, 7);

  // Threshold [0] is the largest number.
  return levelBigInt < bigInt(thresholds[0]);
}
