import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext } from '../Components/CoreUI';
import { Sub } from '../Components/Text';
import { useUIManager, useSelectedPlanet, useAccount } from '../Utils/AppHooks';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';

const StyledHatPane = styled.div`
  height: fit-content;
  width: 20em;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &:last-child > span {
      margin-top: 1em;
      text-align: center;
      flex-grow: 1;
    }

    &.margin-top {
      margin-top: 0.5em;
    }
  }
`;

export function HatPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const selectedWrapper = useSelectedPlanet(uiManager);
  const selected = selectedWrapper.value;

  const [balance, setBalance] = useState<number>(0);
  const [visible] = hook;

  useEffect(() => {
    const updateBalance = () => {
      if (visible) {
        setBalance(uiManager.getMyBalance());
      }
    };

    updateBalance();
    const intervalId = setInterval(updateBalance, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [uiManager, visible]);

  const getCost = () => {
    return selected ? 2 ** selected.hatLevel : 1;
  };

  const hatUpgradePending = (): boolean => {
    if (!selected) return true;
    if (!selected.unconfirmedBuyHats) return false;
    return selected.unconfirmedBuyHats.length > 0;
  };

  const account = useAccount(uiManager);

  const enabled = (): boolean =>
    !hatUpgradePending() && selected?.owner === account && balance > getCost();

  let content;

  if (selected && selected.owner === account) {
    content = (
      <StyledHatPane>
        <div>
          <Sub>HAT</Sub>
          <span>{ProcgenUtils.getPlanetCosmetic(selected).hatType}</span>
        </div>
        <div>
          <Sub>HAT Level</Sub>
          <span>{ProcgenUtils.getHatSizeName(selected)}</span>
        </div>
        <div className='margin-top'>
          <Sub>Next Level Cost</Sub>
          <span>
            {getCost()} USD <Sub>/</Sub> {getCost()} DAI
          </span>
        </div>
        <div>
          <Sub>Current Balance</Sub>
          <span>{balance} xDAI</span>
        </div>
        <div>
          <a onClick={() => window.open('https://blog.zkga.me/df-04-faq')}>
            <u>Get More xDAI</u>
          </a>
        </div>
        <div>
          <Btn
            onClick={() => {
              if (!enabled() || !uiManager || !selected) return;
              uiManager.buyHat(selected);
            }}
            disabled={!enabled()}
          >
            {selected && selected.hatLevel > 0 ? 'Upgrade' : 'Buy'} HAT
          </Btn>
        </div>
      </StyledHatPane>
    );
  } else {
    content = (
      <CenterBackgroundSubtext width='20em' height='75px'>
        Select a Planet <br /> You Own
      </CenterBackgroundSubtext>
    );
  }

  return (
    <ModalPane hook={hook} title={'Planet HATs'} name={ModalName.Hats}>
      {content}
    </ModalPane>
  );
}
