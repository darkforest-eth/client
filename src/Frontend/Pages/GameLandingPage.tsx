import { Wallet, utils } from 'ethers';
import _ from 'lodash';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GameManager from '../../Backend/GameLogic/GameManager';
import GameUIManager, { GameUIManagerEvent } from '../../Backend/GameLogic/GameUIManager';
import TutorialManager, { TutorialState } from '../../Backend/GameLogic/TutorialManager';
import EthConnection from '../../Backend/Network/EthConnection';
import {
  requestDevFaucet,
  submitWhitelistKey,
  submitInterestedEmail,
  EmailResponse,
  submitPlayerEmail,
} from '../../Backend/Network/UtilityServerAPI';
import { neverResolves } from '../../Backend/Utils/Utils';
import {
  Wrapper,
  GameWindowWrapper,
  TerminalToggler,
  TerminalWrapper,
} from '../Components/GameLandingPageComponents';
import { TopLevelDivProvider, UIManagerProvider } from '../Utils/AppHooks';
import { unsupportedFeatures, Incompatibility } from '../Utils/BrowserChecks';
import { BLOCK_EXPLORER_URL } from '../Utils/constants';
import { TerminalTextStyle } from '../Utils/TerminalTypes';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { GameWindowLayout } from '../Views/GameWindowLayout';
import { Terminal, TerminalHandle } from '../Views/Terminal';
import { address } from '@darkforest_eth/serde';

enum TerminalPromptStep {
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

export enum InitRenderState {
  NONE,
  LOADING,
  COMPLETE,
}

export default function GameLandingPage() {
  const history = useHistory();
  const terminalHandle = useRef<TerminalHandle>();
  const gameUIManagerRef = useRef<GameUIManager | undefined>();
  const topLevelContainer = useRef<HTMLDivElement | null>(null);
  const [ethConnection] = useState(() => new EthConnection());
  const [gameManager, setGameManager] = useState<GameManager | undefined>();
  const [terminalEnabled, setTerminalEnabled] = useState(true);
  const [initRenderState, setInitRenderState] = useState(InitRenderState.NONE);
  const [step, setStep] = useState(TerminalPromptStep.NONE);

  const isProd = process.env.NODE_ENV === 'production';

  const wait = useCallback((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)), []);

