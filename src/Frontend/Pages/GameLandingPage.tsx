import { BLOCK_EXPLORER_URL } from '@darkforest_eth/constants';
import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { DarkForest } from '@darkforest_eth/contracts/typechain';
import { EthConnection, neverResolves, weiToEth } from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import { bigIntFromKey } from '@darkforest_eth/whitelist';
import { utils, Wallet } from 'ethers';
import { reverse } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { makeContractsAPI } from '../../Backend/GameLogic/ContractsAPI';
import GameManager, { GameManagerEvent } from '../../Backend/GameLogic/GameManager';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import TutorialManager, { TutorialState } from '../../Backend/GameLogic/TutorialManager';
import { addAccount, getAccounts } from '../../Backend/Network/AccountManager';
import { getEthConnection, loadDiamondContract } from '../../Backend/Network/Blockchain';
import {
  callRegisterAndWaitForConfirmation,
  EmailResponse,
  RegisterConfirmationResponse,
  requestDevFaucet,
  submitInterestedEmail,
  submitPlayerEmail,
} from '../../Backend/Network/UtilityServerAPI';
import { getWhitelistArgs } from '../../Backend/Utils/WhitelistSnarkArgsHelper';
import { ZKArgIdx } from '../../_types/darkforest/api/ContractsAPITypes';
import {
  GameWindowWrapper,
  InitRenderState,
  TerminalToggler,
  TerminalWrapper,
  Wrapper,
} from '../Components/GameLandingPageComponents';
import { MythicLabelText } from '../Components/Labels/MythicLabel';
import { TextPreview } from '../Components/TextPreview';
import { TopLevelDivProvider, UIManagerProvider } from '../Utils/AppHooks';
import { Incompatibility, unsupportedFeatures } from '../Utils/BrowserChecks';
import { TerminalTextStyle } from '../Utils/TerminalTypes';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { GameWindowLayout } from '../Views/GameWindowLayout';
import { Terminal, TerminalHandle } from '../Views/Terminal';

