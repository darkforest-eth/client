import { DarkForest } from '@darkforest_eth/contracts/typechain';
import { address } from '@darkforest_eth/serde';
import { EthAddress } from '@darkforest_eth/types';
import { keccak256, toUtf8Bytes } from 'ethers/lib/utils';
import { TransactionReceipt } from '@ethersproject/providers';
import { LobbyPlanet } from '../Panes/Lobbies/LobbiesUtils';
import { fakeHash, mimcHash, modPBigInt, perlin } from '@darkforest_eth/hashing';
import { LobbyInitializers } from '../Panes/Lobbies/Reducer';

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

export function lobbyPlanetToInitPlanet(planet: LobbyPlanet, initializers: LobbyInitializers) {
  const location = initializers.DISABLE_ZK_CHECKS
    ? fakeHash(initializers.PLANET_RARITY)(planet.x, planet.y).toString()
    : mimcHash(initializers.PLANETHASH_KEY)(planet.x, planet.y).toString();

  const planetCoords = {
    x: planet.x,
    y: planet.y,
  };

  const perlinValue = perlin(planetCoords, {
    key: initializers.SPACETYPE_KEY,
    scale: initializers.PERLIN_LENGTH_SCALE,
    mirrorX: initializers.PERLIN_MIRROR_X,
    mirrorY: initializers.PERLIN_MIRROR_Y,
    floor: true,
  });

  return {
    location: location,
    x: modPBigInt(planet.x).toString(),
    y: modPBigInt(planet.y).toString(),
    perlin: perlinValue,
    level: planet.level,
    planetType: planet.planetType,
    requireValidLocationId: false,
    isTargetPlanet: planet.isTargetPlanet,
    isSpawnPlanet: planet.isSpawnPlanet,
  };
}

export function lobbyPlanetsToInitPlanets(planets: LobbyPlanet[], initializers: LobbyInitializers) {
  return planets.map(p => lobbyPlanetToInitPlanet(p, initializers));
}