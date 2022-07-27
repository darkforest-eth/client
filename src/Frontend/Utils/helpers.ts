import { DarkForest } from '@darkforest_eth/contracts/typechain';
import { address } from '@darkforest_eth/serde';
import { EthAddress } from '@darkforest_eth/types';
import { keccak256, toUtf8Bytes } from 'ethers/lib/utils';
import { TransactionReceipt } from '@ethersproject/providers';
// THIS IS BAD BECAUSE NOT TYPE SAFE
export function getReadyEvent(
  readyReceipt: TransactionReceipt,
  contract: DarkForest
): { player: EthAddress; time: number } {
  const readyHash = keccak256(toUtf8Bytes('PlayerReady(address,uint256)'));
  const log = readyReceipt.logs.find((log) => log.topics[0] === readyHash);
  if (log) {
    return {
      player: address(contract.interface.parseLog(log).args.player),
      time: contract.interface.parseLog(log).args.time,
    };
  } else {
    throw new Error('Player Ready event not found');
  }
}