import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useStoredUIState, UIDataKey } from '../../api/UIStateStorageManager';
import { Sub, Red, White } from '../../components/Text';
import dfstyles from '../../styles/dfstyles';
import { ONE_DAY } from '../../utils/Utils';
import { EthAddress, Hook } from '../../_types/global/GlobalTypes';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { AccountContext } from '../GameWindow';
import { Btn } from '../GameWindowComponents/Btn';
import { ModalHook, ModalName, ModalPane } from './ModalPane';

const StyledSettingsPane = styled.div`
  width: 32em;
  height: fit-content;

  display: flex;
  flex-direction: column;

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
  hook,
  privateHook,
  hiPerfHook,
}: {
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

  const [hiPerf, setHiPerf] = hiPerfHook;

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

  // balance stuff

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

  // const [copiedSkey, setCopiedSkey] = useState<boolean>(false);
  // const copySkey = async () => {
  //   if (!sKey) return;

  //   try {
  //     await window.navigator.clipboard.writeText(sKey);

  //     setCopiedSkey(true);
  //     setTimeout(() => {
  //       setCopiedSkey(false);
  //     }, 5000);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const [copiedHome, setCopiedHome] = useState<boolean>(false);

  // const copyHome = async () => {
  //   if (!home) return;

  //   try {
  //     await window.navigator.clipboard.writeText(home);

  //     setCopiedHome(true);
  //     setTimeout(() => {
  //       setCopiedHome(false);
  //     }, 5000);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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

      chunks.forEach((chunk) => uiManager.addNewChunk(chunk));
      setSuccess('Successfully imported a map!');
    } else {
      setFailure('Unable to import map right now.');
    }
  };

  const [clicks, setClicks] = useState<number>(8);
  const [, setPrivateVisible] = privateHook;
  const doPrivateClick = (_e) => {
    setClicks((x) => x - 1);
    if (clicks === 1) {
      setPrivateVisible(true);
      setClicks(5);
    }
  };

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
            <Sub>High-performance mode (lower quality, faster speed!)</Sub>
            <input
              type='checkbox'
              checked={hiPerf}
              onChange={(e) => setHiPerf(e.target.checked)}
            />
          </div>
        </div>
      </StyledSettingsPane>
    </ModalPane>
  );
}
