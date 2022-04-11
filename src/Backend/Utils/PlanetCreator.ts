import { fakeHash, mimcHash, modPBigInt, perlin } from '@darkforest_eth/hashing';
import { EthConnection } from '@darkforest_eth/network';
import {
  buildContractCallArgs,
  fakeProof,
  RevealSnarkContractCallArgs,
  RevealSnarkInput,
  SnarkJSProofAndSignals,
} from '@darkforest_eth/snarks';

import revealCircuitPath from '@darkforest_eth/snarks/reveal.wasm';
import revealZkeyPath from '@darkforest_eth/snarks/reveal.zkey';
import {
  AdminPlanet,
  ContractMethodName,
  EthAddress,
  LocationId,
  UnconfirmedCreateArenaPlanet,
  UnconfirmedReveal,
  WorldCoords,
  WorldLocation,
} from '@darkforest_eth/types';
import { BigNumberish } from 'ethers';
import { LobbyInitializers } from '../../Frontend/Panes/Lobbies/Reducer';
import { ContractsAPI, makeContractsAPI } from '../GameLogic/ContractsAPI';

export type CreatePlanetData = {
  location: string;
  planetCoords: {
    x: number;
    y: number;
  };
  perlinValue: number;
  biomeBase: number;
};

export class PlanetCreator {
  private readonly lobbyAddress: EthAddress;
  private readonly contract: ContractsAPI;
  private readonly connection: EthConnection;

  private constructor(lobbyAddress: EthAddress, contract: ContractsAPI, connection: EthConnection) {
    this.lobbyAddress = lobbyAddress;
    this.contract = contract;
    this.connection = connection;
  }

  static async create(lobbyAddress: EthAddress, connection: EthConnection): Promise<PlanetCreator> {
    const contract = await makeContractsAPI({ connection, contractAddress: lobbyAddress });
    const planetCreator = new PlanetCreator(lobbyAddress, contract, connection);
    return planetCreator;
  }
  
  private generatePlanetData(planet: AdminPlanet, initializers: LobbyInitializers) {
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

    const biomeBase = perlin(planetCoords, {
      key: initializers.BIOMEBASE_KEY,
      scale: initializers.PERLIN_LENGTH_SCALE,
      mirrorX: initializers.PERLIN_MIRROR_X,
      mirrorY: initializers.PERLIN_MIRROR_Y,
      floor: true,
    });

    return {
      location: location,
      planetCoords: planetCoords,
      perlinValue: perlinValue,
      biomeBase: biomeBase,
    };
  }

  async createPlanet(planet: AdminPlanet, initializers: LobbyInitializers) {
    const planetData = this.generatePlanetData(planet, initializers);
    const locNum = planetData.location as BigNumberish;

    const args = Promise.resolve([
      {
        location: locNum,
        perlin: planetData.perlinValue,
        level: planet.level,
        planetType: planet.planetType,
        requireValidLocationId: planet.requireValidLocationId,
        isTargetPlanet: planet.isTargetPlanet,
        isSpawnPlanet: planet.isSpawnPlanet,
      },
    ]);

    const txIntent: UnconfirmedCreateArenaPlanet = {
      methodName: ContractMethodName.CREATE_ARENA_PLANET,
      contract: this.contract.contract,
      args: args,
    };

    const tx = await this.contract.submitTransaction(txIntent, {
      gasLimit: '15000000',
    });

    await tx.confirmedPromise;
  }

  async revealPlanet(
    planet: AdminPlanet,
    initializers: LobbyInitializers,
  ) {
    const planetData = this.generatePlanetData(planet, initializers);
    const getArgs = async () => {
      const revealArgs = await this.makeRevealProof(
        planet.x,
        planet.y,
        initializers.PLANETHASH_KEY,
        initializers.SPACETYPE_KEY,
        initializers.PERLIN_LENGTH_SCALE,
        initializers.PERLIN_MIRROR_X,
        initializers.PERLIN_MIRROR_Y,
        initializers.DISABLE_ZK_CHECKS,
        initializers.PLANET_RARITY
      );
      return revealArgs;
    };

    const worldLocation = {
      coords: planetData.planetCoords as WorldCoords,
      hash: location.toString() as LocationId,
      perlin: planetData.perlinValue,
      biomebase: planetData.biomeBase,
    } as WorldLocation;

    const txIntent: UnconfirmedReveal = {
      methodName: ContractMethodName.REVEAL_LOCATION,
      contract: this.contract.contract,
      locationId: location.toString() as LocationId,
      location: worldLocation,
      args: getArgs(),
    };

    // Always await the submitTransaction so we can catch rejections
    const tx = await this.contract.submitTransaction(txIntent);
    console.log(`reveal tx submitted`);

    await tx.confirmedPromise;
    console.log(`reveal tx accepted`);
  }

  private async makeRevealProof(
    x: number,
    y: number,
    planetHashKey: number,
    spaceTypeKey: number,
    scale: number,
    mirrorX: boolean,
    mirrorY: boolean,
    zkChecksDisabled: boolean,
    planetRarity: number
  ): Promise<RevealSnarkContractCallArgs> {
    if (zkChecksDisabled) {
      const location = fakeHash(planetRarity)(x, y).toString();
      const perlinValue = perlin(
        { x, y },
        {
          key: spaceTypeKey,
          scale,
          mirrorX,
          mirrorY,
          floor: true,
        }
      );
      const { proof, publicSignals } = fakeProof([
        location,
        perlinValue.toString(),
        modPBigInt(x).toString(),
        modPBigInt(y).toString(),
        planetHashKey.toString(),
        spaceTypeKey.toString(),
        scale.toString(),
        mirrorX ? '1' : '0',
        mirrorY ? '1' : '0',
      ]);
      return buildContractCallArgs(proof, publicSignals) as RevealSnarkContractCallArgs;
    } else {
      const input: RevealSnarkInput = {
        x: modPBigInt(x).toString(),
        y: modPBigInt(y).toString(),
        PLANETHASH_KEY: planetHashKey.toString(),
        SPACETYPE_KEY: spaceTypeKey.toString(),
        SCALE: scale.toString(),
        xMirror: mirrorX ? '1' : '0',
        yMirror: mirrorY ? '1' : '0',
      };

      const { proof, publicSignals }: SnarkJSProofAndSignals =
        await window.snarkjs.groth16.fullProve(input, revealCircuitPath, revealZkeyPath);

      return buildContractCallArgs(proof, publicSignals) as RevealSnarkContractCallArgs;
    }
  }
}
