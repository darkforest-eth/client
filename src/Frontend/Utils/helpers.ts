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
      owner: address(contract.interface.parseLog(log).args.creatorAddress),
      lobby: address(contract.interface.parseLog(log).args.lobbyAddress),
    };
  } else {
    throw new Error('Lobby Created event not found');
  }
}

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


export function lobbyPlanetToInitPlanet(planet: LobbyPlanet, initializers: LobbyInitializers) {
  const locationFunc = initializers.DISABLE_ZK_CHECKS
    ? fakeHash(initializers.PLANET_RARITY)
    : mimcHash(initializers.PLANETHASH_KEY);

  const location = locationFunc(planet.x, planet.y).toString();

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
    blockedPlanetIds: planet.blockedPlanetLocs.map((p) => locationFunc(p.x, p.y).toString()),
  };
}

export function lobbyPlanetsToInitPlanets(initializers: LobbyInitializers, planets: LobbyPlanet[]) {
  const initPlanets: {
    x: string;
    y: string;
    level: number;
    planetType: number;
    requireValidLocationId: boolean;
    location: string;
    perlin: number;
    isTargetPlanet: boolean;
    isSpawnPlanet: boolean;
    blockedPlanetIds: string[];
  }[] = [];
  planets.forEach((p) =>
  initPlanets.push(lobbyPlanetToInitPlanet(p, initializers))
  );
  // SORT INIT PLANETS SO THEY HAVE SAME ORDER ON-CHAIN. THIS CAN BREAK CONFIG HASH OTHERWISE.
  initPlanets.sort((a,b) => (a.location > b.location ? 1 : -1))
  return initPlanets;
}

