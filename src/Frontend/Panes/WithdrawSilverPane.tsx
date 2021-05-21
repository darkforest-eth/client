import { PlanetType } from '@darkforest_eth/types';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext } from '../Components/CoreUI';
import { Input } from '../Components/Input';
import { Red, Sub } from '../Components/Text';
import { useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { ModalPane, ModalName, ModalHook } from '../Views/ModalPane';

const StyledWithdrawSilverPane = styled.div`
  display: flex;
  flex-direction: column;
`;

export function WithdrawSilverPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager).value;

  const [error, setError] = useState<boolean>(false);

  const withdraw = useCallback(
    (silver: string) => {
      if (!selected) return;
      const amtNum = parseInt(silver);
      if (!amtNum) setError(true);
      uiManager.withdrawSilver(selected.locationId, amtNum);
    },
    [selected, uiManager]
  );

  const [amt, setAmt] = useState<string>('');

  let content;
  if (!selected) {
    content = (
      <CenterBackgroundSubtext width='20em' height='75px'>
        Select a Planet
      </CenterBackgroundSubtext>
    );
  } else if (selected.planetType !== PlanetType.TRADING_POST) {
    content = (
      <CenterBackgroundSubtext width='20em' height='75px'>
        Select a spacetime rip to withdraw silver
      </CenterBackgroundSubtext>
    );
  } else {
    content = (
      <>
        <p>Enter the amount of silver to withdraw:</p>
        <p>
          <Sub>Silver on planet: {selected?.silver}</Sub>
        </p>
        <Input
          type='text'
          onInput={(e) => setAmt((e.target as HTMLInputElement).value)}
          value={amt}
        />
        {error && <Red>Error with amount entered.</Red>}
        <Btn onClick={() => withdraw(amt)}>Withdraw</Btn>
      </>
    );
  }

  return (
    <ModalPane hook={hook} title={'Withdraw Silver'} name={ModalName.WithdrawSilver}>
      <StyledWithdrawSilverPane>{content}</StyledWithdrawSilverPane>
    </ModalPane>
  );
}
