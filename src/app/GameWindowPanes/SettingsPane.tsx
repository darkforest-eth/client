import React, { useContext, useEffect } from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import EthConnection from '../../api/EthConnection';
import { useStoredUIState, UIDataKey } from '../../api/UIStateStorageManager';
import { Sub, Red, White } from '../../components/Text';
import dfstyles from '../../styles/dfstyles';
import { ONE_DAY } from '../../utils/Utils';
import {
  EthAddress,
  ExploredChunkData,
  Hook,
} from '../../_types/global/GlobalTypes';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import Viewport, { getDefaultScroll } from '../board/Viewport';
import { AccountContext } from '../GameWindow';
import { Btn } from '../GameWindowComponents/Btn';
import { ModalHook, ModalName, ModalPane } from './ModalPane';

const scrollMin = 0.0001 * 10000;
const scrollMax = 0.01 * 10000;
const defaultScroll = Math.round(10000 * (getDefaultScroll() - 1));

const StyledSettingsPane = styled.div`
  width: 32em;
  height: 30em;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  .link {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .section {
    p,
    .row {
      margin: 0.3em auto;
    }

    padding: 0.3em 0;
    border-bottom: 1px solid ${dfstyles.colors.subtext};

    &:last-child {
      border-bottom: none;
    }
  }

  .row {
    display: flex;
    flex-direction: row;

    justify-content: space-between;

    & > span:first-child {
      flex-grow: 1;
    }

    & .input-text {
      transition: background 0.2s, color 0.2s, width 0.2s !important;
      outline: none;
      background: ${dfstyles.colors.background};
      color: ${dfstyles.colors.subtext};
      border-radius: 4px;
      border: 1px solid ${dfstyles.colors.text};
      margin-left: 0.75em;
      width: 16em;
      padding: 2px 6px;
      border-radius: 3px;

      &:focus {
        background: ${dfstyles.colors.backgroundlight};
        color: ${dfstyles.colors.text};
        width: 20em;
      }
    }
  }

  .btn-red {
    color: ${dfstyles.colors.dfred};
    border: 1px solid ${dfstyles.colors.dfred};

    &:hover {
      background: ${dfstyles.colors.dfred};
      color: ${dfstyles.colors.background};
    }
  }
`;

