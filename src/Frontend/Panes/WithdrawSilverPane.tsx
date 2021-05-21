import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { Input } from '../Components/Input';
import { Red, Sub } from '../Components/Text';
import { useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { ModalHook, ModalPane, ModalName } from '../Views/ModalPane';

const StyledWithdrawSilverPane = styled.div`
  display: flex;
  flex-direction: column;
`;

export function WithdrawSilverPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager);

  const [error, setError] = useState<boolean>(false);

  const withdraw = useCallback(
    (silver: string) => {
      if (!selected.value) return;
      const amtNum = parseInt(silver);
      if (!amtNum) setError(true);
      uiManager.withdrawSilver(selected.value.locationId, amtNum);
    },
    [selected, uiManager]
  );

  const [amt, setAmt] = useState<string>('');

  return (
    <ModalPane hook={hook} title={'Planet HATs'} name={ModalName.Hats}>
      <StyledWithdrawSilverPane>
        <p>Please enter the amount of silver you want to withdraw.</p>
        <p>
          <Sub>Silver on planet: {selected.value?.silver}</Sub>
        </p>
        <Input
          type='text'
          onInput={(e) => setAmt((e.target as HTMLInputElement).value)}
          value={amt}
        />
        {error && <Red>Error with amount entered.</Red>}
        <Btn onClick={() => withdraw(amt)}>Withdraw</Btn>
      </StyledWithdrawSilverPane>
    </ModalPane>
  );
}
