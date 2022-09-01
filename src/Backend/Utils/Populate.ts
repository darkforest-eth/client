//

import { ArenaCreationManager } from '../GameLogic/ArenaCreationManager';
import { stockConfig } from '../../Frontend/Utils/StockConfigs';
import { EthConnection } from '@darkforest_eth/network';
import { EthAddress, UnconfirmedInit } from '@darkforest_eth/types';
import { HashConfig } from '../../_types/global/GlobalTypes';
import SnarkArgsHelper from './SnarkArgsHelper';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import { useRef } from 'react';
import { DarkForest } from '@darkforest_eth/contracts/typechain';
import { loadDiamondContract } from '../Network/Blockchain';

export async function populate(
  ethConnection: EthConnection,
  contractAddress: EthAddress
): Promise<void> {
  const config = stockConfig.devOnePlayerRace;

  // 1. Create new arena Creation manager
  const newCreationManager = await ArenaCreationManager.create(ethConnection, contractAddress);

  // 2. Fetch home planet.
  console.log(`ADMIN Planets`, config.ADMIN_PLANETS);
  const homePlanet = config.ADMIN_PLANETS.filter((p) => p.isSpawnPlanet)[0];
  const initHomePlanet = newCreationManager.lobbyPlanetToInitPlanet(homePlanet, config);

  // 3. Create and Init Arena
  const { owner, lobby } = await newCreationManager.createAndInitArena(config);

  console.log('Created lobby at', lobby);

  const contract = await ethConnection.loadContract<DarkForest>(lobby, loadDiamondContract);

  // 4. Add Admin Planets
  await newCreationManager.bulkCreateInitPlanets({ config });

  // 5. Make init Snark Args
  const hashConfig: HashConfig = {
    planetHashKey: config.PLANETHASH_KEY,
    spaceTypeKey: config.SPACETYPE_KEY,
    biomebaseKey: config.BIOMEBASE_KEY,
    perlinLengthScale: config.PERLIN_LENGTH_SCALE,
    perlinMirrorX: config.PERLIN_MIRROR_X,
    perlinMirrorY: config.PERLIN_MIRROR_Y,
    planetRarity: config.PLANET_RARITY,
    planetLevelThresholds: config.PLANET_LEVEL_THRESHOLDS,
  };

  const useMockHash = config.DISABLE_ZK_CHECKS;

  // @ts-expect-error
  const snarkHelper = SnarkArgsHelper.create(hashConfig, undefined, useMockHash);
  const getArgs = async () => {
    const args = await snarkHelper.getInitArgs(
      homePlanet.x,
      homePlanet.y,
      Math.floor(Math.sqrt(homePlanet.x ** 2 + homePlanet.y ** 2)) + 1 // floor(sqrt(x^2 + y^2)) + 1
    );
    return args;
  };

  const args = await getArgs();

  const configHash = newCreationManager.getArenaConfigHash();
  console.log('Config hash:', configHash);

  const initTx = await contract.initializePlayer(...args, 0);
  const initRct = await initTx.wait();
  console.log(`initialized player`);

  const claimTx = await contract.claimVictory();
  const claimRct = await claimTx.wait();

  console.log(`gameOver?`, await contract.getGameover());
}
