import React, { useState, useEffect, FormEvent } from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import EthConnection from '../../Backend/Network/EthConnection';
import { Chunk } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { Spacer, Underline } from '../Components/CoreUI';
import { Input } from '../Components/Input';
import { Red, Green, Link } from '../Components/Text';
import Viewport, { getDefaultScroll } from '../Game/Viewport';
import dfstyles from '../Styles/dfstyles';
import { useUIManager, useAccount } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import {
  BooleanSetting,
  Setting,
  MultiSelectSetting,
  AutoGasSetting,
} from '../Utils/SettingsHooks';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';

const SCROLL_MIN = 0.0001 * 10000;
const SCROLL_MAX = 0.01 * 10000;
const DEFAULT_SCROLL = Math.round(10000 * (getDefaultScroll() - 1));

const Range = styled.input``;

const StyledSettingsPane = styled.div`
  width: 32em;
  height: 30em;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  color: ${dfstyles.colors.subtext};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  margin-top: 8px;

  & > span:first-child {
    flex-grow: 1;
  }
`;

const Section = styled.div`
  padding: 1em 0;
  border-bottom: 1px solid ${dfstyles.colors.subtext};

  &:first-child {
    margin-top: -8px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SectionHeader = styled.div`
  color: white;
  margin-bottom: 8px;
  font-weight: bold;
`;

const ScrollSpeedInput = styled(Input)`
  padding: 2px 2px;
  width: 4em;
  height: min-content;
