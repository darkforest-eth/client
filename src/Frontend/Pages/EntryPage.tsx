import { CONTRACT_ADDRESS, FAUCET_ADDRESS } from '@darkforest_eth/contracts';
import { DFArenaFaucet } from '@darkforest_eth/contracts/typechain';
import { EthConnection, ThrottledConcurrentQueue, weiToEth } from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import { CleanConfigPlayer, ConfigPlayer, EthAddress } from '@darkforest_eth/types';
import { utils, Wallet } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { active } from 'sortablejs';
import {
  Account,
  getAccounts,
  addAccount,
  setActive,
  getActive,
  resetActive,
  logOut,
} from '../../Backend/Network/AccountManager';
import { getEthConnection } from '../../Backend/Network/Blockchain';
import { loadAllPlayerData } from '../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import { getAllTwitters, sendDrip } from '../../Backend/Network/UtilityServerAPI';
import { AddressTwitterMap } from '../../_types/darkforest/api/UtilityServerAPITypes';
import { InitRenderState, TerminalWrapper, Wrapper } from '../Components/GameLandingPageComponents';
import { MythicLabelText } from '../Components/Labels/MythicLabel';
import { TextPreview } from '../Components/TextPreview';
import {
  AccountProvider,
  EthConnectionProvider,
  TwitterProvider,
  SeasonDataProvider,
} from '../Utils/AppHooks';
import { Incompatibility, unsupportedFeatures } from '../Utils/BrowserChecks';
import { TerminalTextStyle } from '../Utils/TerminalTypes';
import { PortalMainView } from '../Views/Portal/PortalMainView';
import { Terminal, TerminalHandle } from '../Views/Terminal';
import { GameLandingPage } from './Game/GameLandingPage';
import LoadingPage from './LoadingPage';
import { CreateLobby } from './Lobby/CreateLobby';
import { NotFoundPage } from './NotFoundPage';

const defaultAddress = address(CONTRACT_ADDRESS);
class EntryPageTerminal {
  private ethConnection: EthConnection;
  private terminal: TerminalHandle;
  private accountSet: (account: Account) => void;
  private balancesEth: number[];

  public constructor(
    ethConnection: EthConnection,
    terminal: TerminalHandle,
    accountSet: (account: Account) => void
  ) {
    this.ethConnection = ethConnection;
    this.terminal = terminal;
    this.accountSet = accountSet;
  }

  private async loadBalances(addresses: EthAddress[]) {
    const queue = new ThrottledConcurrentQueue({
      invocationIntervalMs: 1000,
      maxInvocationsPerIntervalMs: 25,
    });

    const balances = await Promise.all(
      addresses.map((address) => queue.add(() => this.ethConnection.loadBalance(address)))
    );

    this.balancesEth = balances.map(weiToEth);
  }

