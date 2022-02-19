import { isUnconfirmedWithdrawSilverTx } from '@darkforest_eth/serde';
import { Planet, PlanetType, TooltipName } from '@darkforest_eth/types';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Hook } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext } from '../Components/CoreUI';
import { DarkForestNumberInput, NumberInput } from '../Components/Input';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Row } from '../Components/Row';
import { Red } from '../Components/Text';
import { TooltipTrigger } from '../Panes/Tooltip';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';

const StyledSilverInput = styled.div`
  width: fit-content;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const AllBtn = styled.div`
  color: ${dfstyles.colors.subtext};
  font-size: ${dfstyles.fontSizeS};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const InputWrapper = styled.div`
  width: 5em;
  margin-right: 0.5em;
`;

function SilverInput({
  amt,
  setAmt,
  wrapper,
}: {
  amt: number | undefined;
  setAmt: Hook<number | undefined>[1];
  wrapper: Wrapper<Planet | undefined>;
}) {
  const click = useCallback(() => {
    if (wrapper.value) setAmt(wrapper.value.silver);
  }, [wrapper, setAmt]);

  return (
    <StyledSilverInput>
      <InputWrapper>
        <NumberInput
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => setAmt(e.target.value)}
          value={amt}
        />
      </InputWrapper>
      <AllBtn onClick={click}>all</AllBtn>
    </StyledSilverInput>
  );
}

const TextWrapper = styled.span`
  width: 120px;
  font-size: ${dfstyles.fontSizeXS};
  text-align: center;
`;

export function WithdrawSilver({ wrapper }: { wrapper: Wrapper<Planet | undefined> }) {
  const uiManager = useUIManager();

  const [error, setError] = useState<boolean>(false);
  const [amt, setAmt] = useState<number | undefined>(0);

  const withdraw = useCallback(
    (silver: number | undefined) => {
      if (!wrapper.value) return;
      if (typeof silver !== 'number') {
        setError(true);
      } else {
        uiManager.withdrawSilver(wrapper.value.locationId, silver);
      }
      setAmt(0);
    },
    [wrapper, uiManager]
  );

  const withdrawing = useMemo(
    () => !!wrapper.value?.transactions?.hasTransaction(isUnconfirmedWithdrawSilverTx),
    [wrapper]
  );
  const empty = useMemo(() => !!(wrapper.value && wrapper.value.silver < 1), [wrapper]);

  if (wrapper.value?.planetType === PlanetType.TRADING_POST) {
    return (
      <>
        {error && (
          <Row>
            <Red>Error with amount entered.</Red>
          </Row>
        )}
        <Row>
          <SilverInput amt={amt} setAmt={setAmt} wrapper={wrapper} />
          <TooltipTrigger name={TooltipName.WithdrawSilverButton}>
            <Btn onClick={() => withdraw(amt)} disabled={withdrawing || empty}>
              <TextWrapper>
                {withdrawing ? <LoadingSpinner initialText='Withdrawing...' /> : 'Withdraw Silver'}
              </TextWrapper>
            </Btn>
          </TooltipTrigger>
        </Row>
      </>
    );
  } else {
    return (
      <CenterBackgroundSubtext width='100%' height='75px'>
        Select a Spacetime Rip
      </CenterBackgroundSubtext>
    );
  }
}