export function SettingsPane({
  ethConnection,
  hook,
  privateHook,
  hiPerfHook,
}: {
  ethConnection: EthConnection;
  hook: ModalHook;
  privateHook: ModalHook;
  hiPerfHook: Hook<boolean>;
}) {
  const account = useContext<EthAddress | null>(AccountContext);
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  // settings stuff
  const [notifMove, setNotifMove] = useStoredUIState<boolean>(
    UIDataKey.notifMove,
    uiManager
  );

  const [_hiPerf, _setHiPerf] = hiPerfHook;

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
      localStorage.setItem(
        `wallet-enabled-${account}`,
        (Date.now() + ONE_DAY).toString()
      );
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
      if (
        !enableUntilStr ||
        Number.isNaN(+enableUntilStr) ||
        Date.now() > +enableUntilStr
      ) {
        setAllowTx(false);
      } else {
        setAllowTx(true);
      }
    };
    checkEnabled();

    const intervalId = setInterval(checkEnabled, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [account]);

  // RPC URL

  const [rpcURLText, setRpcURLText] = useState<string>(
    ethConnection.getRpcEndpoint()
  );

  const [rpcURL, setRpcURL] = useState<string>(ethConnection.getRpcEndpoint());

  const onChangeRpc = () => {
    ethConnection.setRpcEndpoint(rpcURLText).then(() => {
      const newEndpoint = ethConnection.getRpcEndpoint();
      setRpcURLText(newEndpoint);
      setRpcURL(newEndpoint);
    });
  };

  // balance stuff

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

  // map share stuff
  const [failure, setFailure] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

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

  const clipScroll = (v: number) => Math.max(Math.min(v, scrollMax), scrollMin);
  const [scrollSpeed, setScrollSpeed] = useState<number>(defaultScroll);

  const onChange = (e: FormEvent) => {
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

  const [fling, setFling] = useStoredUIState<boolean>(
    UIDataKey.shouldFling,
    uiManager
  );

  useEffect(() => {
    if (!Viewport.instance) return;
    Viewport.instance.setFling(fling);
  }, [fling]);

  return (
    <ModalPane hook={hook} title={'Settings'} name={ModalName.Hats}>
      <StyledSettingsPane>
        <div className='section'>
          <p>Manage account.</p>
          <p>
            <Sub>
              Your <White>SKEY</White>, or secret key, together with your{' '}
              <White>home planet's</White> coordinates, grant you access to your
              Dark Forest account on different browsers (kind of like a
              password).
            </Sub>
          </p>
          <p>
            <Red>They should never be viewed by anyone else!</Red>
          </p>
          <div className='row'>
            <span></span>
            <Btn className='btn-red' onClick={doPrivateClick}>
              Click {clicks} times to view info
            </Btn>
          </div>
        </div>

        <div className='section'>
          <p>Manage wallet.</p>

          <div className='row'>
            <Sub>Public Key</Sub>
            <span>{account}</span>
          </div>
          <div className='row'>
            <Sub>Balance</Sub>
            <span>{balance}</span>
          </div>
          <div className='row'>
            <Sub>Auto-confirm txs under $0.01</Sub>
            <input
              type='checkbox'
              checked={allowTx}
              onChange={(e) => updateAllowTx(e.target.checked)}
            />
          </div>
        </div>

        <div className='section'>
          <p>Export and import explored maps.</p>
          <p>
            <em>
              <Red>WARNING:</Red>{' '}
              <Sub>
                Maps from others could be altered and are not guaranteed to be
                correct!
              </Sub>
            </em>
          </p>

          <div className='row'>
            <span>
              <Btn onClick={onExportMap}>{'Copy Map to Clipboard'}</Btn>
            </span>
            <span>
              <Btn onClick={onImportMap}>Import Map from Clipboard</Btn>
            </span>
          </div>
          <p>
            {success}
            {failure}
          </p>
        </div>

        <div className='section'>
          <p>{`Current RPC Endpoint: ${rpcURL}`}</p>
          <div className='row'>
            <span>
              <input
                className='input-text'
                value={rpcURLText}
                onChange={(e) => setRpcURLText(e.target.value)}
              />
            </span>
            <span>
              <Btn onClick={onChangeRpc}>Change RPC URL</Btn>
            </span>
          </div>
        </div>

        <div className='section'>
          <p>
            We collect a minimal set of data and statistics such as SNARK
            proving times, average transaction times across browsers, and xDAI
            transaction errors, to help us optimize performance and fix bugs.
            This does not include personal data like email or IP address.
          </p>
          <div className='row'>
            <Sub>Opt out of metrics</Sub>
            <input
              type='checkbox'
              checked={optOutMetrics}
              onChange={(e) => updateOptOutMetrics(e.target.checked)}
            />
          </div>
        </div>

        <div className='section'>
          <p>Manage other settings.</p>
          <div className='row'>
            <Sub>Show notifications for MOVE</Sub>
            <input
              type='checkbox'
              checked={notifMove}
              onChange={(e) => setNotifMove(e.target.checked)}
            />
          </div>
          <div className='row'>
            <Sub>Use viewport momentum</Sub>
            <input
              type='checkbox'
              checked={fling}
              onChange={(e) => setFling(e.target.checked)}
            />
          </div>
          <div className='row'>
            <Sub>
              Scroll speed (
              <span
                className='link'
                onClick={() => setScrollSpeed(defaultScroll)}
              >
                default
              </span>
              )
            </Sub>
            <span>
              <input
                style={{ width: '15em' }}
                type='range'
                value={clipScroll(scrollSpeed)}
                min={scrollMin}
                max={scrollMax}
                step={scrollMin / 10}
                onInput={onChange}
              />
              <input
                type='text'
                className='input-text'
                style={{ width: '4em', color: dfstyles.colors.text }}
                value={scrollSpeed}
                onInput={onChange}
              />
            </span>
          </div>
          {/* keeping this for later */}
          {/* <div className='row'>
            <Sub>High-performance mode (lower quality, faster speed!)</Sub>
            <input
              type='checkbox'
              checked={hiPerf}
              onChange={(e) => setHiPerf(e.target.checked)}
            />
          </div> */}
        </div>
      </StyledSettingsPane>
    </ModalPane>
  );
}
