import { INIT_ADDRESS } from '@darkforest_eth/contracts';
import { DarkForest, DFArenaInitialize } from '@darkforest_eth/contracts/typechain';
import { EthConnection } from '@darkforest_eth/network';
import { ContractMethodName, EthAddress, UnconfirmedCreateLobby } from '@darkforest_eth/types';
import _ from 'lodash';
import { LobbyInitializers } from '../../Frontend/Panes/Lobbies/Reducer';
import { OPTIMISM_GAS_LIMIT } from '../../Frontend/Utils/constants';
import { getLobbyCreatedEvent, lobbyPlanetsToInitPlanets } from '../../Frontend/Utils/helpers';
import { ContractsAPI } from '../GameLogic/ContractsAPI';
import { loadDiamondContract, loadInitContract } from '../Network/Blockchain';

/**
 * Creates and initializes a new arena
 */
export async function createAndInitArena({
  config,
  ethConnection,
  contractsAPI,
}: {
  config: LobbyInitializers;
  ethConnection: EthConnection;
  contractsAPI: ContractsAPI;
}) {
  var initializers = config;
  if (initializers.ADMIN_PLANETS) {
    initializers.INIT_PLANETS = lobbyPlanetsToInitPlanets(initializers, initializers.ADMIN_PLANETS);
  }

  /* Don't want to submit ADMIN_PLANET as initdata because not used */

  // @ts-expect-error The Operand of a delete must be optional
  delete initializers.ADMIN_PLANETS;

  try {

  const initContract = await ethConnection.loadContract<DFArenaInitialize>(
    INIT_ADDRESS,
    loadInitContract
  );

  const artifactBaseURI = '';
  const initInterface = initContract.interface;
  const initAddress = INIT_ADDRESS;
  const initFunctionCall = initInterface.encodeFunctionData('init', [
    initializers,
    {
      allowListEnabled: initializers.WHITELIST_ENABLED,
      artifactBaseURI,
      allowedAddresses: initializers.WHITELIST,
    },
  ]);
  console.log('creating lobby at', contractsAPI.getContractAddress())
  const txIntent: UnconfirmedCreateLobby = {
    methodName: 'createLobby',
    contract: contractsAPI.contract,
    args: Promise.resolve([initAddress, initFunctionCall]),
  };

  const tx = await contractsAPI.submitTransaction(txIntent, {
    // The createLobby function costs somewhere around 12mil gas
    gasLimit: OPTIMISM_GAS_LIMIT,
  });

  const lobbyReceipt = await tx.confirmedPromise;
  console.log(`created arena with ${lobbyReceipt.gasUsed} gas`);

  const { owner, lobby } = getLobbyCreatedEvent(lobbyReceipt, contractsAPI.contract);

  const diamond = await ethConnection.loadContract<DarkForest>(lobby, loadDiamondContract);

  const startTx = await diamond.start({gasLimit: OPTIMISM_GAS_LIMIT});
  const startRct = await startTx.wait();
  console.log(`initialized arena with ${startRct.gasUsed} gas`);
  return { owner, lobby, startTx };

} catch(e) {
  console.log(e);
  throw new Error('lobby creation transaction failed.')
}

}

export async function createPlanets({
  config,
  contractAPI,
  CHUNK_SIZE,
}: {
  config: LobbyInitializers;
  contractAPI: ContractsAPI;
  CHUNK_SIZE: number;
}) {
  const createPlanetTxs = _.chunk(config.INIT_PLANETS, CHUNK_SIZE).map(async (chunk) => {
    const args = Promise.resolve([chunk]);
    const txIntent = {
      methodName: 'bulkCreateAndReveal' as ContractMethodName,
      contract: contractAPI.contract,
      args: args,
    };

    const tx = await contractAPI.submitTransaction(txIntent, {
      gasLimit: OPTIMISM_GAS_LIMIT
    });

    return tx.confirmedPromise;
  });

  await Promise.all(createPlanetTxs);
  console.log(
    `successfully created planets`,
    createPlanetTxs.map((i) => i)
  );
}
