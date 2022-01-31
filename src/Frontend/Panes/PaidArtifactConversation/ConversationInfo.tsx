import { weiToEth } from '@darkforest_eth/network';
import React from 'react';
import styled from 'styled-components';
import { useUIManager } from '../../Utils/AppHooks';
import { useEmitterValue } from '../../Utils/EmitterHooks';

export function ConversationInfo(_: { questionsRemaining: number }) {
  const uiManager = useUIManager();
  const myBalance = useEmitterValue(uiManager.getEthConnection().myBalance$, undefined);

  return (
    <Container>
      {myBalance !== undefined && (
        <span>Your xDai Wallet: {weiToEth(myBalance).toFixed(2)} xDai</span>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
