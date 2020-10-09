import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Sub } from '../../components/Text';
import { HAT_SIZES } from '../../utils/constants';
import { getPlanetCosmetic } from '../../utils/ProcgenUtils';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import { EthAddress, Planet } from '../../_types/global/GlobalTypes';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import {
  AccountContext,
  ContextMenuType,
  SelectedContext,
} from '../GameWindow';
import { Btn } from '../GameWindowComponents/GameWindowComponents';
import { ModalHook, ModalName, ModalPane } from './ModalPane';

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
  const selected = useContext<Planet | null>(SelectedContext);
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

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

  useEffect(() => {
    const [, setVisible] = hook;
    const doChange = (type: ContextMenuType) => {
      if (type === ContextMenuType.None) {
        setVisible(false);
      }
    };
    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.on(UIEmitterEvent.ContextChange, doChange);

    const hide = () => setVisible(false);
    uiEmitter.on(UIEmitterEvent.GamePlanetSelected, hide);

    return () => {
      uiEmitter.removeListener(UIEmitterEvent.ContextChange, doChange);
      uiEmitter.removeListener(UIEmitterEvent.GamePlanetSelected, hide);
    };
  });

  const getCost = () => {
    return selected ? 2 ** selected.hatLevel : 1;
  };

  const hatUpgradePending = (): boolean => {
    if (!selected) return true;
    if (!selected.unconfirmedBuyHats) return false;
    return selected.unconfirmedBuyHats.length > 0;
  };

  const account = useContext<EthAddress | null>(AccountContext);

  const enabled = (): boolean =>
    !hatUpgradePending() && selected?.owner === account && balance > getCost();

  return (
    <ModalPane hook={hook} title={'Planet HATs'} name={ModalName.Hats}>
      <StyledHatPane>
        <div>
          <Sub>HAT</Sub>
          <span>{getPlanetCosmetic(selected).hatType}</span>
        </div>
        <div>
          <Sub>HAT Level</Sub>
          <span>{HAT_SIZES[selected ? selected.hatLevel : 0]}</span>
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
            onClick={() =>
              enabled() && uiManager && selected && uiManager.buyHat(selected)
            }
            className={!enabled() ? 'btn-disabled' : ''}
          >
            {selected && selected.hatLevel > 0 ? 'Upgrade' : 'Buy'} HAT
          </Btn>
        </div>
      </StyledHatPane>
    </ModalPane>
  );
}
