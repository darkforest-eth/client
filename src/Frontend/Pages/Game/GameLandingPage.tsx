import { BLOCK_EXPLORER_URL } from '@darkforest_eth/constants';
import { CONTRACT_ADDRESS, FAUCET_ADDRESS, INIT_ADDRESS } from '@darkforest_eth/contracts';
import { DarkForest, DFArenaFaucet, DFArenaInitialize } from '@darkforest_eth/contracts/typechain';
import {
  EthConnection,
  neverResolves,
  ThrottledConcurrentQueue,
  weiToEth,
} from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import { bigIntFromKey } from '@darkforest_eth/whitelist';
import { utils, Wallet } from 'ethers';
import { reverse } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { makeContractsAPI } from '../../../Backend/GameLogic/ContractsAPI';
import GameManager, { GameManagerEvent } from '../../../Backend/GameLogic/GameManager';
import GameUIManager from '../../../Backend/GameLogic/GameUIManager';
import TutorialManager, { TutorialState } from '../../../Backend/GameLogic/TutorialManager';
import {
  addAccount,
  getAccounts,
  getActive,
  resetActive,
  setActive,
} from '../../../Backend/Network/AccountManager';
import {
  getEthConnection,
  loadDiamondContract,
  loadFaucetContract,
  loadInitContract,
} from '../../../Backend/Network/Blockchain';
import {
  callRegisterAndWaitForConfirmation,
  EmailResponse,
  RegisterConfirmationResponse,
  requestFaucet,
  submitInterestedEmail,
  submitPlayerEmail,
} from '../../../Backend/Network/UtilityServerAPI';
import { getWhitelistArgs } from '../../../Backend/Utils/WhitelistSnarkArgsHelper';
import { ZKArgIdx } from '../../../_types/darkforest/api/ContractsAPITypes';
import {
  GameWindowWrapper,
  InitRenderState,
  TerminalToggler,
  TerminalWrapper,
  Wrapper,
} from '../../Components/GameLandingPageComponents';
import { MythicLabelText } from '../../Components/Labels/MythicLabel';
import { TextPreview } from '../../Components/TextPreview';
import { TopLevelDivProvider, UIManagerProvider } from '../../Utils/AppHooks';
import { Incompatibility, unsupportedFeatures } from '../../Utils/BrowserChecks';
import { TerminalTextStyle } from '../../Utils/TerminalTypes';
import UIEmitter, { UIEmitterEvent } from '../../Utils/UIEmitter';
import { GameWindowLayout } from '../../Views/GameWindowLayout';
import { Terminal, TerminalHandle } from '../../Views/Terminal';
import { stockConfig } from '../../Utils/StockConfigs';
import {
  ContractMethodName,
  EthAddress,
  LocationId,
  UnconfirmedCreateLobby,
} from '@darkforest_eth/types';
import { getLobbyCreatedEvent, lobbyPlanetsToInitPlanets } from '../../Utils/helpers';
import _ from 'lodash';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { loadConfigFromAddress } from '../../../Backend/Network/ConfigApi';

const enum TerminalPromptStep {
  NONE,
  COMPATIBILITY_CHECKS_PASSED,
  GENERATE_ACCOUNT,
  IMPORT_ACCOUNT,
  ARENA_CREATED,
  PLANETS_CREATED,
  CONTRACT_SET,
  ACCOUNT_SET,
  SPECTATING,
  PLAYING,
  ASKING_HAS_WHITELIST_KEY,
  ASKING_WAITLIST_EMAIL,
  ASKING_WHITELIST_KEY,
  ASKING_PLAYER_EMAIL,
  FETCHING_ETH_DATA,
  ASK_ADD_ACCOUNT,
  ADD_ACCOUNT,
  NO_HOME_PLANET,
  SEARCHING_FOR_HOME_PLANET,
  ALL_CHECKS_PASS,
  COMPLETE,
  TERMINATED,
  ERROR,
}

