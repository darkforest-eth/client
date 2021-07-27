import React from 'react';
import styled from 'styled-components';
import { useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';
import { WithdrawSilver } from '../Views/WithdrawSilver';

const StyledWithdrawSilverPane = styled.div`
  width: 18em;
`;

export function WithdrawSilverPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const s = useSelectedPlanet(uiManager);

  return (
    <ModalPane hook={hook} title={'Withdraw Silver'} name={ModalName.WithdrawSilver}>
      <StyledWithdrawSilverPane>
        <WithdrawSilver wrapper={s} />
      </StyledWithdrawSilverPane>
    </ModalPane>
  );
}