  public async checkCompatibility() {
    console.log('checking compatibility');
    const issues = await unsupportedFeatures();

    if (issues.includes(Incompatibility.MobileOrTablet)) {
      this.terminal.println(
        'ERROR: Mobile or tablet device detected. Please use desktop.',
        TerminalTextStyle.Red
      );
    }

    if (issues.includes(Incompatibility.NoIDB)) {
      this.terminal.println(
        'ERROR: IndexedDB not found. Try using a different browser.',
        TerminalTextStyle.Red
      );
    }

    if (issues.includes(Incompatibility.UnsupportedBrowser)) {
      this.terminal.println(
        'ERROR: Browser unsupported. Try Brave, Firefox, or Chrome.',
        TerminalTextStyle.Red
      );
    }

    if (issues.length > 0) {
      this.terminal.print(`${issues.length.toString()} errors found. `, TerminalTextStyle.Red);
      this.terminal.println('Please resolve them and refresh the page.');
      return;
    } else {
      await this.chooseAccount();
    }
  }
  public async chooseAccount() {
    this.terminal.printElement(<MythicLabelText text='Welcome to Dark Forest Arena' />);
    this.terminal.newline();
    this.terminal.newline();

    const accounts = getAccounts();

    this.terminal.println(`Found ${accounts.length} accounts on this device. Loading balances...`);
    this.terminal.newline();

    try {
      await this.loadBalances(accounts.map((a) => a.address));
    } catch (e) {
      console.log(e);
      this.terminal.println(
        `Error loading balances. Reload the page to try again.`,
        TerminalTextStyle.Red
      );
      return;
    }

    this.terminal.println(`Log in to create an arena. If your account has less than 0.005 xDAI`);
    this.terminal.println(`it will get dripped 0.01 Optimism xDAI`);
    this.terminal.newline();

    accounts.forEach((account, i) => {
      this.terminal.print(`(${i + 1}): `, TerminalTextStyle.Sub);
      this.terminal.print(`${account.address} `);
      this.terminal.println(
        this.balancesEth[i].toFixed(2) + ' xDAI',
        this.balancesEth[i] < 0.01 ? TerminalTextStyle.Red : TerminalTextStyle.Green
      );
    });
    this.terminal.newline();

    this.terminal.print('(n) ', TerminalTextStyle.Sub);
    this.terminal.println(`Generate new burner wallet account.`);
    this.terminal.print('(i) ', TerminalTextStyle.Sub);
    this.terminal.println(`Import private key.`);
    this.terminal.println(``);
    this.terminal.println(`Select an option:`, TerminalTextStyle.Text);

    const userInput = await this.terminal.getInput();

    if (+userInput && +userInput <= accounts.length && +userInput > 0) {
      const selectedAccount = accounts[+userInput - 1];
      this.setAccount(selectedAccount);
    } else if (userInput === 'n') {
      this.generateAccount();
    } else if (userInput === 'i') {
      this.importAccount();
    } else {
      this.terminal.println('Unrecognized input. Please try again.', TerminalTextStyle.Red);
      this.terminal.println('');
      await this.chooseAccount();
    }
  }

  private async generateAccount() {
    const newWallet = Wallet.createRandom();
    const account: Account = {
      privateKey: newWallet.privateKey,
      address: address(newWallet.address),
    };

    try {
      addAccount(account.privateKey);

      this.terminal.println(``);
      this.terminal.print(`Created new burner wallet with address `);
      this.terminal.printElement(<TextPreview text={account.address} unFocusedWidth={'100px'} />);
      this.terminal.println(``);
      this.terminal.println('');
      this.terminal.println(
        'Note: Burner wallets are stored in local storage.',
        TerminalTextStyle.Text
      );
      this.terminal.println('They are relatively insecure and you should avoid ');
      this.terminal.println('storing substantial funds in them.');
      this.terminal.println('');
      this.terminal.println('Also, clearing browser local storage/cache will render your');
      this.terminal.println('burner wallets inaccessible, unless you export your private keys.');
      this.terminal.println('');

      this.setAccount(account);

      // this.accountSet(newAddr);
    } catch (e) {
      console.log(e);
      this.terminal.println('An unknown error occurred. please try again.', TerminalTextStyle.Red);
    }
  }

  private async importAccount() {
    this.terminal.println(
      'Enter the 0x-prefixed private key of the account you wish to import',
      TerminalTextStyle.Text
    );
    this.terminal.println(
      "NOTE: THIS WILL STORE THE PRIVATE KEY IN YOUR BROWSER'S LOCAL STORAGE",
      TerminalTextStyle.Text
    );
    this.terminal.println(
      'Local storage is relatively insecure. We recommend only importing accounts with zero-to-no funds.'
    );
    this.terminal.newline();
    this.terminal.println('(x) to cancel', TerminalTextStyle.Text);
    this.terminal.newline();
    const newSKey = (await this.terminal.getInput()) || '';
    if (newSKey === 'x') {
      this.terminal.newline();
      this.terminal.println('Cancelled import.', TerminalTextStyle.Text);
      await this.chooseAccount();
      return;
    }
    try {
      const newAddr = address(utils.computeAddress(newSKey));

      addAccount(newSKey);

      this.setAccount({ address: newAddr, privateKey: newSKey });
    } catch (e) {
      this.terminal.println('An unknown error occurred. please try again.', TerminalTextStyle.Red);
      this.terminal.println('');
      this.importAccount();
    }
  }

  private async setAccount(account: Account) {
    try {
      await this.drip(account.address);
      await this.ethConnection.setAccount(account.privateKey);
      setActive(account);
      this.accountSet(account);
    } catch (e) {
      console.log('set account aborted');
      console.log(e);
      await this.chooseAccount();
    }
  }