export function GameLandingPage({ match, location }: RouteComponentProps<{ contract: string }>) {
  const history = useHistory();
  const terminalHandle = useRef<TerminalHandle>();
  const gameUIManagerRef = useRef<GameUIManager | undefined>();
  const topLevelContainer = useRef<HTMLDivElement | null>(null);

  const [gameManager, setGameManager] = useState<GameManager | undefined>();
  const [terminalVisible, setTerminalVisible] = useState(true);
  const [initRenderState, setInitRenderState] = useState(InitRenderState.NONE);
  const [ethConnection, setEthConnection] = useState<EthConnection | undefined>();
  const [contractAddress, setContractAddress] = useState<EthAddress | undefined>(
    match.params.contract ? address(match.params.contract) : undefined
  );
  const [step, setStep] = useState(TerminalPromptStep.NONE);
  const [config, setConfig] = useState<LobbyInitializers>(stockConfig.competitive);
  const params = new URLSearchParams(location.search);
  const useZkWhitelist = params.has('zkWhitelist');
  const selectedAddress = params.get('account');
  const createInstance = params.has('create');
  const isLobby = contractAddress !== address(CONTRACT_ADDRESS);
  const CHUNK_SIZE = 5;
  const defaultAddress = address(CONTRACT_ADDRESS);

  useEffect(() => {
    getEthConnection()
      .then((ethConnection) => setEthConnection(ethConnection))
      .catch((e) => {
        alert('error connecting to blockchain');
        console.log(e);
      });
  }, []);

  const isProd = process.env.NODE_ENV === 'production';

  const advanceStateFromNone = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      const issues = await unsupportedFeatures();

      if (issues.includes(Incompatibility.MobileOrTablet)) {
        terminal.current?.println(
          'ERROR: Mobile or tablet device detected. Please use desktop.',
          TerminalTextStyle.Red
        );
      }

      if (issues.includes(Incompatibility.NoIDB)) {
        terminal.current?.println(
          'ERROR: IndexedDB not found. Try using a different browser.',
          TerminalTextStyle.Red
        );
      }

      if (issues.includes(Incompatibility.UnsupportedBrowser)) {
        terminal.current?.println(
          'ERROR: Browser unsupported. Try Brave, Firefox, or Chrome.',
          TerminalTextStyle.Red
        );
      }

      if (issues.length > 0) {
        terminal.current?.print(
          `${issues.length.toString()} errors found. `,
          TerminalTextStyle.Red
        );
        terminal.current?.println('Please resolve them and refresh the page.');
        setStep(TerminalPromptStep.ASKING_WAITLIST_EMAIL);
      } else {
        setStep(TerminalPromptStep.COMPATIBILITY_CHECKS_PASSED);
      }
    },
    []
  );

  const advanceStateFromCompatibilityPassed = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      if (isLobby) {
        terminal.current?.newline();
        terminal.current?.printElement(
          <MythicLabelText text={`You are joining a Dark Forest Arena`} />
        );
        terminal.current?.newline();
        terminal.current?.newline();
      } else {
        terminal.current?.newline();
        terminal.current?.newline();
        terminal.current?.printElement(<MythicLabelText text={`                 Dark Forest`} />);
        terminal.current?.newline();
        terminal.current?.newline();

        terminal.current?.print('    ');
        terminal.current?.print('Version', TerminalTextStyle.Sub);
        terminal.current?.print('    ');
        terminal.current?.print('Date', TerminalTextStyle.Sub);
        terminal.current?.print('              ');
        terminal.current?.print('Champion', TerminalTextStyle.Sub);
        terminal.current?.newline();

        terminal.current?.print('    v0.1       ', TerminalTextStyle.Text);
        terminal.current?.print('02/05/2020        ', TerminalTextStyle.Text);
        terminal.current?.printLink(
          'Dylan Field',
          () => {
            window.open('https://twitter.com/zoink');
          },
          TerminalTextStyle.Text
        );
        terminal.current?.newline();
        terminal.current?.print('    v0.2       ', TerminalTextStyle.Text);
        terminal.current?.println('06/06/2020        Nate Foss', TerminalTextStyle.Text);
        terminal.current?.print('    v0.3       ', TerminalTextStyle.Text);
        terminal.current?.print('08/07/2020        ', TerminalTextStyle.Text);
        terminal.current?.printLink(
          '@hideandcleanse',
          () => {
            window.open('https://twitter.com/hideandcleanse');
          },
          TerminalTextStyle.Text
        );
        terminal.current?.newline();
        terminal.current?.print('    v0.4       ', TerminalTextStyle.Text);
        terminal.current?.print('10/02/2020        ', TerminalTextStyle.Text);
        terminal.current?.printLink(
          'Jacob Rosenthal',
          () => {
            window.open('https://twitter.com/jacobrosenthal');
          },
          TerminalTextStyle.Text
        );
        terminal.current?.newline();
        terminal.current?.print('    v0.5       ', TerminalTextStyle.Text);
        terminal.current?.print('12/25/2020        ', TerminalTextStyle.Text);
        terminal.current?.printElement(
          <TextPreview
            text={'0xb05d95422bf8d5024f9c340e8f7bd696d67ee3a9'}
            focusedWidth={'100px'}
            unFocusedWidth={'100px'}
          />
        );
        terminal.current?.println('');

        terminal.current?.print('    v0.6 r1    ', TerminalTextStyle.Text);
        terminal.current?.print('05/22/2021        ', TerminalTextStyle.Text);
        terminal.current?.printLink(
          'Ansgar Dietrichs',
          () => {
            window.open('https://twitter.com/adietrichs');
          },
          TerminalTextStyle.Text
        );
        terminal.current?.newline();

        terminal.current?.print('    v0.6 r2    ', TerminalTextStyle.Text);
        terminal.current?.print('06/28/2021        ', TerminalTextStyle.Text);
        terminal.current?.printLink(
          '@orden_gg',
          () => {
            window.open('https://twitter.com/orden_gg');
          },
          TerminalTextStyle.Text
        );
        terminal.current?.newline();

        terminal.current?.print('    v0.6 r3    ', TerminalTextStyle.Text);
        terminal.current?.print('08/22/2021        ', TerminalTextStyle.Text);
        terminal.current?.printLink(
          '@dropswap_gg',
          () => {
            window.open('https://twitter.com/dropswap_gg');
          },
          TerminalTextStyle.Text
        );
        terminal.current?.newline();

        terminal.current?.print('    v0.6 r4    ', TerminalTextStyle.Text);
        terminal.current?.print('10/01/2021        ', TerminalTextStyle.Text);
        terminal.current?.printLink(
          '@orden_gg',
          () => {
            window.open('https://twitter.com/orden_gg');
          },
          TerminalTextStyle.Text
        );
        terminal.current?.newline();

        terminal.current?.print('    v0.6 r5    ', TerminalTextStyle.Text);
        terminal.current?.print('02/18/2022        ', TerminalTextStyle.Text);
        terminal.current?.printLink(
          '@d_fdao',
          () => {
            window.open('https://twitter.com/d_fdao');
          },
          TerminalTextStyle.Text
        );
        terminal.current?.print(' + ');
        terminal.current?.printLink(
          '@orden_gg',
          () => {
            window.open('https://twitter.com/orden_gg');
          },
          TerminalTextStyle.Text
        );
        terminal.current?.newline();
        terminal.current?.newline();
      }
      const account = getActive();

      if (account) {
        terminal.current?.println(`Found active account: ${account.address}`);
        await ethConnection?.setAccount(account.privateKey);
        setStep(TerminalPromptStep.ACCOUNT_SET);
        return;
      }

      const accounts = getAccounts();
      terminal.current?.println(`Found ${accounts.length} accounts on this device.`);
      terminal.current?.println(``);

      try {
        const balances = await loadBalances(accounts.map((a) => a.address));

        accounts.forEach((account, i) => {
          terminal.current?.print(`(${i + 1}): `, TerminalTextStyle.Sub);
          terminal.current?.print(`${account.address} `);
          terminal.current?.println(
            balances[i].toFixed(2) + ' xDAI',
            balances[i] < 0.001 ? TerminalTextStyle.Red : TerminalTextStyle.Green
          );
        });
      } catch (e) {
        console.log(e);
        terminal.current?.println(
          'An unknown error occurred. please try again.',
          TerminalTextStyle.Red
        );
        return;
      }
      terminal.current?.newline();
      terminal.current?.print('(n) ', TerminalTextStyle.Sub);
      terminal.current?.println(`Generate new burner wallet account.`);
      terminal.current?.print('(i) ', TerminalTextStyle.Sub);
      terminal.current?.println(`Import private key.`);
      terminal.current?.println(``);
      terminal.current?.println(`Select an option:`, TerminalTextStyle.Text);

      if (selectedAddress !== null) {
        terminal.current?.println(
          `Selecting account ${selectedAddress} from url...`,
          TerminalTextStyle.Green
        );

        // Search accounts backwards in case a player has used a private key more than once.
        // In that case, we want to take the most recently created account.
        const account = reverse(getAccounts()).find((a) => a.address === selectedAddress);
        if (!account) {
          terminal.current?.println('Unrecognized account found in url.', TerminalTextStyle.Red);
          return;
        }

        try {
          await ethConnection?.setAccount(account.privateKey);
          setStep(TerminalPromptStep.ACCOUNT_SET);
        } catch (e) {
          terminal.current?.println(
            'An unknown error occurred. please try again.',
            TerminalTextStyle.Red
          );
        }
      } else {
        const userInput = await terminal.current?.getInput();
        if (userInput && +userInput && +userInput <= accounts.length && +userInput > 0) {
          const account = accounts[+userInput - 1];
          await ethConnection?.setAccount(account.privateKey);
          setActive(account);
          setStep(TerminalPromptStep.ACCOUNT_SET);
        } else if (userInput === 'n') {
          setStep(TerminalPromptStep.GENERATE_ACCOUNT);
        } else if (userInput === 'i') {
          setStep(TerminalPromptStep.IMPORT_ACCOUNT);
        } else {
          terminal.current?.println('Unrecognized input. Please try again.');
          await advanceStateFromCompatibilityPassed(terminal);
        }
      }
    },
    [isLobby, ethConnection, selectedAddress]
  );

  async function loadBalances(addresses: EthAddress[]) {
    if (!ethConnection) throw new Error('error: cannot load balances');
    const queue = new ThrottledConcurrentQueue({
      invocationIntervalMs: 1000,
      maxInvocationsPerIntervalMs: 25,
    });

    const balances = await Promise.all(
      addresses.map((address) => queue.add(() => ethConnection.loadBalance(address)))
    );

    return balances.map(weiToEth);
  }

  const advanceStateFromGenerateAccount = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      const newWallet = Wallet.createRandom();
      const newSKey = newWallet.privateKey;
      const newAddr = address(newWallet.address);
      try {
        addAccount(newSKey);
        ethConnection?.setAccount(newSKey);
        setActive({ address: newAddr, privateKey: newSKey });

        terminal.current?.println(``);
        terminal.current?.print(`Created new burner wallet with address `);
        terminal.current?.printElement(<TextPreview text={newAddr} unFocusedWidth={'100px'} />);
        terminal.current?.println(``);
        terminal.current?.println('');
        terminal.current?.println(
          'Note: Burner wallets are stored in local storage.',
          TerminalTextStyle.Text
        );
        terminal.current?.println('They are relatively insecure and you should avoid ');
        terminal.current?.println('storing substantial funds in them.');
        terminal.current?.println('');
        terminal.current?.println('Also, clearing browser local storage/cache will render your');
        terminal.current?.println(
          'burner wallets inaccessible, unless you export your private keys.'
        );
        terminal.current?.println('');
        terminal.current?.println('Press ENTER to continue:', TerminalTextStyle.Text);

        await terminal.current?.getInput();
        setStep(TerminalPromptStep.ACCOUNT_SET);
      } catch (e) {
        terminal.current?.println(
          'An unknown error occurred. please try again.',
          TerminalTextStyle.Red
        );
      }
    },
    [ethConnection]
  );

  const advanceStateFromImportAccount = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.println(
        'Enter the 0x-prefixed private key of the account you wish to import',
        TerminalTextStyle.Text
      );
      terminal.current?.println(
        "NOTE: THIS WILL STORE THE PRIVATE KEY IN YOUR BROWSER'S LOCAL STORAGE",
        TerminalTextStyle.Text
      );
      terminal.current?.println(
        'Local storage is relatively insecure. We recommend only importing accounts with zero-to-no funds.'
      );
      terminal.current?.newline();
      terminal.current?.println('(x) to cancel', TerminalTextStyle.Text);
      terminal.current?.newline();
      const newSKey = (await terminal.current?.getInput()) || '';
      if (newSKey === 'x') {
        terminal.current?.newline();
        terminal.current?.println('Cancelled import.', TerminalTextStyle.Text);
        setStep(TerminalPromptStep.COMPATIBILITY_CHECKS_PASSED);
        return;
      }
      try {
        const newAddr = address(utils.computeAddress(newSKey));

        addAccount(newSKey);

        ethConnection?.setAccount(newSKey);
        setActive({ address: newAddr, privateKey: newSKey });
        terminal.current?.println(`Imported account with address ${newAddr}.`);
        setStep(TerminalPromptStep.ACCOUNT_SET);
      } catch (e) {
        terminal.current?.println(
          'An unknown error occurred. please try again.',
          TerminalTextStyle.Red
        );
      }
    },
    [ethConnection]
  );
  const advanceStateFromAccountSet = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      if (!createInstance) {
        setStep(TerminalPromptStep.CONTRACT_SET);
      } else {
        const playerAddress = ethConnection?.getAddress();
        if (!playerAddress || !ethConnection) throw new Error('not logged in');

        const currBalance = weiToEth(await ethConnection.loadBalance(playerAddress));
        const faucet = await ethConnection.loadContract<DFArenaFaucet>(
          FAUCET_ADDRESS,
          loadFaucetContract
        );
        const nextAccessTimeSeconds = (await faucet.getNextAccessTime(playerAddress)).toNumber();
        const nowSeconds = Date.now() / 1000;
        console.log(
          `You can receive another drip in ${Math.floor(
            (nextAccessTimeSeconds - nowSeconds) / 60 / 60
          )} hours`
        );
        if (currBalance < 0.005 && nowSeconds > nextAccessTimeSeconds) {
          terminal.current?.println(`Getting .01 xDAI from faucet...`, TerminalTextStyle.Blue);
          const success = await requestFaucet(playerAddress);
          if (success) {
            const newBalance = weiToEth(await ethConnection.loadBalance(playerAddress));
            terminal.current?.println(
              `Your balance has increased by ${newBalance - currBalance}.`,
              TerminalTextStyle.Green
            );
            await new Promise((r) => setTimeout(r, 1500));
          } else {
            terminal.current?.println(
              'An error occurred in faucet. Try again with an account that has XDAI',
              TerminalTextStyle.Red
            );

            terminal.current?.printLink(
              'or click here to manually get Optimism xDAI\n',
              () => {
                window.open(
                  'https://www.xdaichain.com/for-developers/optimism-optimistic-rollups-on-gc'
                );
              },
              TerminalTextStyle.Blue
            );
            terminal.current?.println('');
            setStep(TerminalPromptStep.COMPATIBILITY_CHECKS_PASSED);
            return;
          }
        }
        terminal.current?.println('');
        terminal.current?.print('Creating new arena instance... ');
        try {
          await createLobby();
          terminal.current?.println('arena created.', TerminalTextStyle.Green);
          setStep(TerminalPromptStep.ARENA_CREATED);
        } catch (e) {
          console.error(e);
          terminal.current?.println('FAILED', TerminalTextStyle.Red);
          terminal.current?.println('');
          terminal.current?.println('Press ENTER to try again.');
          await terminal.current?.getInput();
          terminal.current?.println('');

          await advanceStateFromAccountSet(terminal);
        }
      }
    },
    [ethConnection]
  );

  const advanceStateFromArenaCreated = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.print('Adding custom planets... ');

      try {
        if (!ethConnection || !defaultAddress) throw new Error('cannot create arena');

        const contractsAPI = await makeContractsAPI({
          connection: ethConnection,
          contractAddress: defaultAddress,
        });
 
        await createPlanets();
        terminal.current?.println('planets created.', TerminalTextStyle.Green);
        setStep(TerminalPromptStep.PLANETS_CREATED);
      } catch (e) {
        console.error(e);

        terminal.current?.println('FAILED', TerminalTextStyle.Red);
        terminal.current?.println('');
        terminal.current?.println('Press ENTER to try again.');
        await terminal.current?.getInput();

        await advanceStateFromArenaCreated(terminal);
        return;
      }
    },
    [ethConnection, contractAddress]
  );

  // TODO: Check that the config hash matches the competitive hash to ensure the game will be counted
  const advanceStateFromPlanetsCreated = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      setStep(TerminalPromptStep.CONTRACT_SET);
    },
    []
  );

  const advanceStateFromContractSet = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      // if(isGrandPrix) {
      //   setStep(TerminalPromptStep.PLAYING);
      //   return;
      // }
      terminal.current?.println(``);
      terminal.current?.println(
        `Would you like to play or spectate this game?`,
        TerminalTextStyle.Sub
      );

      terminal.current?.print('(a) ', TerminalTextStyle.Sub);
      terminal.current?.println(`Play.`);
      terminal.current?.print('(s) ', TerminalTextStyle.Sub);
      terminal.current?.println(`Spectate.`);
      terminal.current?.print(`(d) `, TerminalTextStyle.Sub);
      terminal.current?.println(`Change account.`);

      terminal.current?.println(``);
      terminal.current?.println(`Select an option:`, TerminalTextStyle.Text);

      const userInput = await terminal.current?.getInput();
      if (userInput === 'a') {
        setStep(TerminalPromptStep.PLAYING);
      } else if (userInput === 's') {
        setStep(TerminalPromptStep.SPECTATING);
      } else if (userInput === 'd') {
        resetActive();
        setStep(TerminalPromptStep.COMPATIBILITY_CHECKS_PASSED);
      } else {
        terminal.current?.println('Unrecognized input. Please try again.');
        await advanceStateFromContractSet(terminal);
      }
    },
    []
  );

  const advanceStateFromSpectating = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      let newGameManager: GameManager;
      try {
        const playerAddress = ethConnection?.getAddress();
        if (!playerAddress || !ethConnection || !contractAddress) throw new Error('not logged in');

        newGameManager = await GameManager.create({
          connection: ethConnection,
          terminal,
          contractAddress,
          spectator: true,
        });
      } catch (e) {
        console.error(e);

        setStep(TerminalPromptStep.ERROR);

        terminal.current?.print(
          'Network under heavy load. Please refresh the page, and check ',
          TerminalTextStyle.Red
        );

        terminal.current?.printLink(
          'https://blockscout.com/poa/xdai/optimism',
          () => {
            window.open('https://blockscout.com/xdai/optimism');
          },
          TerminalTextStyle.Red
        );

        terminal.current?.println('');

        return;
      }

      setGameManager(newGameManager);

      window.df = newGameManager;

      const newGameUIManager = await GameUIManager.create(newGameManager, terminal);

      window.ui = newGameUIManager;

      terminal.current?.newline();
      terminal.current?.println('Connected to Dark Forest Contract');
      gameUIManagerRef.current = newGameUIManager;
      setStep(TerminalPromptStep.ALL_CHECKS_PASS);
    },
    [ethConnection, isProd, contractAddress]
  );

  const advanceStateFromPlaying = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      try {
        const playerAddress = ethConnection?.getAddress();
        if (!playerAddress || !ethConnection || !contractAddress) throw new Error('not logged in');

        const whitelist = await ethConnection.loadContract<DarkForest>(
          contractAddress,
          loadDiamondContract
        );
        const isWhitelisted = await whitelist.isWhitelisted(playerAddress);
        // TODO(#2329): isWhitelisted should just check the contractOwner
        const adminAddress = address(await whitelist.adminAddress());

        terminal.current?.println('');
        terminal.current?.print('Checking if allow listed... ');

        // TODO(#2329): isWhitelisted should just check the contractOwner
        if (!isWhitelisted && playerAddress !== adminAddress) {
          terminal.current?.print(
            'You are not allowed to play this game. ',
            TerminalTextStyle.Red
          );
          setStep(TerminalPromptStep.TERMINATED);
          return;
        }
        terminal.current?.println('Player whitelisted.');
        terminal.current?.println('');
        terminal.current?.println(`Welcome, player ${playerAddress}.`);

        const currBalance = weiToEth(await ethConnection.loadBalance(playerAddress));
        const faucet = await ethConnection.loadContract<DFArenaFaucet>(
          FAUCET_ADDRESS,
          loadFaucetContract
        );
        const nextAccessTimeSeconds = (await faucet.getNextAccessTime(playerAddress)).toNumber();
        const nowSeconds = Date.now() / 1000;
        console.log(
          `You can receive another drip in ${Math.floor(
            (nextAccessTimeSeconds - nowSeconds) / 60 / 60
          )} hours`
        );
        if (currBalance < 0.005 && nowSeconds > nextAccessTimeSeconds) {
          terminal.current?.println(`Getting xDAI from faucet...`, TerminalTextStyle.Blue);
          const success = await requestFaucet(playerAddress);
          if (success) {
            const newBalance = weiToEth(await ethConnection.loadBalance(playerAddress));
            terminal.current?.println(
              `Your balance has increased by ${newBalance - currBalance}.`,
              TerminalTextStyle.Green
            );
            await new Promise((r) => setTimeout(r, 1500));
          } else {
            terminal.current?.println(
              'An error occurred in faucet. Try again with an account that has XDAI',
              TerminalTextStyle.Red
            );

            terminal.current?.printLink(
              'or click here to manually get Optimism xDAI\n',
              () => {
                window.open(
                  'https://www.xdaichain.com/for-developers/optimism-optimistic-rollups-on-gc'
                );
              },
              TerminalTextStyle.Blue
            );
            terminal.current?.println('');
            return;
          }
        }

        setStep(TerminalPromptStep.FETCHING_ETH_DATA);
      } catch (e) {
        console.error(`error connecting to whitelist: ${e}`);
        terminal.current?.println(
          'ERROR: Could not connect to whitelist contract. Please refresh and try again in a few minutes.',
          TerminalTextStyle.Red
        );
        setStep(TerminalPromptStep.TERMINATED);
      }
    },
    [ethConnection, isProd, contractAddress]
  );

  const advanceStateFromAskHasWhitelistKey = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.print('Do you have a whitelist key?', TerminalTextStyle.Text);
      terminal.current?.println(' (y/n)');
      const userInput = await terminal.current?.getInput();
      if (userInput === 'y') {
        setStep(TerminalPromptStep.ASKING_WHITELIST_KEY);
      } else if (userInput === 'n') {
        setStep(TerminalPromptStep.ASKING_WAITLIST_EMAIL);
      } else {
        terminal.current?.println('Unrecognized input. Please try again.');
        await advanceStateFromAskHasWhitelistKey(terminal);
      }
    },
    []
  );

  const advanceStateFromAskWhitelistKey = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      const address = ethConnection?.getAddress();
      if (!address) throw new Error('not logged in');

      terminal.current?.println(
        'Please enter your invite key (XXXXXX-XXXXXX-XXXXXX-XXXXXX):',
        TerminalTextStyle.Sub
      );

      const key = (await terminal.current?.getInput()) || '';

      terminal.current?.print('Processing key... (this may take up to 30s)');
      terminal.current?.newline();

      if (!useZkWhitelist) {
        let registerConfirmationResponse = {} as RegisterConfirmationResponse;
        try {
          registerConfirmationResponse = await callRegisterAndWaitForConfirmation(
            key,
            address,
            terminal
          );
        } catch (e) {
          registerConfirmationResponse = {
            canRetry: true,
            errorMessage:
              'There was an error connecting to the whitelist server. Please try again later.',
          };
        }

        if (!registerConfirmationResponse.txHash) {
          terminal.current?.println(
            'ERROR: ' + registerConfirmationResponse.errorMessage,
            TerminalTextStyle.Red
          );
          if (registerConfirmationResponse.canRetry) {
            terminal.current?.println('Press ENTER to try again.');
            await terminal.current?.getInput();
            advanceStateFromAskWhitelistKey(terminal);
          } else {
            setStep(TerminalPromptStep.ASKING_WAITLIST_EMAIL);
          }
        } else {
          terminal.current?.print('Successfully joined game. ', TerminalTextStyle.Green);
          terminal.current?.print(`Welcome, player `);
          terminal.current?.println(address, TerminalTextStyle.Text);
          terminal.current?.print('Sent player $0.15 :) ', TerminalTextStyle.Blue);
          terminal.current?.printLink(
            '(View Transaction)',
            () => {
              window.open(`${BLOCK_EXPLORER_URL}/${registerConfirmationResponse.txHash}`);
            },
            TerminalTextStyle.Blue
          );
          terminal.current?.newline();
          setStep(TerminalPromptStep.ASKING_PLAYER_EMAIL);
        }
      } else {
        if (!ethConnection || !contractAddress) throw new Error('no eth connection');
        const contractsAPI = await makeContractsAPI({ connection: ethConnection, contractAddress });

        const keyBigInt = bigIntFromKey(key);
        const snarkArgs = await getWhitelistArgs(keyBigInt, address, terminal);
        try {
          const ukReceipt = await contractsAPI.contract.useKey(
            snarkArgs[ZKArgIdx.PROOF_A],
            snarkArgs[ZKArgIdx.PROOF_B],
            snarkArgs[ZKArgIdx.PROOF_C],
            [...snarkArgs[ZKArgIdx.DATA]]
          );
          await ukReceipt.wait();
          terminal.current?.print('Successfully joined game. ', TerminalTextStyle.Green);
          terminal.current?.print(`Welcome, player `);
          terminal.current?.println(address, TerminalTextStyle.Text);
          terminal.current?.print('Sent player $0.15 :) ', TerminalTextStyle.Blue);
          terminal.current?.printLink(
            '(View Transaction)',
            () => {
              window.open(`${BLOCK_EXPLORER_URL}/${ukReceipt.hash}`);
            },
            TerminalTextStyle.Blue
          );
          terminal.current?.newline();
          setStep(TerminalPromptStep.ASKING_PLAYER_EMAIL);
        } catch (e) {
          const error = e.error;
          if (error instanceof Error) {
            const invalidKey = error.message.includes('invalid key');
            if (invalidKey) {
              terminal.current?.println(`ERROR: Key ${key} is not valid.`, TerminalTextStyle.Red);
              setStep(TerminalPromptStep.ASKING_WAITLIST_EMAIL);
            } else {
              terminal.current?.println(`ERROR: Something went wrong.`, TerminalTextStyle.Red);
              terminal.current?.println('Press ENTER to try again.');
              await terminal.current?.getInput();
              advanceStateFromAskWhitelistKey(terminal);
            }
          }
          console.error('Error whitelisting.');
        }
      }
    },
    [ethConnection, contractAddress, useZkWhitelist]
  );

  const advanceStateFromAskWaitlistEmail = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.println(
        'Enter your email address to sign up for the whitelist.',
        TerminalTextStyle.Text
      );
      const email = (await terminal.current?.getInput()) || '';
      terminal.current?.print('Response pending... ');
      const response = await submitInterestedEmail(email);
      if (response === EmailResponse.Success) {
        terminal.current?.println('Email successfully recorded. ', TerminalTextStyle.Green);
        terminal.current?.println(
          'Keep an eye out for updates and invite keys in the next few weeks. Press ENTER to return to the homepage.',
          TerminalTextStyle.Sub
        );
        setStep(TerminalPromptStep.TERMINATED);
        (await await terminal.current?.getInput()) || '';
        history.push('/');
      } else if (response === EmailResponse.Invalid) {
        terminal.current?.println('Email invalid. Please try again.', TerminalTextStyle.Red);
      } else {
        terminal.current?.print('ERROR: Server error. ', TerminalTextStyle.Red);
        terminal.current?.print('Press ENTER to return to homepage.', TerminalTextStyle.Sub);
        (await await terminal.current?.getInput()) || '';
        setStep(TerminalPromptStep.TERMINATED);
        history.push('/');
      }
    },
    [history]
  );

  const advanceStateFromAskPlayerEmail = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      const address = ethConnection?.getAddress();
      if (!address) throw new Error('not logged in');

      terminal.current?.print('Enter your email address. ', TerminalTextStyle.Text);
      terminal.current?.println("We'll use this email address to notify you if you win a prize.");

      const email = (await terminal.current?.getInput()) || '';
      const response = await submitPlayerEmail(await ethConnection?.signMessageObject({ email }));

      if (response === EmailResponse.Success) {
        terminal.current?.println('Email successfully recorded.');
        setStep(TerminalPromptStep.FETCHING_ETH_DATA);
      } else if (response === EmailResponse.Invalid) {
        terminal.current?.println('Email invalid.', TerminalTextStyle.Red);
        advanceStateFromAskPlayerEmail(terminal);
      } else {
        terminal.current?.println('Error recording email.', TerminalTextStyle.Red);
        setStep(TerminalPromptStep.FETCHING_ETH_DATA);
      }
    },
    [ethConnection]
  );

  const advanceStateFromFetchingEthData = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      let newGameManager: GameManager;

      try {
        if (!ethConnection || !contractAddress) throw new Error('no eth connection');

        const diamond = await ethConnection.loadContract<DarkForest>(
          contractAddress,
          loadDiamondContract
        );

        const configHash = (await diamond.getArenaConstants()).CONFIG_HASH;
        console.log('loaded config hash', configHash);

        newGameManager = await GameManager.create({
          connection: ethConnection,
          terminal,
          contractAddress,
          spectator: false,
          configHash,
        });
      } catch (e) {
        console.error(e);

        setStep(TerminalPromptStep.ERROR);

        terminal.current?.print(
          'Network under heavy load. Please refresh the page, and check ',
          TerminalTextStyle.Red
        );

        terminal.current?.printLink(
          'https://blockscout.com/poa/xdai/',
          () => {
            window.open('https://blockscout.com/poa/xdai/');
          },
          TerminalTextStyle.Red
        );

        terminal.current?.println('');

        return;
      }

      setGameManager(newGameManager);

      window.df = newGameManager;

      const newGameUIManager = await GameUIManager.create(newGameManager, terminal);

      window.ui = newGameUIManager;

      terminal.current?.newline();
      terminal.current?.println('Connected to Dark Forest Contract');
      gameUIManagerRef.current = newGameUIManager;

      if (!newGameManager.hasJoinedGame()) {
        setStep(TerminalPromptStep.NO_HOME_PLANET);
      } else {
        const browserHasData = !!newGameManager.getHomeCoords();
        if (!browserHasData) {
          terminal.current?.println(
            'ERROR: Home coords not found on this browser.',
            TerminalTextStyle.Red
          );
          setStep(TerminalPromptStep.ASK_ADD_ACCOUNT);
          return;
        }
        terminal.current?.println('Validated Local Data...');
        setStep(TerminalPromptStep.ALL_CHECKS_PASS);
      }
    },
    [ethConnection, contractAddress]
  );

  const advanceStateFromAskAddAccount = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.println('Import account home coordinates? (y/n)', TerminalTextStyle.Text);
      terminal.current?.println(
        "If you're importing an account, make sure you know what you're doing."
      );
      const userInput = await terminal.current?.getInput();
      if (userInput === 'y') {
        setStep(TerminalPromptStep.ADD_ACCOUNT);
      } else if (userInput === 'n') {
        terminal.current?.println('Try using a different account and reload.');
        setStep(TerminalPromptStep.TERMINATED);
      } else {
        terminal.current?.println('Unrecognized input. Please try again.');
        await advanceStateFromAskAddAccount(terminal);
      }
    },
    []
  );

  const advanceStateFromAddAccount = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      const gameUIManager = gameUIManagerRef.current;

      if (gameUIManager) {
        try {
          terminal.current?.println('x: ', TerminalTextStyle.Blue);
          const x = parseInt((await terminal.current?.getInput()) || '');
          terminal.current?.println('y: ', TerminalTextStyle.Blue);
          const y = parseInt((await terminal.current?.getInput()) || '');
          if (
            Number.isNaN(x) ||
            Number.isNaN(y) ||
            Math.abs(x) > 2 ** 32 ||
            Math.abs(y) > 2 ** 32
          ) {
            throw new Error('Invalid home coordinates.');
          }
          if (await gameUIManager.addAccount({ x, y })) {
            terminal.current?.println('Successfully added account.');
            terminal.current?.println('Initializing game...');
            setStep(TerminalPromptStep.ALL_CHECKS_PASS);
          } else {
            throw new Error('Invalid home coordinates.');
          }
        } catch (e) {
          terminal.current?.println(`ERROR: ${e}`, TerminalTextStyle.Red);
          terminal.current?.println('Please try again.');
        }
      } else {
        terminal.current?.println('ERROR: Game UI Manager not found. Terminating session.');
        setStep(TerminalPromptStep.TERMINATED);
      }
    },
    []
  );

  const advanceStateFromNoHomePlanet = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.println('Welcome to DARK FOREST.');

      const gameUIManager = gameUIManagerRef.current;
      if (!gameUIManager) {
        terminal.current?.println('ERROR: Game UI Manager not found. Terminating session.');
        setStep(TerminalPromptStep.TERMINATED);
        return;
      }
      const endTime = gameUIManager.getEndTimeSeconds();
      if (endTime && Date.now() / 1000 > endTime) {
        terminal.current?.println(
          'ERROR: This game has ended. Terminating session.',
          TerminalTextStyle.Red
        );
        setStep(TerminalPromptStep.TERMINATED);
        return;
      }
      const teamsEnabled = gameUIManager.getGameManager().getContractConstants().TEAMS_ENABLED;
      const numTeams = gameUIManager.getGameManager().getContractConstants().NUM_TEAMS;
      // console.log(`teamsEnabled: ${teamsEnabled}, numTeams: ${numTeams}`)
      let team = 0;
      if(teamsEnabled && numTeams !== undefined) {
        terminal.current?.println('')
        terminal.current?.println('This is a team game!')
        for (let i = 1; i <= numTeams; i += 1) {
          terminal.current?.print(`(${i}): `, TerminalTextStyle.Sub);
          terminal.current?.println(`Team ${i}`);
        }
        terminal.current?.println(``);
        terminal.current?.println(`Select a team:`, TerminalTextStyle.Text);
  
        team = +((await terminal.current?.getInput()) || '');
        if (isNaN(team) || team > numTeams || team == 0) {
          terminal.current?.println('Unrecognized input. Please try again.');
          await advanceStateFromNoHomePlanet(terminal);
          return;
        }
      }

      terminal.current?.newline();

      terminal.current?.println('We collect a minimal set of statistics such as SNARK proving');
      terminal.current?.println('times and average transaction times across browsers, to help ');
      terminal.current?.println('us optimize performance and fix bugs. You can opt out of this');
      terminal.current?.println('in the Settings pane.');
      terminal.current?.println('');

      if (!gameUIManager.getGameManager().getContractConstants().MANUAL_SPAWN) {
        terminal.current?.newline();
        terminal.current?.println('Press ENTER to find a home planet. This may take up to 120s.');
        terminal.current?.println('This will consume a lot of CPU.');

        await terminal.current?.getInput();
      }

      gameUIManager.getGameManager().on(GameManagerEvent.InitializedPlayer, () => {
        setTimeout(() => {
          terminal.current?.println('Initializing game...');
          setStep(TerminalPromptStep.ALL_CHECKS_PASS);
        });
      });

      gameUIManager
        .joinGame(async (e) => {
          console.error(e);

          terminal.current?.println('Error Joining Game:');
          terminal.current?.println('');
          terminal.current?.println(e.message, TerminalTextStyle.Red);
          terminal.current?.println('');
          terminal.current?.println('Press Enter to Try Again:');

          await terminal.current?.getInput();
          return true;
        }, team)
        .catch((error: Error) => {
          terminal.current?.println(
            `[ERROR] ${error.toString().slice(0, 10000)}`,
            TerminalTextStyle.Red
          );
        });
    },
    []
  );

  const advanceStateFromAllChecksPass = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      // terminal.current?.println('');
      // terminal.current?.println('Press ENTER to begin');
      // terminal.current?.println("Press 's' then ENTER to begin in SAFE MODE - plugins disabled");

      // const input = await terminal.current?.getInput();

      // if (input === 's') {
      //   const gameUIManager = gameUIManagerRef.current;
      //   gameUIManager?.getGameManager()?.setSafeMode(true);
      // }

      setStep(TerminalPromptStep.COMPLETE);
      setInitRenderState(InitRenderState.COMPLETE);
      terminal.current?.clear();

      terminal.current?.println('Welcome to the Dark Forest.', TerminalTextStyle.Green);
      terminal.current?.println('');
      terminal.current?.println(
        "This is the Dark Forest interactive JavaScript terminal. Only use this if you know exactly what you're doing."
      );
      terminal.current?.println('');
      terminal.current?.println('Try running: df.getAccount()');
      terminal.current?.println('');
    },
    []
  );

  const advanceStateFromComplete = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      const input = (await terminal.current?.getInput()) || '';
      let res = '';
      try {
        // indrect eval call: http://perfectionkills.com/global-eval-what-are-the-options/
        res = (1, eval)(input);
        if (res !== undefined) {
          terminal.current?.println(res.toString(), TerminalTextStyle.Text);
        }
      } catch (e) {
        res = e.message;
        terminal.current?.println(`ERROR: ${res}`, TerminalTextStyle.Red);
      }
      advanceStateFromComplete(terminal);
    },
    []
  );

  const advanceStateFromError = useCallback(async () => {
    await neverResolves();
  }, []);

  const advanceState = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      if (step === TerminalPromptStep.NONE && ethConnection) {
        await advanceStateFromNone(terminal);
      } else if (step === TerminalPromptStep.COMPATIBILITY_CHECKS_PASSED) {
        await advanceStateFromCompatibilityPassed(terminal);
      } else if (step === TerminalPromptStep.GENERATE_ACCOUNT) {
        await advanceStateFromGenerateAccount(terminal);
      } else if (step === TerminalPromptStep.IMPORT_ACCOUNT) {
        await advanceStateFromImportAccount(terminal);
      } else if (step === TerminalPromptStep.ACCOUNT_SET) {
        await advanceStateFromAccountSet(terminal);
      } else if (step === TerminalPromptStep.ARENA_CREATED) {
        await advanceStateFromArenaCreated(terminal);
      } else if (step === TerminalPromptStep.PLANETS_CREATED) {
        await advanceStateFromPlanetsCreated(terminal);
      } else if (step === TerminalPromptStep.CONTRACT_SET) {
        await advanceStateFromContractSet(terminal);
      } else if (step === TerminalPromptStep.SPECTATING) {
        await advanceStateFromSpectating(terminal);
      } else if (step === TerminalPromptStep.PLAYING) {
        await advanceStateFromPlaying(terminal);
      } else if (step === TerminalPromptStep.ASKING_HAS_WHITELIST_KEY) {
        await advanceStateFromAskHasWhitelistKey(terminal);
      } else if (step === TerminalPromptStep.ASKING_WHITELIST_KEY) {
        await advanceStateFromAskWhitelistKey(terminal);
      } else if (step === TerminalPromptStep.ASKING_WAITLIST_EMAIL) {
        await advanceStateFromAskWaitlistEmail(terminal);
      } else if (step === TerminalPromptStep.ASKING_PLAYER_EMAIL) {
        await advanceStateFromAskPlayerEmail(terminal);
      } else if (step === TerminalPromptStep.FETCHING_ETH_DATA) {
        await advanceStateFromFetchingEthData(terminal);
      } else if (step === TerminalPromptStep.ASK_ADD_ACCOUNT) {
        await advanceStateFromAskAddAccount(terminal);
      } else if (step === TerminalPromptStep.ADD_ACCOUNT) {
        await advanceStateFromAddAccount(terminal);
      } else if (step === TerminalPromptStep.NO_HOME_PLANET) {
        await advanceStateFromNoHomePlanet(terminal);
      } else if (step === TerminalPromptStep.ALL_CHECKS_PASS) {
        await advanceStateFromAllChecksPass(terminal);
      } else if (step === TerminalPromptStep.COMPLETE) {
        await advanceStateFromComplete(terminal);
      } else if (step === TerminalPromptStep.ERROR) {
        await advanceStateFromError();
      }
    },
    [step, ethConnection]
  );

  async function fetchConfig() {
    if (!contractAddress) return;
    try {
      const newConfig = await loadConfigFromAddress(contractAddress);
      return newConfig?.config;
    } catch (e) {
      console.error('failed to load config', e);
    }
  }
  async function createLobby() {
    if (!ethConnection || !defaultAddress) throw new Error('cannot create arena');

    const contractsAPI = await makeContractsAPI({
      connection: ethConnection,
      contractAddress: defaultAddress,
    });
    const playerAddress = ethConnection.getAddress();

    const fetchedConfig = await fetchConfig();

    if(!fetchedConfig) throw new Error('cannot find config');

    if (fetchedConfig.ADMIN_PLANETS.length > 0) {
      fetchedConfig.INIT_PLANETS = lobbyPlanetsToInitPlanets(fetchedConfig, fetchedConfig.ADMIN_PLANETS);
    }

    setConfig(fetchedConfig);
    
    /* Don't want to submit ADMIN_PLANET as initdata because they aren't used */
    // @ts-expect-error The Operand of a delete must be optional
    delete fetchedConfig.ADMIN_PLANETS;

    // console.log('config', config);

    const initContract = await ethConnection.loadContract<DFArenaInitialize>(
      INIT_ADDRESS,
      loadInitContract
    );

    const artifactBaseURI = '';
    const initInterface = initContract.interface;
    const initAddress = INIT_ADDRESS;
    const initFunctionCall = initInterface.encodeFunctionData('init', [
      fetchedConfig,
      {
        allowListEnabled: fetchedConfig.WHITELIST_ENABLED,
        artifactBaseURI,
        allowedAddresses: fetchedConfig.WHITELIST,
      },
    ]);
    const txIntent: UnconfirmedCreateLobby = {
      methodName: 'createLobby',
      contract: contractsAPI.contract,
      args: Promise.resolve([initAddress, initFunctionCall]),
    };

    const tx = await contractsAPI.submitTransaction(txIntent, {
      // The createLobby function costs somewhere around 12mil gas
      gasLimit: '15000000',
    });

    const lobbyReceipt = await tx.confirmedPromise;
    console.log(`created arena with ${lobbyReceipt.gasUsed} gas`);

    const { owner, lobby } = getLobbyCreatedEvent(lobbyReceipt, contractsAPI.contract);

    const diamond = await ethConnection.loadContract<DarkForest>(lobby, loadDiamondContract);

    const startTx = await diamond.start();
    const startRct = startTx.wait();
    console.log(`initialized arena with ${(await startRct).gasUsed} gas`);


    if (owner === playerAddress) {
      history.push({ pathname: `${lobby}`, state: { contract: lobby } });
      setContractAddress(lobby);
    }
  }


  async function createPlanets() {
    if (!ethConnection || !contractAddress) throw new Error('cannot create planets');

    const contractsAPI = await makeContractsAPI({
      connection: ethConnection,
      contractAddress,
    });
    
    const createPlanetTxs = _.chunk(config.INIT_PLANETS, CHUNK_SIZE).map(async (chunk) => {
      const args = Promise.resolve([chunk]);
      const txIntent = {
        methodName: 'bulkCreateAndReveal' as ContractMethodName,
        contract: contractsAPI.contract,
        args: args,
      };

      const tx = await contractsAPI.submitTransaction(txIntent, {
        gasLimit: '15000000',
      });

      return tx.confirmedPromise;
    });

    await Promise.all(createPlanetTxs);
  }

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.emit(UIEmitterEvent.UIChange);
  }, [initRenderState]);

  useEffect(() => {
    const gameUiManager = gameUIManagerRef.current;
    if (!terminalVisible && gameUiManager) {
      const tutorialManager = TutorialManager.getInstance(gameUiManager);
      tutorialManager.acceptInput(TutorialState.Terminal);
    }
  }, [terminalVisible]);

  useEffect(() => {
    if (terminalHandle.current && topLevelContainer.current) {
      advanceState(terminalHandle);
    }
  }, [terminalHandle, topLevelContainer, advanceState]);

  return (
    <Wrapper initRender={initRenderState} terminalEnabled={terminalVisible}>
      <GameWindowWrapper initRender={initRenderState} terminalEnabled={terminalVisible}>
        {gameUIManagerRef.current && topLevelContainer.current && gameManager && (
          <TopLevelDivProvider value={topLevelContainer.current}>
            <UIManagerProvider value={gameUIManagerRef.current}>
              <GameWindowLayout
                terminalVisible={terminalVisible}
                setTerminalVisible={setTerminalVisible}
              />
            </UIManagerProvider>
          </TopLevelDivProvider>
        )}
        <TerminalToggler
          terminalEnabled={terminalVisible}
          setTerminalEnabled={setTerminalVisible}
        />
      </GameWindowWrapper>
      <TerminalWrapper initRender={initRenderState} terminalEnabled={terminalVisible}>
        <Terminal ref={terminalHandle} promptCharacter={'$'} />
      </TerminalWrapper>
      <div ref={topLevelContainer}></div>
    </Wrapper>
  );
}