  const animEllipsis = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      const delay = 0; // TODOPR 250
      for (const _i in _.range(3)) {
        await wait(delay).then(() => terminal.current?.print('.'));
      }
      await wait(delay * 1.5);
      return;
    },
    [wait]
  );

  const advanceStateFromNone = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.printShellLn('df init');
      terminal.current?.println('Initializing Dark Forest...');

      terminal.current?.print('Loading zkSNARK proving key');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      terminal.current?.println('Proving key loaded. (14.3MB)', TerminalTextStyle.Blue);

      terminal.current?.print('Verifying zkSNARK params');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      terminal.current?.println('28700 constraints verified.', TerminalTextStyle.Blue);

      terminal.current?.print('Connecting to Ethereum L2');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      terminal.current?.println('Connected to xDAI STAKE.', TerminalTextStyle.Blue);

      terminal.current?.print('Installing flux capacitor');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      terminal.current?.println('Flux capacitor installed.', TerminalTextStyle.Blue);

      terminal.current?.println('Initialization complete.');
      terminal.current?.newline();
      const issues = await unsupportedFeatures();

      // $ df check
      terminal.current?.printShellLn('df check');

      terminal.current?.print('Checking compatibility');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      terminal.current?.println('Initiating (3) compatibility checks.', TerminalTextStyle.Blue);

      terminal.current?.print('Checking if device is compatible');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      if (issues.includes(Incompatibility.MobileOrTablet)) {
        terminal.current?.println(
          'ERROR: Mobile or tablet device detected. Please use desktop.',
          TerminalTextStyle.Red
        );
      } else {
        terminal.current?.println('Desktop detected. Device OK.', TerminalTextStyle.White);
      }

      terminal.current?.print('Checking if IndexedDB is present');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      if (issues.includes(Incompatibility.NoIDB)) {
        terminal.current?.println(
          'ERROR: IndexedDB not found. Try using a different browser.',
          TerminalTextStyle.Red
        );
      } else {
        terminal.current?.println('IndexedDB detected.', TerminalTextStyle.White);
      }

      terminal.current?.print('Checking if browser is supported');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      if (issues.includes(Incompatibility.UnsupportedBrowser)) {
        terminal.current?.println(
          'ERROR: Browser unsupported. Try Brave, Firefox, or Chrome.',
          TerminalTextStyle.Red
        );
      } else {
        terminal.current?.println('Browser Supported.', TerminalTextStyle.White);
      }

      terminal.current?.print('Checking Ethereum Mainnet');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      terminal.current?.println('ERROR: Gas prices too high!', TerminalTextStyle.White);
      terminal.current?.newline();
      terminal.current?.print('Falling back to L2');
      await animEllipsis(terminal);
      terminal.current?.print(' ');
      terminal.current?.println('Connected to xDAI L2 network.', TerminalTextStyle.White);

      if (issues.length > 0) {
        terminal.current?.print(
          `${issues.length.toString()} errors found. `,
          TerminalTextStyle.Red
        );
        terminal.current?.println('Please resolve them and refresh the page.');
        setStep(TerminalPromptStep.ASKING_WAITLIST_EMAIL);
      } else {
        terminal.current?.println('All checks passed.', TerminalTextStyle.Green);
        terminal.current?.newline();
        setStep(TerminalPromptStep.COMPATIBILITY_CHECKS_PASSED);
      }
    },
    [animEllipsis]
  );

  const advanceStateFromCompatibilityPassed = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.printShellLn('df log');
      terminal.current?.newline();
      terminal.current?.print('    ');
      terminal.current?.print('Version', TerminalTextStyle.Underline);
      terminal.current?.print('    ');
      terminal.current?.print('Date', TerminalTextStyle.Underline);
      terminal.current?.print('              ');
      terminal.current?.print('Champion', TerminalTextStyle.Underline);
      terminal.current?.newline();

      terminal.current?.print('    v0.1       ');
      terminal.current?.print('02/05/2020        ', TerminalTextStyle.White);
      terminal.current?.printLink(
        'Dylan Field',
        () => {
          window.open('https://twitter.com/zoink');
        },
        TerminalTextStyle.White
      );
      terminal.current?.newline();
      terminal.current?.print('    v0.2       ');
      terminal.current?.println('06/06/2020        Nate Foss', TerminalTextStyle.White);
      terminal.current?.print('    v0.3       ');
      terminal.current?.print('08/07/2020        ', TerminalTextStyle.White);
      terminal.current?.printLink(
        '[ANON] Singer',
        () => {
          window.open('https://twitter.com/hideandcleanse');
        },
        TerminalTextStyle.White
      );
      terminal.current?.newline();
      terminal.current?.print('    v0.4       ');
      terminal.current?.print('10/02/2020        ', TerminalTextStyle.White);
      terminal.current?.printLink(
        'Jacob Rosenthal',
        () => {
          window.open('https://twitter.com/jacobrosenthal');
        },
        TerminalTextStyle.White
      );
      terminal.current?.newline();
      terminal.current?.print('    v0.5       ');
      terminal.current?.print('12/25/2020        ', TerminalTextStyle.White);
      terminal.current?.println(
        '0xb05d95422bf8d5024f9c340e8f7bd696d67ee3a9',
        TerminalTextStyle.White
      );
      terminal.current?.newline();
      terminal.current?.print('    v0.6 r1    ');
      terminal.current?.print('05/22/2021        ', TerminalTextStyle.White);
      terminal.current?.printLink(
        'Ansgar Dietrichs',
        () => {
          window.open('https://twitter.com/adietrichs');
        },
        TerminalTextStyle.White
      );
      terminal.current?.newline();

      const knownAddrs = ethConnection.getKnownAccounts();
      terminal.current?.println(`Found ${knownAddrs.length} accounts on this device.`);
      if (knownAddrs.length > 0) {
        terminal.current?.println('(a) Login with existing account.');
      }
      terminal.current?.println(`(n) Generate new burner wallet account.`);
      terminal.current?.println(`(i) Import private key.`);
      terminal.current?.println(`Select an option.`, TerminalTextStyle.White);

      const userInput = await terminal.current?.getInput();
      if (userInput === 'a') {
        setStep(TerminalPromptStep.DISPLAY_ACCOUNTS);
      } else if (userInput === 'n') {
        setStep(TerminalPromptStep.GENERATE_ACCOUNT);
      } else if (userInput === 'i') {
        setStep(TerminalPromptStep.IMPORT_ACCOUNT);
      } else {
        terminal.current?.println('Unrecognized input. Please try again.');
        await advanceStateFromCompatibilityPassed(terminal);
      }
    },
    [ethConnection]
  );

  const advanceStateFromDisplayAccounts = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      const knownAddrs = ethConnection.getKnownAccounts();
      terminal.current?.println(`Select an account.`, TerminalTextStyle.White);
      for (let i = 0; i < knownAddrs.length; i += 1) {
        terminal.current?.println(`(${i + 1}): ${knownAddrs[i]}`);
      }
      const selection = +((await terminal.current?.getInput()) || '');
      if (isNaN(selection) || selection > knownAddrs.length) {
        terminal.current?.println('Unrecognized input. Please try again.');
        await advanceStateFromDisplayAccounts(terminal);
      } else {
        const addr = knownAddrs[selection - 1];
        try {
          ethConnection.setAccount(addr);
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
        ethConnection.addAccount(newSKey);
        ethConnection.setAccount(newAddr);
        terminal.current?.println(`Created new burner wallet with address ${newAddr}.`);
        terminal.current?.println(
          'NOTE: BURNER WALLETS ARE STORED IN BROWSER LOCAL STORAGE.',
          TerminalTextStyle.White
        );
        terminal.current?.println(
          'They are relatively insecure and you should avoid storing substantial funds in them.'
        );
        terminal.current?.println(
          'Also, clearing browser local storage/cache will render your burner wallets inaccessible, unless you export your private keys.'
        );
        terminal.current?.println('Press any key to continue.', TerminalTextStyle.White);

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
        TerminalTextStyle.White
      );
      terminal.current?.println(
        "NOTE: THIS WILL STORE THE PRIVATE KEY IN YOUR BROWSER'S LOCAL STORAGE",
        TerminalTextStyle.White
      );
      terminal.current?.println(
        'Local storage is relatively insecure. We recommend only importing accounts with zero-to-no funds.'
      );
      const newSKey = (await terminal.current?.getInput()) || '';
      try {
        const newAddr = address(utils.computeAddress(newSKey));
        ethConnection.addAccount(newSKey);
        ethConnection.setAccount(newAddr);
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
        const address = ethConnection.getAddress();
        const isWhitelisted = await ethConnection.isWhitelisted(address);

        terminal.current?.printShellLn('df join v0.6.0');
        terminal.current?.print('Checking if whitelisted... (address ');
        terminal.current?.print(address, TerminalTextStyle.White);
        terminal.current?.println(')');

        if (isWhitelisted) {
          terminal.current?.println('Player whitelisted.', TerminalTextStyle.Green);
          terminal.current?.println(`Welcome, player ${address}.`, TerminalTextStyle.White);
          // TODO: Provide own env variable for this feature
          if (!isProd) {
            // in development, automatically get some ether from faucet
            const balance = await ethConnection.getBalance(address);
            if (balance === 0) {
              await requestDevFaucet(address);
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
    [ethConnection, isProd]
  );

  const advanceStateFromAskHasWhitelistKey = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.print('Do you have a whitelist key?', TerminalTextStyle.White);
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
      const address = ethConnection.getAddress();

      terminal.current?.println(
        'Please enter your invite key. (XXXXX-XXXXX-XXXXX-XXXXX-XXXXX)',
        TerminalTextStyle.Sub
      );

      const key = (await terminal.current?.getInput()) || '';

      terminal.current?.print('Processing key... (this may take up to 30s)');
      const txHash = await (async () => {
        const intervalId = setInterval(() => terminal.current?.print('.'), 3000);
        const ret = await submitWhitelistKey(key, address);
        clearInterval(intervalId);
        return ret;
      })();
      terminal.current?.newline();

      if (!txHash) {
        terminal.current?.println('ERROR: Not a valid key.', TerminalTextStyle.Red);
        setStep(TerminalPromptStep.ASKING_WAITLIST_EMAIL);
      } else {
        terminal.current?.print('Successfully joined game. ', TerminalTextStyle.Green);
        terminal.current?.print(`Welcome, player `);
        terminal.current?.println(address, TerminalTextStyle.White);
        terminal.current?.print('Sent player $0.15 :) ', TerminalTextStyle.Blue);
        terminal.current?.printLink(
          '(View Transaction)',
          () => {
            window.open(`${BLOCK_EXPLORER_URL}/tx/${txHash}`);
          },
          TerminalTextStyle.Blue
        );
        terminal.current?.newline();
        setStep(TerminalPromptStep.ASKING_PLAYER_EMAIL);
      }
    },
    [ethConnection]
  );

  const advanceStateFromAskWaitlistEmail = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.println(
        'Enter your email address to sign up for the whitelist.',
        TerminalTextStyle.White
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
      const address = ethConnection.getAddress();

      terminal.current?.print('Enter your email address. ', TerminalTextStyle.White);
      terminal.current?.println("We'll use this email address to notify you if you win a prize.");
      const email = (await terminal.current?.getInput()) || '';
      const response = await submitPlayerEmail(email, address);

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
        newGameManager = await GameManager.create(ethConnection, terminal);
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
      terminal.current?.println('Connected to DarkForestCore contract.');
      gameUIManagerRef.current = newGameUIManager;

      if (!newGameManager.hasJoinedGame()) {
        setStep(TerminalPromptStep.NO_HOME_PLANET);
      } else {
        terminal.current?.println('Validating secret local data...');
        const browserHasData = !!newGameManager.getHomeCoords();
        if (!browserHasData) {
          terminal.current?.println(
            'ERROR: Home coords not found on this browser.',
            TerminalTextStyle.Red
          );
          setStep(TerminalPromptStep.ASK_ADD_ACCOUNT);
          return;
        }
        terminal.current?.println('Initializing game...');
        setStep(TerminalPromptStep.ALL_CHECKS_PASS);
      }
    },
    [ethConnection]
  );

  const advanceStateFromAskAddAccount = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.println('Import account home coordinates? (y/n)', TerminalTextStyle.White);
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

      terminal.current?.println(
        'We collect a minimal set of statistics such as SNARK proving' +
          ' times and average transaction times across browsers, to help ' +
          'us optimize performance and fix bugs. You can opt out of ' +
          'this in the settings pane.'
      );

      terminal.current?.newline();

      terminal.current?.println('Press ENTER to find a home planet. This may take up to 120s.');

      await terminal.current?.getInput();

      const success = await new Promise(async (resolve) => {
        gameUIManager
          // TODO: remove beforeRetry: (e: Error) => Promise<boolean>
          .joinGame(async () => {
            terminal.current?.println(
              '[ERROR] please enable popups to confirm the transaction.',
              TerminalTextStyle.Red
            );
            terminal.current?.println(
              'Press ENTER to try again. The previous popup is invalidated.'
            );
            await terminal.current?.getInput();
            return true;
          })
          .once(GameUIManagerEvent.InitializedPlayer, () => {
            resolve(true);
          })
          .once(GameUIManagerEvent.InitializedPlayerError, (error: Error) => {
            terminal.current?.println(
              `[ERROR] An error occurred: ${error.toString().slice(0, 10000)}`,
              TerminalTextStyle.Red
            );
          });
      });

      if (success) {
        terminal.current?.println('Found suitable home planet!');
        terminal.current?.println('Initializing game...');
        setStep(TerminalPromptStep.ALL_CHECKS_PASS);
      }
    },
    []
  );

  const advanceStateFromAllChecksPass = useCallback(
    async (terminal: React.MutableRefObject<TerminalHandle | undefined>) => {
      terminal.current?.println('Press ENTER to begin.');
      await terminal.current?.getInput();
      setStep(TerminalPromptStep.COMPLETE);
      setInitRenderState(InitRenderState.COMPLETE);

      terminal.current?.printShellLn('df shell');
      terminal.current?.println('Welcome to the universe of Dark Forest.', TerminalTextStyle.Green);
      terminal.current?.println(
        "This is the Dark Forest interactive Javascript terminal.current?. Only use this if you know exactly what you're doing."
      );
      terminal.current?.println('Try typing in: terminal.current?.println(df.getAccount())');
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
          terminal.current?.println(res.toString(), TerminalTextStyle.White);
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
      if (step === TerminalPromptStep.NONE) {
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
    ]
  );

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.emit(UIEmitterEvent.UIChange);
  }, [initRenderState]);

  useEffect(() => {
    if (!terminalEnabled) {
      const tutorialManager = TutorialManager.getInstance();
      tutorialManager.acceptInput(TutorialState.Terminal);
    }
  }, [terminalEnabled]);

  useEffect(() => {
    if (terminalHandle.current && topLevelContainer.current) {
      advanceState(terminalHandle);
    }
  }, [terminalHandle, topLevelContainer, advanceState]);

  return (
    <Wrapper initRender={initRenderState} terminalEnabled={terminalEnabled}>
      <GameWindowWrapper initRender={initRenderState} terminalEnabled={terminalEnabled}>
        {gameUIManagerRef.current && topLevelContainer.current && gameManager && (
          <TopLevelDivProvider value={topLevelContainer.current}>
            <UIManagerProvider value={gameUIManagerRef.current}>
              <GameWindowLayout />
            </UIManagerProvider>
          </TopLevelDivProvider>
        )}
        <TerminalToggler
          terminalEnabled={terminalEnabled}
          setTerminalEnabled={setTerminalEnabled}
        />
      </GameWindowWrapper>
      <TerminalWrapper initRender={initRenderState} terminalEnabled={terminalEnabled}>
        <Terminal ref={terminalHandle} promptCharacter={'$'} />
      </TerminalWrapper>
      <div ref={topLevelContainer}></div>
    </Wrapper>
  );
}
