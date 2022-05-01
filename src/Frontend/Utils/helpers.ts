import { DarkForest } from '@darkforest_eth/contracts/typechain';
import { address } from '@darkforest_eth/serde';
import { EthAddress } from '@darkforest_eth/types';
import { keccak256, toUtf8Bytes } from 'ethers/lib/utils';
import { TransactionReceipt } from '@ethersproject/providers';

// THIS IS BAD BECAUSE NOT TYPE SAFE
export function getLobbyCreatedEvent(
  lobbyReceipt: TransactionReceipt,
  contract: DarkForest
): { owner: EthAddress; lobby: EthAddress } {
  const lobbyCreatedHash = keccak256(toUtf8Bytes('LobbyCreated(address,address)'));
  const log = lobbyReceipt.logs.find((log) => log.topics[0] === lobbyCreatedHash);
  if (log) {
    return {
      owner: address(contract.interface.parseLog(log).args.ownerAddress),
      lobby: address(contract.interface.parseLog(log).args.lobbyAddress),
    };
  } else {
    throw new Error('Lobby Created event not found');
  }
}
