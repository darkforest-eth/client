import { weiToGwei } from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import { Setting } from '@darkforest_eth/types';
import { BigNumber as EthersBN } from 'ethers';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { ONE_DAY } from '../../Backend/Utils/Utils';
import Button from '../Components/Button';
import { Checkbox, DarkForestCheckbox } from '../Components/Input';
import { Row } from '../Components/Row';
import dfstyles from '../Styles/dfstyles';
import { setBooleanSetting } from '../Utils/SettingsHooks';

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

  .mtop {
    margin-top: 1em;
  }

  button {
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

  .network {
    color: ${dfstyles.colors.subtext};
  }

  .section {
    padding: 0.5em;

    &:not(:last-of-type) {
      border-bottom: 1px solid gray;
    }

    & > h2 {
      font-size: 1.5em;
      font-weight: 300;
    }
  }
`;

const keys = keyframes`
  from {
    filter: brightness(1.3);
  }
  to {
    filter: brightness(0.6);
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

export function TxConfirmPopup({
  match,
}: RouteComponentProps<{
  contract: string;
  addr: string;
  actionId: string;
  balance: string;
  method: string;
}>) {
  const { contract, addr, actionId, balance, method } = match.params;

  const contractAddress = address(contract);
  const account = address(addr);

  const doReject = () => {
    localStorage.setItem(`tx-approved-${account}-${actionId}`, 'false');
    window.close();
  };

  const [autoApproveChecked, setAutoApprovedChecked] = useState<boolean>(false);

  const approve = () => {
    localStorage.setItem(`tx-approved-${account}-${actionId}`, 'true');
    window.close();
  };

  const setAutoApproveSetting = () => {
    localStorage.setItem(`tx-approved-${account}-${actionId}`, 'true');
    localStorage.setItem(`wallet-enabled-${account}`, (Date.now() + ONE_DAY).toString());
    const config = {
      contractAddress,
      account,
    };
    setBooleanSetting(config, Setting.AutoApproveNonPurchaseTransactions, true);
    window.close();
  };

  const doApprove = () => {
    if (autoApproveChecked) setAutoApproveSetting();
    else approve();
  };

  const gasFee = EthersBN.from(localStorage.getItem(`${account}-gasFeeGwei`) || '');

  const fromPlanet = localStorage.getItem(`${account}-fromPlanet`);
  const toPlanet = localStorage.getItem(`${account}-toPlanet`);

  const hatPlanet = localStorage.getItem(`${account}-hatPlanet`);
  const hatLevel = localStorage.getItem(`${account}-hatLevel`);
  const hatCost: number = method === 'buyHat' && hatLevel ? 2 ** parseInt(hatLevel) : 0;

  const txCost: number = hatCost + 0.002 * weiToGwei(gasFee);

  const upPlanet = localStorage.getItem(`${account}-upPlanet`);
  const branch = localStorage.getItem(`${account}-branch`);

  const planetToTransfer = localStorage.getItem(`${account}-transferPlanet`);
  const transferTo = localStorage.getItem(`${account}-transferOwner`);

  const findArtifactPlanet = localStorage.getItem(`${account}-findArtifactOnPlanet`);

  const depositPlanet = localStorage.getItem(`${account}-depositPlanet`);
  const depositArtifact = localStorage.getItem(`${account}-depositArtifact`);

  const withdrawPlanet = localStorage.getItem(`${account}-withdrawPlanet`);
  const withdrawArtifact = localStorage.getItem(`${account}-withdrawArtifact`);

  const activatePlanet = localStorage.getItem(`${account}-activatePlanet`);
  const activateArtifact = localStorage.getItem(`${account}-activateArtifact`);

  const deactivatePlanet = localStorage.getItem(`${account}-deactivatePlanet`);
  const deactivateArtifact = localStorage.getItem(`${account}-deactivateArtifact`);

  const withdrawSilverPlanet = localStorage.getItem(`${account}-withdrawSilverPlanet`);

  const revealPlanet = localStorage.getItem(`${account}-revealLocationId`);

  return (
    <StyledTxConfirmPopup>
      <div className='section'>
        <h2>Confirm Transaction</h2>
      </div>

      <div className='section'>
        <Row>
          <b>Contract Action</b>
          <span>{method.toUpperCase()}</span>
        </Row>
        {method === 'revealLocation' && (
          <Row>
            <b>Planet ID</b>
            <span className='mono'>{revealPlanet}</span>
          </Row>
        )}
        {method === 'buyHat' && (
          <>
            <Row>
              <b>On</b>
              <span className='mono'>{hatPlanet}</span>
            </Row>
            <Row>
              <b>HAT Level</b>
              <span>
                {hatLevel} ({hatCost} ALT)
              </span>
            </Row>
          </>
        )}
        {method === 'move' && (
          <>
            <Row>
              <b>From</b>
              <span className='mono'>{fromPlanet}</span>
            </Row>
            <Row>
              <b>To</b>
              <span className='mono'>{toPlanet}</span>
            </Row>
          </>
        )}
        {method === 'upgradePlanet' && (
          <>
            <Row>
              <b>On</b>
              <span className='mono'>{upPlanet}</span>
            </Row>
            <Row>
              <b>Branch</b>
              <span>{branch}</span>
            </Row>
          </>
        )}
        {method === 'transferPlanet' && (
          <>
            <Row>
              <b>Planet ID</b>
              <span className='mono'>{planetToTransfer}</span>
            </Row>
            <Row>
              <b>Transfer to</b>
              <span>{transferTo}</span>
            </Row>
          </>
        )}
        {method === 'findArtifact' && (
          <Row>
            <b>Planet ID</b>
            <span className='mono'>{findArtifactPlanet}</span>
          </Row>
        )}
        {method === 'depositArtifact' && (
          <>
            <Row>
              <b>Planet ID</b>
              <span className='mono'>{depositPlanet}</span>
            </Row>
            <Row>
              <b>Artifact ID</b>
              <span className='mono'>{depositArtifact}</span>
            </Row>
          </>
        )}
        {method === 'withdrawArtifact' && (
          <>
            <Row>
              <b>Planet ID</b>
              <span className='mono'>{withdrawPlanet}</span>
            </Row>
            <Row>
              <b>Artifact ID</b>
              <span className='mono'>{withdrawArtifact}</span>
            </Row>
          </>
        )}
        {method === 'activateArtifact' && (
          <>
            <Row>
              <b>Planet ID</b>
              <span className='mono'>{activatePlanet}</span>
            </Row>
            <Row>
              <b>Artifact ID</b>
              <span className='mono'>{activateArtifact}</span>
            </Row>
          </>
        )}
        {method === 'deactivateArtifact' && (
          <>
            <Row>
              <b>Planet ID</b>
              <span className='mono'>{deactivatePlanet}</span>
            </Row>
            <Row>
              <b>Artifact ID</b>
              <span className='mono'>{deactivateArtifact}</span>
            </Row>
          </>
        )}
        {method === 'withdrawSilver' && (
          <Row>
            <b>Planet ID</b>
            <span className='mono'>{withdrawSilverPlanet}</span>
          </Row>
        )}
      </div>

      <div className='section'>
        <Row>
          <b>Gas Fee</b>
          <span>{weiToGwei(gasFee)} gwei</span>
        </Row>
        <Row>
          <b>Gas Limit</b>
          <span>2000000</span>
        </Row>
        <Row>
          <b>Total Transaction Cost</b>
          <span>{txCost.toFixed(8)} ALT</span>
        </Row>
        {method === 'buyHat' && hatLevel && +hatLevel > 6 && (
          <Row>
            <b
              style={{
                color: 'red',
              }}
            >
              WARNING: You are buying a very expensive HAT! Check the price and make sure you intend
              to do this!
            </b>
          </Row>
        )}
        <Row className='mtop'>
          <b>Account Balance</b>
          <span>{parseFloat(balance).toFixed(8)} ALT</span>
        </Row>
        <Row className='mtop'>
          <Button onClick={doReject}>
            <span>{'Reject'}</span>
          </Button>

          <Button onClick={doApprove}>
            <span>{'Approve'}</span>
          </Button>
        </Row>
      </div>

      <div className='section'>
        <Row className='network'>
          <div>
            <ConfirmIcon /> DF connected to ALT
          </div>
        </Row>
        <Row className='mtop'>
          <Checkbox
            label='Auto-confirm all transactions except purchases. Currently, you can only purchase Hats, or anything 3rd party plugins offer.'
            checked={autoApproveChecked}
            onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
              setAutoApprovedChecked(e.target.checked)
            }
          />
        </Row>
      </div>
    </StyledTxConfirmPopup>
  );
}
