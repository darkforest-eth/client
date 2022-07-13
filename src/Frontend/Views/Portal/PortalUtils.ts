import { EthAddress } from '@darkforest_eth/types';

export function truncateAddress(address: EthAddress) {
  return address.substring(0, 6) + '...' + address.substring(36, 42);
}

export function truncateString(str: string, maxLength: number) {
  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
}
