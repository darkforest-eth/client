import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../../Components/Btn';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Green, Red, Sub } from '../../Components/Text';
import dfstyles from '../../Styles/dfstyles';
import { useUIManager } from '../../Utils/AppHooks';
import { useEmitterValue } from '../../Utils/EmitterHooks';

export function CurrencyView() {
  const uiManager = useUIManager();
  const currentGptCredits = useEmitterValue(uiManager.getGptCreditBalanceEmitter(), undefined);
  const currentCreditPrice = useEmitterValue(uiManager.getGptCreditPriceEmitter(), undefined);
  const isBuyingCredits = useEmitterValue(uiManager.getIsBuyingCreditsEmitter(), false);
  const [buyAmount, _setBuyAmount] = useState(5);
  const buyMore = useCallback(() => {
    uiManager.buyGPTCredits(buyAmount);
  }, [buyAmount, uiManager]);

  return (
    <CurrencyViewContainer>
      <span>
        You have {currentGptCredits === 0 ? <Red>0</Red> : <Green>{currentGptCredits}</Green>}{' '}
        credits
      </span>
      <span>
        Credit Price: <Green>{currentCreditPrice + ' '}</Green>xDai each
      </span>
      <Btn color={dfstyles.colors.dfyellow} onClick={buyMore} disabled={isBuyingCredits}>
        {isBuyingCredits ? (
          <LoadingSpinner initialText='buying 5 credits' />
        ) : (
          <span>buy 5x credits</span>
        )}
      </Btn>
    </CurrencyViewContainer>
  );
}

const CurrencyViewContainer = styled(Sub)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
