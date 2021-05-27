import React, { useState, useEffect, FormEvent } from 'react';
import { useCallback } from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import EthConnection from '../../Backend/Network/EthConnection';
import { useStoredUIState, UIDataKey } from '../../Backend/Storage/UIStateStorageManager';
import { ONE_DAY } from '../../Backend/Utils/Utils';
import { ExploredChunkData } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { SelectFrom, Spacer } from '../Components/CoreUI';
import { Input } from '../Components/Input';
import { White, Red, Green } from '../Components/Text';
import Viewport, { getDefaultScroll } from '../Game/Viewport';
import dfstyles from '../Styles/dfstyles';
import { useUIManager, useAccount } from '../Utils/AppHooks';
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

  &:last-child {
    border-bottom: none;
  }
`;

const SectionHeader = styled.div`
  text-decoration: underline;
  color: white;
  margin-bottom: 8px;
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

  const [optOutMetrics, setOptOutMetrics] = useState<boolean | undefined>();
  const updateOptOutMetrics = (newVal: boolean): void => {
    if (!account) return;
    localStorage.setItem(`optout-metrics-${account}`, JSON.stringify(newVal));
    setOptOutMetrics(newVal);
  };

  const [allowTx, setAllowTx] = useState<boolean>(false);
  const updateAllowTx = (newVal: boolean): void => {
    if (!account) return;
    if (newVal) {
      localStorage.setItem(`wallet-enabled-${account}`, (Date.now() + ONE_DAY).toString());
      setAllowTx(true);
    } else {
      localStorage.setItem(`wallet-enabled-${account}`, '0');
      setAllowTx(false);
    }
  };

  useEffect(() => {
    const checkEnabled = () => {
      if (!account) return;

      const enableUntilStr = localStorage.getItem(`wallet-enabled-${account}`);
      if (!enableUntilStr || Number.isNaN(+enableUntilStr) || Date.now() > +enableUntilStr) {
        setAllowTx(false);
      } else {
        setAllowTx(true);
      }
    };

    checkEnabled();
    const intervalId = setInterval(checkEnabled, 1000);
    return () => clearInterval(intervalId);
  }, [account]);

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
    if (typeof optOutMetrics === 'undefined' && account) {
      const fromDisk = localStorage.getItem(`optout-metrics-${account}`);
      setOptOutMetrics(fromDisk === 'true');
    }
  }, [optOutMetrics, account]);
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
  const onImportMapFromTextBox = async () => {
    try {
      const chunks = JSON.parse(importMapByTextBoxValue);
      await uiManager.bulkAddNewChunks(chunks as ExploredChunkData[]);
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
      await uiManager.bulkAddNewChunks(chunks as ExploredChunkData[]);
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

  const [notifMove, setNotifMove] = useStoredUIState<boolean>(UIDataKey.notifMove, uiManager);

  const [gasFeeGwei, setGasFeeGwei] = useStoredUIState<number>(UIDataKey.gasFeeGwei, uiManager);
  const onGasFeeGweiChange = useCallback(
    (newValueStringifiedInt: string) => {
      const newGasFee = parseInt(newValueStringifiedInt, 10);

      if (!isNaN(newGasFee)) {
        setGasFeeGwei(newGasFee);
      }
    },
    [setGasFeeGwei]
  );

  return (
    <ModalPane hook={hook} title={'Settings'} name={ModalName.Hats}>
      <StyledSettingsPane>
        <Section>
          <SectionHeader>Manage account</SectionHeader>
          Your <White>SKEY</White>, or secret key, together with your <White>home planet's</White>{' '}
          coordinates, grant you access to your Dark Forest account on different browsers (kind of
          like a password).
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
          <SectionHeader>Manage wallet</SectionHeader>
          <Row>
            <span>Public Key</span>
            <span>{account}</span>
          </Row>
          <Row>
            <span>Balance</span>
            <span>{balance}</span>
          </Row>
          <Row>
            <span>gas fee (gwei)</span>
            <SelectFrom
              values={['1', '2', '3']}
              labels={['1 gwei (default)', '2 gwei (faster)', '3 gwei (fastest)']}
              value={gasFeeGwei + ''}
              setValue={onGasFeeGweiChange}
            />
          </Row>
          <Row>
            <span>
              Auto-confirm all transactions except purchases. Currently, you can only purchase GPT
              Credits, and Hats.
            </span>
            <Spacer width={64} />
            <input
              type='checkbox'
              checked={allowTx}
              onChange={(e) => updateAllowTx(e.target.checked)}
            />
          </Row>
        </Section>

        <Section>
          <SectionHeader>Export and import explored maps</SectionHeader>
          <em>
            <Red>WARNING:</Red> Maps from others could be altered and are not guaranteed to be
            correct!
          </em>
          <Spacer height={8} />
          <Btn wide onClick={onExportMap}>
            Copy Map to Clipboard
          </Btn>
          <Spacer height={8} />
          <Btn wide onClick={onImportMap}>
            Import Map from Clipboard
          </Btn>
          <Spacer height={16} />
          You can also import a map by pasting from your clipboard into the text input below, and
          clicking the import button below it.
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
            Import
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
          <SectionHeader>Metrics Opt Out.</SectionHeader>
          We collect a minimal set of data and statistics such as SNARK proving times, average
          transaction times across browsers, and xDAI transaction errors, to help us optimize
          performance and fix bugs. This does not include personal data like email or IP address.
          <Spacer height={8} />
          <Row>
            <span>Opt out of metrics</span>
            <input
              type='checkbox'
              checked={optOutMetrics}
              onChange={(e) => updateOptOutMetrics(e.target.checked)}
            />
          </Row>
        </Section>

        <Section>
          <SectionHeader>Manage other settings.</SectionHeader>
          <Row>
            <span>Show notifications for MOVE</span>
            <input
              type='checkbox'
              checked={notifMove}
              onChange={(e) => setNotifMove(e.target.checked)}
            />
          </Row>
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