const enum TerminalPromptStep {
  NONE,
  COMPATIBILITY_CHECKS_PASSED,
  DISPLAY_ACCOUNTS,
  GENERATE_ACCOUNT,
  IMPORT_ACCOUNT,
  ACCOUNT_SET,
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
  const [step, setStep] = useState(TerminalPromptStep.NONE);

  const params = new URLSearchParams(location.search);
  const useZkWhitelist = params.has('zkWhitelist');
  const selectedAddress = params.get('account');
  const contractAddress = address(match.params.contract);
  const isLobby = contractAddress !== address(CONTRACT_ADDRESS);

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
          <MythicLabelText text={`You are joining a Dark Forest lobby`} />
        );
        terminal.current?.newline();
        terminal.current?.newline();
      } else {
        // terminal.current?.newline();
        // terminal.current?.newline();
        // terminal.current?.printElement(<MythicLabelText text={`                 Dark Forest`} />);
        // terminal.current?.newline();
        // terminal.current?.newline();

        // terminal.current?.print('    ');
        // terminal.current?.print('Version', TerminalTextStyle.Sub);
        // terminal.current?.print('    ');
        // terminal.current?.print('Date', TerminalTextStyle.Sub);
        // terminal.current?.print('              ');
        // terminal.current?.print('Champion', TerminalTextStyle.Sub);
        // terminal.current?.newline();

        // terminal.current?.print('    v0.1       ', TerminalTextStyle.Text);
        // terminal.current?.print('02/05/2020        ', TerminalTextStyle.Text);
        // terminal.current?.printLink(
        //   'Dylan Field',
        //   () => {
        //     window.open('https://twitter.com/zoink');
        //   },
        //   TerminalTextStyle.Text
        // );
        // terminal.current?.newline();
        // terminal.current?.print('    v0.2       ', TerminalTextStyle.Text);
        // terminal.current?.println('06/06/2020        Nate Foss', TerminalTextStyle.Text);
        // terminal.current?.print('    v0.3       ', TerminalTextStyle.Text);
        // terminal.current?.print('08/07/2020        ', TerminalTextStyle.Text);
        // terminal.current?.printLink(
        //   '@hideandcleanse',
        //   () => {
        //     window.open('https://twitter.com/hideandcleanse');
        //   },
        //   TerminalTextStyle.Text
        // );
        // terminal.current?.newline();
        // terminal.current?.print('    v0.4       ', TerminalTextStyle.Text);
        // terminal.current?.print('10/02/2020        ', TerminalTextStyle.Text);
        // terminal.current?.printLink(
        //   'Jacob Rosenthal',
        //   () => {
        //     window.open('https://twitter.com/jacobrosenthal');
        //   },
        //   TerminalTextStyle.Text
        // );
        // terminal.current?.newline();
        // terminal.current?.print('    v0.5       ', TerminalTextStyle.Text);
        // terminal.current?.print('12/25/2020        ', TerminalTextStyle.Text);
        // terminal.current?.printElement(
        //   <TextPreview
        //     text={'0xb05d95422bf8d5024f9c340e8f7bd696d67ee3a9'}
        //     focusedWidth={'100px'}
        //     unFocusedWidth={'100px'}
        //   />
        // );
        // terminal.current?.println('');

        // terminal.current?.print('    v0.6 r1    ', TerminalTextStyle.Text);
        // terminal.current?.print('05/22/2021        ', TerminalTextStyle.Text);
        // terminal.current?.printLink(
        //   'Ansgar Dietrichs',
        //   () => {
        //     window.open('https://twitter.com/adietrichs');
        //   },
        //   TerminalTextStyle.Text
        // );
        // terminal.current?.newline();

        // terminal.current?.print('    v0.6 r2    ', TerminalTextStyle.Text);
        // terminal.current?.print('06/28/2021        ', TerminalTextStyle.Text);
        // terminal.current?.printLink(
        //   '@orden_gg',
        //   () => {
        //     window.open('https://twitter.com/orden_gg');
        //   },
        //   TerminalTextStyle.Text
        // );
        // terminal.current?.newline();

        // terminal.current?.print('    v0.6 r3    ', TerminalTextStyle.Text);
        // terminal.current?.print('08/22/2021        ', TerminalTextStyle.Text);
        // terminal.current?.printLink(
        //   '@dropswap_gg',
        //   () => {
        //     window.open('https://twitter.com/dropswap_gg');
        //   },
        //   TerminalTextStyle.Text
        // );
        // terminal.current?.newline();

        // terminal.current?.print('    v0.6 r4    ', TerminalTextStyle.Text);
        // terminal.current?.print('10/01/2021        ', TerminalTextStyle.Text);
        // terminal.current?.printLink(
        //   '@orden_gg',
        //   () => {
        //     window.open('https://twitter.com/orden_gg');
        //   },
        //   TerminalTextStyle.Text
        // );
        // terminal.current?.newline();

        // terminal.current?.print('    v0.6 r5    ', TerminalTextStyle.Text);
        // terminal.current?.print('02/18/2022        ', TerminalTextStyle.Text);
        // terminal.current?.printLink(
        //   '@d_fdao',
        //   () => {
        //     window.open('https://twitter.com/d_fdao');
        //   },
        //   TerminalTextStyle.Text
        // );
        // terminal.current?.print(' + ');
        // terminal.current?.printLink(
        //   '@orden_gg',
        //   () => {
        //     window.open('https://twitter.com/orden_gg');
        //   },
        //   TerminalTextStyle.Text
        // );
        // terminal.current?.newline();
        // terminal.current?.newline();
      }

      const accounts = getAccounts();
      terminal.current?.println(`Found ${accounts.length} accounts on this device.`);
      terminal.current?.println(``);

      if (accounts.length > 0) {
        terminal.current?.print('(a) ', TerminalTextStyle.Sub);
        terminal.current?.println('Login with existing account.');
      }

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
        if (userInput === 'a' && accounts.length > 0) {
          setStep(TerminalPromptStep.DISPLAY_ACCOUNTS);
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

  const advanceStateFromDisplayAccounts = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.println(``);
      const accounts = getAccounts();
      for (let i = 0; i < accounts.length; i += 1) {
        terminal.current?.print(`(${i + 1}): `, TerminalTextStyle.Sub);
        terminal.current?.println(`${accounts[i].address}`);
      }
      terminal.current?.println(``);
      terminal.current?.println(`Select an account:`, TerminalTextStyle.Text);

      const selection = +((await terminal.current?.getInput()) || '');
      if (isNaN(selection) || selection > accounts.length) {
        terminal.current?.println('Unrecognized input. Please try again.');
        await advanceStateFromDisplayAccounts(terminal);
      } else {
        const account = accounts[selection - 1];
        try {
          await ethConnection?.setAccount(account.privateKey);
          setStep(TerminalPromptStep.ACCOUNT_SET);
        } catch (e) {
          terminal.current?.println(
            'An unknown error occurred. please try again.',
            TerminalTextStyle.Red
          );
        }
      }
    },
    [ethConnection]
  );

  const advanceStateFromGenerateAccount = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      const newWallet = Wallet.createRandom();
      const newSKey = newWallet.privateKey;
      const newAddr = address(newWallet.address);
      try {
        addAccount(newSKey);
        ethConnection?.setAccount(newSKey);

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
        terminal.current?.println('Press any key to continue:', TerminalTextStyle.Text);

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
      const newSKey = (await terminal.current?.getInput()) || '';
      try {
        const newAddr = address(utils.computeAddress(newSKey));

        addAccount(newSKey);

        ethConnection?.setAccount(newSKey);
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
      try {
        const playerAddress = ethConnection?.getAddress();
        if (!playerAddress || !ethConnection) throw new Error('not logged in');

        const whitelist = await ethConnection.loadContract<DarkForest>(
          contractAddress,
          loadDiamondContract
        );
        const isWhitelisted = await whitelist.isWhitelisted(playerAddress);
        // TODO(#2329): isWhitelisted should just check the contractOwner
        const adminAddress = address(await whitelist.adminAddress());

        terminal.current?.println('');
        terminal.current?.print('Checking if whitelisted... ');

        // TODO(#2329): isWhitelisted should just check the contractOwner
        if (isWhitelisted || playerAddress === adminAddress) {
          terminal.current?.println('Player whitelisted.');
          terminal.current?.println('');
          terminal.current?.println(`Welcome, player ${playerAddress}.`);
          // TODO: Provide own env variable for this feature
          if (!isProd) {
            // in development, automatically get some ether from faucet
            const balance = weiToEth(await ethConnection?.loadBalance(playerAddress));
            if (balance === 0) {
              await requestDevFaucet(playerAddress);
            }
          }
          setStep(TerminalPromptStep.FETCHING_ETH_DATA);
        } else {
          setStep(TerminalPromptStep.ASKING_HAS_WHITELIST_KEY);
        }
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
            terminal.current?.println('Press any key to try again.');
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
        if (!ethConnection) throw new Error('no eth connection');
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
              terminal.current?.println('Press any key to try again.');
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
        if (!ethConnection) throw new Error('no eth connection');

        newGameManager = await GameManager.create({
          connection: ethConnection,
          terminal,
          contractAddress,
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
            throw 'Invalid home coordinates.';
          }
          if (await gameUIManager.addAccount({ x, y })) {
            terminal.current?.println('Successfully added account.');
            terminal.current?.println('Initializing game...');
            setStep(TerminalPromptStep.ALL_CHECKS_PASS);
          } else {
            throw 'Invalid home coordinates.';
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

      if (Date.now() / 1000 > gameUIManager.getEndTimeSeconds()) {
        terminal.current?.println('ERROR: This game has ended. Terminating session.');
        setStep(TerminalPromptStep.TERMINATED);
        return;
      }

      terminal.current?.newline();

      terminal.current?.println('We collect a minimal set of statistics such as SNARK proving');
      terminal.current?.println('times and average transaction times across browsers, to help ');
      terminal.current?.println('us optimize performance and fix bugs. You can opt out of this');
      terminal.current?.println('in the Settings pane.');
      terminal.current?.println('');

      terminal.current?.newline();

      terminal.current?.println('Press ENTER to find a home planet. This may take up to 120s.');
      terminal.current?.println('This will consume a lot of CPU.');

      await terminal.current?.getInput();

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
        })
        .catch((error: Error) => {
          terminal.current?.println(
            `[ERROR] An error occurred: ${error.toString().slice(0, 10000)}`,
            TerminalTextStyle.Red
          );
        });
    },
    []
  );

  const advanceStateFromAllChecksPass = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.println('');
      terminal.current?.println('Press ENTER to begin');
      terminal.current?.println("Press 's' then ENTER to begin in SAFE MODE - plugins disabled");

      const input = await terminal.current?.getInput();

      if (input === 's') {
        const gameUIManager = gameUIManagerRef.current;
        gameUIManager?.getGameManager()?.setSafeMode(true);
      }

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
      } else if (step === TerminalPromptStep.DISPLAY_ACCOUNTS) {
        await advanceStateFromDisplayAccounts(terminal);
      } else if (step === TerminalPromptStep.GENERATE_ACCOUNT) {
        await advanceStateFromGenerateAccount(terminal);
      } else if (step === TerminalPromptStep.IMPORT_ACCOUNT) {
        await advanceStateFromImportAccount(terminal);
      } else if (step === TerminalPromptStep.ACCOUNT_SET) {
        await advanceStateFromAccountSet(terminal);
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
    [
      step,
      advanceStateFromAccountSet,
      advanceStateFromAddAccount,
      advanceStateFromAllChecksPass,
      advanceStateFromAskAddAccount,
      advanceStateFromAskHasWhitelistKey,
      advanceStateFromAskPlayerEmail,
      advanceStateFromAskWaitlistEmail,
      advanceStateFromAskWhitelistKey,
      advanceStateFromCompatibilityPassed,
      advanceStateFromComplete,
      advanceStateFromDisplayAccounts,
      advanceStateFromError,
      advanceStateFromFetchingEthData,
      advanceStateFromGenerateAccount,
      advanceStateFromImportAccount,
      advanceStateFromNoHomePlanet,
      advanceStateFromNone,
      ethConnection,
    ]
  );

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