  private async drip(address: EthAddress) {
    try {
      const currBalance = weiToEth(await this.ethConnection.loadBalance(address));
      if (currBalance < 0.005) {
        this.terminal.println(`Dripping XDAI to your account.`);
        await sendDrip(this.ethConnection, address);
        const newBalance = weiToEth(await this.ethConnection.loadBalance(address));
        if (newBalance - currBalance > 0) {
          this.terminal.println(
            `Dripped XDAI from faucet. Your balance has increased by ${newBalance - currBalance}.`,
            TerminalTextStyle.Green
          );
          await new Promise((r) => setTimeout(r, 1500));
        }
      }
    } catch (e) {
      console.log(e);
      this.terminal.println(
        'An error occurred in faucet. Please try again with an account that has XDAI.',
        TerminalTextStyle.Red
      );
      this.terminal.println('');

      throw new Error(
        'An error occurred in faucet. Please try again with an account that has XDAI.'
      );
    }
  }
}

type LoadingStatus = 'loading' | 'creating' | 'complete';
export function EntryPage() {
  const terminal = useRef<TerminalHandle>();

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('loading');
  const [controller, setController] = useState<EntryPageTerminal | undefined>();

  const [twitters, setTwitters] = useState<AddressTwitterMap | undefined>();
  const [connection, setConnection] = useState<EthConnection | undefined>();
  const [seasonPlayers, setPlayers] = useState<CleanConfigPlayer[] | undefined>();

  /* get all twitters on page load */
  useEffect(() => {
    getAllTwitters().then((t) => setTwitters(t));
  }, []);

  /* get all season data on page load*/
  useEffect(() => {
    loadAllPlayerData().then((t) => setPlayers(t));
  }, []);

  /* set connection on page load */
  useEffect(() => {
    async function getConnection() {
      try {
        const connection = await getEthConnection();
        setConnection(connection);
      } catch (e) {
        alert('error connecting to blockchain');
        console.log(e);
      }
    }
    getConnection();
  }, []);

  /* once connection is set, get active player from local storage and set account */
  useEffect(() => {
    async function setPlayer(ethConnection: EthConnection) {
      const active = getActive();
      try {
        if (!!active) {
          await sendDrip(ethConnection, active.address);
          await ethConnection.setAccount(active.privateKey);
          setLoadingStatus('complete');
        } else {
          setLoadingStatus('creating');
        }
      } catch (e) {
        alert('Unable to connect to active account. Please login into another.');
        logOut();
      }
    }
    if (connection) {
      setPlayer(connection);
    }
  }, [connection]);

  useEffect(() => {
    console.log(`!controller`, !controller, `connection`, connection, `terminal`, terminal.current);
    if (!controller && connection && terminal.current) {
      console.log(`setting new controller`);
      const newController = new EntryPageTerminal(
        connection,
        terminal.current,
        async (account: Account) => {
          await connection.setAccount(account.privateKey);
          setLoadingStatus('complete');
        }
      );
      newController.checkCompatibility();
      setController(newController);
    }
  }, [terminal, connection, controller, loadingStatus]);

  if (!connection || !twitters || loadingStatus == 'loading') {
    return <LoadingPage />;
  } else if (loadingStatus == 'creating') {
    return (
      <Wrapper initRender={InitRenderState.NONE} terminalEnabled={false}>
        <TerminalWrapper initRender={InitRenderState.NONE} terminalEnabled={false}>
          <Terminal ref={terminal} promptCharacter={'$'} />
        </TerminalWrapper>

        {/* this div is here so the styling matches gamelandingpage styling*/}
        <div></div>
      </Wrapper>
    );
  } else
    return (
      <EthConnectionProvider value={connection}>
        <TwitterProvider value={twitters}>
          <SeasonDataProvider value={seasonPlayers!}>
            <Router>
              <Switch>
                <Redirect path='/play' to={`/play/${defaultAddress}`} push={true} exact={true} />
                <Route path='/play/:contract' component={GameLandingPage} />
                <Redirect path='/portal' to={`/portal/home`} push={true} exact={true} />
                <Route path='/portal' component={PortalMainView} />
                <Redirect path='/arena' to={`/arena/${defaultAddress}`} push={true} exact={true} />
                <Route path='/arena/:contract' component={CreateLobby} />
                <Route path='*' component={NotFoundPage} />
              </Switch>
            </Router>
          </SeasonDataProvider>
        </TwitterProvider>
      </EthConnectionProvider>
    );
}
