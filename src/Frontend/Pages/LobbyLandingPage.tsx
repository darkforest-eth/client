import { EthConnection, ThrottledConcurrentQueue, weiToEth } from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import { EthAddress } from '@darkforest_eth/types';
import { utils, Wallet } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import { addAccount, getAccounts } from '../../Backend/Network/AccountManager';
import { getEthConnection } from '../../Backend/Network/Blockchain';
import { InitRenderState, TerminalWrapper } from '../Components/GameLandingPageComponents';
import { MythicLabelText } from '../Components/Labels/MythicLabel';
import { TextPreview } from '../Components/TextPreview';
import { TerminalTextStyle } from '../Utils/TerminalTypes';
import { DarkForestTips } from '../Views/DarkForestTips';
import { Terminal, TerminalHandle } from '../Views/Terminal';

class LobbyPageTerminal {
  private ethConnection: EthConnection;
  private terminal: TerminalHandle;
  private accountSet: (account: EthAddress) => void;
  private balancesEth: number[];

  public constructor(
    ethConnection: EthConnection,
    terminal: TerminalHandle,
    accountSet: (account: EthAddress) => void
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

  public async chooseAccount() {
    this.terminal.printElement(<MythicLabelText text='                  Create a Lobby' />);
    this.terminal.newline();
    this.terminal.newline();
    this.terminal.printElement(<DarkForestTips tips={lobbyTips} title='Lobby Tips' />);
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

    this.terminal.println(`Log in to create a lobby. We recommend using an account`);
    this.terminal.println(`which owns at least 0.25 ALT.`);
    this.terminal.newline();

    if (accounts.length > 0) {
      this.terminal.print('(a) ', TerminalTextStyle.Sub);
      this.terminal.println('Login with existing account.');
    }

    this.terminal.print('(n) ', TerminalTextStyle.Sub);
    this.terminal.println(`Generate new burner wallet account.`);
    this.terminal.print('(i) ', TerminalTextStyle.Sub);
    this.terminal.println(`Import private key.`);
    this.terminal.println(``);
    this.terminal.println(`Select an option:`, TerminalTextStyle.Text);

    const userInput = await this.terminal.getInput();
    if (userInput === 'a' && accounts.length > 0) {
      this.displayAccounts();
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

  private async displayAccounts() {
    this.terminal.println(``);
    const accounts = getAccounts();
    for (let i = 0; i < accounts.length; i += 1) {
      this.terminal.print(`(${i + 1}): `, TerminalTextStyle.Sub);
      this.terminal.print(`${accounts[i].address} `);

      if (this.balancesEth[i] < 0.25) {
        this.terminal.println(this.balancesEth[i].toFixed(2) + ' ALT', TerminalTextStyle.Red);
      } else {
        this.terminal.println(this.balancesEth[i].toFixed(2) + ' ALT', TerminalTextStyle.Green);
      }
    }
    this.terminal.println(``);
    this.terminal.println(`Select an account:`, TerminalTextStyle.Text);

    const selection = +((await this.terminal.getInput()) || '');
    if (isNaN(selection) || selection > accounts.length) {
      this.terminal.println('Unrecognized input. Please try again.', TerminalTextStyle.Red);
      await this.displayAccounts();
    } else if (this.balancesEth[selection - 1] < 0.25) {
      this.terminal.println('Not enough ALT. Select another account.', TerminalTextStyle.Red);
      await this.displayAccounts();
    } else {
      const account = accounts[selection - 1];
      try {
        await this.ethConnection.setAccount(account.privateKey);
        this.accountSet(account.address);
      } catch (e) {
        this.terminal.println(
          'An unknown error occurred. please try again.',
          TerminalTextStyle.Red
        );
        this.terminal.println('');
        this.displayAccounts();
      }
    }
  }

  private async generateAccount() {
    const newWallet = Wallet.createRandom();
    const newSKey = newWallet.privateKey;
    const newAddr = address(newWallet.address);
    try {
      addAccount(newSKey);
      this.ethConnection.setAccount(newSKey);

      this.terminal.println(``);
      this.terminal.print(`Created new burner wallet with address `);
      this.terminal.printElement(<TextPreview text={newAddr} unFocusedWidth={'100px'} />);
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
      this.terminal.println('Press any key to continue:', TerminalTextStyle.Text);

      await this.terminal.getInput();
      this.accountSet(newAddr);
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
    const newSKey = (await this.terminal.getInput()) || '';
    try {
      const newAddr = address(utils.computeAddress(newSKey));

      addAccount(newSKey);

      this.ethConnection.setAccount(newSKey);
      this.terminal.println(`Imported account with address ${newAddr}.`);
      this.accountSet(newAddr);
    } catch (e) {
      this.terminal.println('An unknown error occurred. please try again.', TerminalTextStyle.Red);
      this.terminal.println('');
      this.importAccount();
    }
  }
}

export function LobbyLandingPage({ onReady }: { onReady: (connection: EthConnection) => void }) {
  const terminal = useRef<TerminalHandle>();
  const [connection, setConnection] = useState<EthConnection | undefined>();
  const [controller, setController] = useState<LobbyPageTerminal | undefined>();

  useEffect(() => {
    getEthConnection()
      .then((connection) => setConnection(connection))
      .catch((e) => {
        alert('error connecting to blockchain');
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (!controller && connection && terminal.current) {
      const newController = new LobbyPageTerminal(
        connection,
        terminal.current,
        (account: EthAddress) => {
          if (connection) {
            terminal.current?.println(`Creating lobby with account: ${account}`);
            onReady(connection);
          } else {
            alert('Unable to make a connection to blockchain');
          }
        }
      );
      newController.chooseAccount();
      setController(newController);
    }
  }, [terminal, connection, controller, onReady]);

  return (
    <TerminalWrapper initRender={InitRenderState.NONE} terminalEnabled={false}>
      <Terminal ref={terminal} promptCharacter={'$'} />
    </TerminalWrapper>
  );
}

const lobbyTips = [
  'A lobby is a Dark Forest universe which is under the control of the account that created it.',
  'You can customize most aspects of Dark Forest when you create a lobby.',
  'Mirror the X or Y space type for credibly neutral maps.',
  'Fixed world radius can be used for a 1v1 battle.',
  'Try increasing game speed for a quick round.',
  'Use the Admin Controls plugin for god-mode control over your lobby.',
  'You can spawn in any space type by adjusting the player spawn perlin range',
  'Disable ZK to make mining the unverse super fast. WARNING: insecure.',
  "Don't like Space Junk? Disable it!",
  "Don't like Capture Zones? Disable them!",
  'Change the Planet Hash Key to change where planets are. Think of it as the seed for planet generation.',
  'Change the Space Type Key to vary the space type zones in your lobby.',
  // TODO: link to the blog post
  // TODO: link to Jordan's video
];
