import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import Button from '../components/Button';
import dfstyles from '../styles/dfstyles';
import { ONE_DAY } from '../utils/Utils';

const StyledTxConfirmPopup = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: white;
  color: black;

  font-family: 'Helvetica', 'Arial', sans-serif;
  font-size: 12pt;

  font-weight: 400;

  .mono {
    font-family: 'Inconsolata', 'Monaco', monospace;
    font-size: 11pt;
  }

  b {
    font-weight: 700;
  }

  & > div {
    border-bottom: 1px solid gray;
    padding: 0.5em;

    & > h2 {
      font-size: 1.5em;
      font-weight: 300;
    }

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &.mtop {
        margin-top: 1em;
      }

      & > button {
        flex-grow: 1;
        padding: 1em;
        border-radius: 8px;

        transition: filter 0.1s;
        &:hover {
          filter: brightness(1.1);
        }
        &:active {
          filter: brightness(0.9);
        }

        &:first-child {
          margin-right: 0.5em;
          background: #e3e3e3;
          border: 2px solid #444;
        }
        &:last-child {
          color: white;
          background: #00aed9;
          border: 2px solid #00708b;
        }
      }
    }
    &:last-of-type {
      border-bottom: none;
      color: #888;

      & > span:first-child {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
`;

const keys = keyframes`
  from {
    filter: brightness(1.3);
  }
  to {
    filter brightness(0.6);
  }
`;

const anim = css`
  animation: ${keys} 1s ${dfstyles.game.styles.animProps};
`;

const ConfirmIcon = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background: ${dfstyles.colors.dfgreen};

  ${anim};
`;

export function TxConfirmPopup({ match }: RouteComponentProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { addr, actionId, balance, method } = match.params as {
    addr: string;
    actionId: string;
    balance: string;
    method: string;
  };

  const doReject = () => {
    localStorage.setItem(`tx-approved-${addr}-${actionId}`, 'false');
    window.close();
  };

  const [checked, setChecked] = useState<boolean>(false);

  const approve = () => {
    localStorage.setItem(`tx-approved-${addr}-${actionId}`, 'true');
    window.close();
  };
  const doApproveFor24H = () => {
    localStorage.setItem(`tx-approved-${addr}-${actionId}`, 'true');
    localStorage.setItem(
      `wallet-enabled-${addr}`,
      (Date.now() + ONE_DAY).toString()
    );
    window.close();
  };

  const doApprove = () => {
    if (checked) doApproveFor24H();
    else approve();
  };

  const fromPlanet = localStorage.getItem(`${addr.toLowerCase()}-fromPlanet`);
  const toPlanet = localStorage.getItem(`${addr.toLowerCase()}-toPlanet`);

  const hatPlanet = localStorage.getItem(`${addr.toLowerCase()}-hatPlanet`);
  const hatLevel = localStorage.getItem(`${addr.toLowerCase()}-hatLevel`);
  const hatCost: number =
    method === 'buyHat' && hatLevel ? 2 ** parseInt(hatLevel) : 0;

  const txCost: number = 0.002 + hatCost;

  const upPlanet = localStorage.getItem(`${addr.toLowerCase()}-upPlanet`);
  const branch = localStorage.getItem(`${addr.toLowerCase()}-branch`);

  const planetToTransfer = localStorage.getItem(
    `${addr.toLowerCase()}-transferPlanet`
  );
  const transferTo = localStorage.getItem(
    `${addr.toLowerCase()}-transferOwner`
  );

  const findArtifactPlanet = localStorage.getItem(
    `${addr.toLowerCase()}-findArtifactOnPlanet`
  );

  const depositPlanet = localStorage.getItem(
    `${addr.toLowerCase()}-depositPlanet`
  );
  const depositArtifact = localStorage.getItem(
    `${addr.toLowerCase()}-depositArtifact`
  );

  const withdrawPlanet = localStorage.getItem(
    `${addr.toLowerCase()}-withdrawPlanet`
  );
  const withdrawArtifact = localStorage.getItem(
    `${addr.toLowerCase()}-withdrawArtifact`
  );

  return (
    <StyledTxConfirmPopup>
      <div>
        <h2>Confirm Transaction</h2>
      </div>

      <div>
        <div>
          <b>Contract Action</b>
          <span>{method.toUpperCase()}</span>
        </div>
        {method === 'buyHat' && (
          <>
            <div>
              <b>On</b>
              <span className='mono'>{hatPlanet}</span>
            </div>
            <div>
              <b>HAT Level</b>
              <span>
                {hatLevel} ({hatCost} xDAI)
              </span>
            </div>
          </>
        )}
        {method === 'move' && (
          <>
            <div>
              <b>From</b>
              <span className='mono'>{fromPlanet}</span>
            </div>
            <div>
              <b>To</b>
              <span className='mono'>{toPlanet}</span>
            </div>
          </>
        )}
        {method === 'upgradePlanet' && (
          <>
            <div>
              <b>On</b>
              <span className='mono'>{upPlanet}</span>
            </div>
            <div>
              <b>Branch</b>
              <span>{branch}</span>
            </div>
          </>
        )}
        {method === 'transferOwnership' && (
          <>
            <div>
              <b>Planet ID</b>
              <span className='mono'>{planetToTransfer}</span>
            </div>
            <div>
              <b>Transfer to</b>
              <span>{transferTo}</span>
            </div>
          </>
        )}
        {method === 'findArtifact' && (
          <>
            <div>
              <b>Planet ID</b>
              <span className='mono'>{findArtifactPlanet}</span>
            </div>
          </>
        )}
        {method === 'depositArtifact' && (
          <>
            <div>
              <b>Planet ID</b>
              <span className='mono'>{depositPlanet}</span>
            </div>
            <div>
              <b>Artifact ID</b>
              <span className='mono'>{depositArtifact}</span>
            </div>
          </>
        )}
        {method === 'withdrawArtifact' && (
          <>
            <div>
              <b>Planet ID</b>
              <span className='mono'>{withdrawPlanet}</span>
            </div>
            <div>
              <b>Artifact ID</b>
              <span className='mono'>{withdrawArtifact}</span>
            </div>
          </>
        )}
        {/* <div>
          <b>From Planet</b>
          <span className='mono'>0xaaasdfasdfasdfasdfa</span>
        </div>
        <div>
          <b>To Planet</b>
          <span className='mono'>0xaaasdfasdfasdfasdfa</span>
        </div> */}
      </div>

      <div>
        <div>
          <b>Gas Fee</b>
          <span>1GWEI</span>
        </div>
        <div>
          <b>Gas Limit</b>
          <span>2000000</span>
        </div>
        <div>
          <b>Total Transaction Cost</b>
          <span>{txCost.toFixed(8)} xDAI</span>
        </div>
        {method === 'buyHat' && hatLevel && +hatLevel > 6 && (
          <div>
            <b
              style={{
                color: 'red',
              }}
            >
              WARNING: You are buying a very expensive HAT! Check the price and
              make sure you intend to do this!
            </b>
          </div>
        )}
        <div className='mtop'>
          <b>Account Balance</b>
          <span>{parseFloat(balance).toFixed(8)} xDAI</span>
        </div>
        <div className='mtop'>
          <Button onClick={doReject}>
            <span>{'Reject'}</span>
          </Button>

          <Button onClick={doApprove}>
            <span>{'Approve'}</span>
          </Button>
        </div>
      </div>

      <div>
        <div>
          <span>
            <ConfirmIcon /> DF connected to xDAI
          </span>
          <span>
            Auto-confirm {'txs under $0.01'} for 24 hours{' '}
            <input
              type='checkbox'
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </span>
        </div>
      </div>

      {/* <Button onClick={doApproveFor24H}>
        <span>{'approve all for 24h'} </span>
      </Button> */}
    </StyledTxConfirmPopup>
  );
}