`;

export function SettingsPane({
  ethConnection,
  hook,
  privateHook,
}: {
  ethConnection: EthConnection;
  hook: ModalHook;
  privateHook: ModalHook;
}) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);
  const gasPrices = useEmitterValue(ethConnection.gasPrices$, ethConnection.getGasPrices());

  const [rpcURLText, setRpcURLText] = useState<string>(ethConnection.getRpcEndpoint());
  const [rpcURL, setRpcURL] = useState<string>(ethConnection.getRpcEndpoint());
  const onChangeRpc = () => {
    ethConnection.setRpcEndpoint(rpcURLText).then(() => {
      const newEndpoint = ethConnection.getRpcEndpoint();
      setRpcURLText(newEndpoint);
      setRpcURL(newEndpoint);
    });
  };

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!uiManager) return;
    const updateBalance = () => {
      setBalance(uiManager.getMyBalance());
    };

    updateBalance();
    const intervalId = setInterval(updateBalance, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [uiManager]);

  const [failure, setFailure] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [importMapByTextBoxValue, setImportMapByTextBoxValue] = useState('');
  useEffect(() => {
    if (failure) {
      setSuccess('');
    }
  }, [failure]);
  useEffect(() => {
    if (success) {
      setFailure('');
    }
  }, [success]);
  const onExportMap = async () => {
    if (uiManager) {
      const chunks = uiManager.getExploredChunks();
      const chunksAsArray = Array.from(chunks);
      try {
        const map = JSON.stringify(chunksAsArray);
        await window.navigator.clipboard.writeText(map);
        setSuccess('Copied map!');
      } catch (err) {
        console.error(err);
        setFailure('Failed to export');
      }
    } else {
      setFailure('Unable to export map right now.');
    }
  };
  const onExportMapToFile = async () => {
    if (uiManager) {
      const chunks = uiManager.getExploredChunks();
      const chunksAsArray = Array.from(chunks);
      try {
        const map = JSON.stringify(chunksAsArray);
        const blob = new Blob([map]);
        const url = URL.createObjectURL(blob);
        const tempElement = document.createElement("a");
        tempElement.download = 'map.json';
        tempElement.href = url;
        tempElement.click();
        URL.revokeObjectURL(url);
        setSuccess('Map exported to file!');
      } catch (err) {
        console.error(err);
        setFailure('Failed to export');
      }
    } else {
      setFailure('Unable to export map right now.');
    }
  };
  const onImportMapFromTextBox = async () => {
    try {
      const chunks = JSON.parse(importMapByTextBoxValue);
      await uiManager.bulkAddNewChunks(chunks as Chunk[]);
      setImportMapByTextBoxValue('');
    } catch (e) {
      setFailure('Invalid map data. Check the data in your clipboard.');
    }
  };
  const onImportMap = async () => {
    if (uiManager) {
      let input;
      try {
        input = await window.navigator.clipboard.readText();
      } catch (err) {
        console.error(err);
        setFailure('Unable to import map. Did you allow clipboard access?');
        return;
      }

      let chunks;
      try {
        chunks = JSON.parse(input);
      } catch (err) {
        console.error(err);
        setFailure('Invalid map data. Check the data in your clipboard.');
        return;
      }
      await uiManager.bulkAddNewChunks(chunks as Chunk[]);
      setSuccess('Successfully imported a map!');
    } else {
      setFailure('Unable to import map right now.');
    }
  };
  const onImportMapFromFile = async () => {
    if (uiManager) {
      const file = await new Promise<File | null | undefined>((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
          resolve(input.files?.item(0));
        };
        input.click();
      });
      if (!file) {
        setFailure('No file selected.');
        return;
      }
      let chunks;
      const input = await file.text();
      try {
        chunks = JSON.parse(input);
      } catch (err) {
        console.error(err);
        setFailure('Invaild map data. Check the data in your file.');
        return;
      }
      await uiManager.bulkAddNewChunks(chunks as Chunk[]);
      setSuccess('Successfully imported a map!');
    } else {
      setFailure('Unable to import map right now.');
    }
  };

  const [clicks, setClicks] = useState<number>(8);
  const [, setPrivateVisible] = privateHook;
  const doPrivateClick = (_e: React.MouseEvent) => {
    setClicks((x) => x - 1);
    if (clicks === 1) {
      setPrivateVisible(true);
      setClicks(5);
    }
  };

  const clipScroll = (v: number) => Math.max(Math.min(Math.round(v), SCROLL_MAX), SCROLL_MIN);
  const [scrollSpeed, setScrollSpeed] = useState<number>(DEFAULT_SCROLL);
  const onScrollChange = (e: FormEvent) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    if (!isNaN(value)) setScrollSpeed(value);
  };

  useEffect(() => {
    const scroll = localStorage.getItem('scrollSpeed');
    if (scroll) {
      setScrollSpeed(10000 * (parseFloat(scroll) - 1));
    }
  }, [setScrollSpeed]);

  useEffect(() => {
    if (!Viewport.instance) return;
    Viewport.instance.setMouseSensitivty(scrollSpeed / 10000);
  }, [scrollSpeed]);

  return (
    <ModalPane hook={hook} title={'Settings'} name={ModalName.Hats}>
      <StyledSettingsPane>
        <Section>
          <SectionHeader>Burner Wallet Info</SectionHeader>
          <Row>
            <span>Public Key</span>
            <span>{account}</span>
          </Row>
          <Row>
            <span>Balance</span>
            <span>{balance}</span>
          </Row>
        </Section>

        <Section>
          <SectionHeader>Burner Wallet Info (Private)</SectionHeader>
          Your <Underline>secret key</Underline>, together with your{' '}
          <Underline>home planet's coordinates</Underline>, grant you access to your Dark Forest
          account on different browsers. You should save this info somewhere on your computer.
          <Spacer height={8} />
          <em>
            <Red>WARNING:</Red> Never ever send this to anyone!
          </em>
          <Spacer height={8} />
          <Row>
            <Btn onClick={doPrivateClick}>Click {clicks} times to view info</Btn>
          </Row>
        </Section>

        <Section>
          <SectionHeader>Auto Confirm Transactions</SectionHeader>
          <Spacer height={8} />
          Whether or not to auto-confirm all transactions, except purchases. This will allow you to
          make moves, spend silver on upgrades, etc. without requiring you to confirm each
          transaction. However, the client WILL ask for confirmation before purchasing GPT credits
          or buying hats.
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.AutoApproveNonPurchaseTransactions}
            settingDescription={'toggle auto confirm non-purchase transactions'}
          />
          <Spacer width={8} />
        </Section>

        <Section>
          <SectionHeader>Gas Price</SectionHeader>
          Your gas price setting determines the price you pay for each transaction. A higher gas
          price means your transactions will be prioritized by the blockchain, making them confirm
          faster. We recommend using the <Underline>auto average</Underline> setting. All auto
          settings prices are pulled from{' '}
          <Link href='https://blockscout.com/xdai/mainnet/api/v1/gas-price-oracle'>an oracle</Link>{' '}
          and are capped at 15 gwei.
          <Spacer height={8} />
          <MultiSelectSetting
            uiManager={uiManager}
            setting={Setting.GasFeeGwei}
            values={[
              '1',
              '2',
              '5',
              '10',
              '20',
              '40',
              AutoGasSetting.Slow,
              AutoGasSetting.Average,
              AutoGasSetting.Fast,
            ]}
            labels={[
              '1 gwei (default)',
              '2 gwei (faster)',
              '5 gwei (turbo)',
              '10 gwei (mega turbo)',
              '20 gwei (need4speed)',
              '40 gwei (gigafast)',
              `slow auto (~${gasPrices.slow} gwei)`,
              `average auto (~${gasPrices.average} gwei)`,
              `fast auto (~${gasPrices.fast} gwei)`,
            ]}
            style={{
              width: '250px',
            }}
          />
        </Section>

        <Section>
          <SectionHeader>Import and Export Map Data</SectionHeader>
          <em>
            <Red>WARNING:</Red> Maps from others could be altered and are not guaranteed to be
            correct!
          </em>
          <Spacer height={8} />

          <Input
            wide
            value={importMapByTextBoxValue}
            placeholder={'Paste map contents here'}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setImportMapByTextBoxValue(e.target.value)
            }
          />
          <Spacer height={8} />

          <Btn
            wide
            onClick={onImportMapFromTextBox}
            disabled={importMapByTextBoxValue.length === 0}
          >
            Import Map From Above
          </Btn>
          <Spacer height={8} />

          <Btn wide onClick={onExportMap}>
            Copy Map to Clipboard
          </Btn>
          <Spacer height={8} />

          <Btn wide onClick={onImportMap}>
            Import Map from Clipboard
          </Btn>
          <Spacer height={8} />

          <Btn wide onClick={onExportMapToFile}>
            Export Map to File
          </Btn>
          <Spacer height={8} />

          <Btn wide onClick={onImportMapFromFile}>
            Import Map from File
          </Btn>
          <Spacer height={8} />

          <Green>{success}</Green>
          <Red>{failure}</Red>
        </Section>

        <Section>
          <SectionHeader>Change RPC Endpoint</SectionHeader>
          Current RPC Endpoint: {rpcURL}
          <Spacer height={8} />
          <Row>
            <Input value={rpcURLText} onChange={(e) => setRpcURLText(e.target.value)} />
            <Btn onClick={onChangeRpc}>Change RPC URL</Btn>
          </Row>
        </Section>

        <Section>
          <SectionHeader>Metrics Opt Out</SectionHeader>
          We collect a minimal set of data and statistics such as SNARK proving times, average
          transaction times across browsers, and xDAI transaction errors, to help us optimize
          performance and fix bugs. This does not include personal data like email or IP address.
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.OptOutMetrics}
            settingDescription='toggle metrics opt out'
          />
        </Section>

        <Section>
          <SectionHeader>Performance</SectionHeader>
          Some performance settings. These will definitely be changed as we zero in on the
          performance bottlenecks in this game.
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.HighPerformanceRendering}
            settingDescription='toggle performance mode'
          />
        </Section>

        <Section>
          <SectionHeader>Show notifications for MOVE</SectionHeader>
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.MoveNotifications}
            settingDescription='toggle move notifications'
          />
        </Section>
        <Section>
          <SectionHeader>Scroll speed</SectionHeader>
          <Spacer height={8} />
          <Row>
            Scroll speed
            <Range
              type='range'
              value={clipScroll(scrollSpeed)}
              min={SCROLL_MIN}
              max={SCROLL_MAX}
              step={SCROLL_MIN / 10}
              onInput={onScrollChange}
            />
            <ScrollSpeedInput value={scrollSpeed} onInput={onScrollChange} />
          </Row>
        </Section>
      </StyledSettingsPane>
    </ModalPane>
  );
}
