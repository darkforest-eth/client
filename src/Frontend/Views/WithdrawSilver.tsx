import { Planet, PlanetType } from '@darkforest_eth/types';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Hook } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext } from '../Components/CoreUI';
import { SpacedFlexRow } from '../Components/FlexRows';
import { Input } from '../Components/Input';
import { ScoreLabelTip, SilverLabelTip } from '../Components/Labels/KeywordLabels';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Red, Sub, White } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';

const StyledWithdrawSilver = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled(SpacedFlexRow)`
  margin-top: 0.5em;
`;

const StyledSilverInput = styled.div`
  width: fit-content;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const AllBtn = styled.div`
  color: ${dfstyles.colors.subtext};
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
  amt: string;
  setAmt: Hook<string>[1];
  wrapper: Wrapper<Planet | undefined>;
}) {
  const click = useCallback(() => {
    if (wrapper.value) setAmt(wrapper.value.silver.toString());
  }, [wrapper, setAmt]);

  return (
    <StyledSilverInput>
      <InputWrapper>
        <Input
          wide
          type='text'
          onInput={(e) => setAmt((e.target as HTMLInputElement).value)}
          value={amt}
        />
      </InputWrapper>
      <AllBtn onClick={click}>all</AllBtn>
    </StyledSilverInput>
  );
}

export function WithdrawSilver({ wrapper }: { wrapper: Wrapper<Planet | undefined> }) {
  const uiManager = useUIManager();

  const [error, setError] = useState<boolean>(false);

  const withdraw = useCallback(
    (silver: string) => {
      if (!wrapper.value) return;
      const amtNum = parseInt(silver);
      if (!amtNum) setError(true);
      uiManager.withdrawSilver(wrapper.value.locationId, amtNum);
    },
    [wrapper, uiManager]
  );

  const [amt, setAmt] = useState<string>('0');

  const withdrawing = useMemo(() => !!wrapper.value?.unconfirmedWithdrawSilver, [wrapper]);
  const empty = useMemo(() => !!(wrapper.value && wrapper.value.silver < 1), [wrapper]);

  let content;
  if (wrapper.value?.planetType === PlanetType.TRADING_POST) {
    content = (
      <>
        <p>
          <Sub>
            This is a <White>Spacetime Rip</White> where you can withdraw <SilverLabelTip /> for{' '}
            <ScoreLabelTip />!
          </Sub>
        </p>
        <Row>
          <Sub>
            <SilverLabelTip /> on Planet:
          </Sub>
          <White>{wrapper.value?.silver}</White>
        </Row>

        {error && (
          <Row>
            <Red>Error with amount entered.</Red>
          </Row>
        )}

        <Row>
          <SilverInput amt={amt} setAmt={setAmt} wrapper={wrapper} />

          <Btn onClick={() => withdraw(amt)} disabled={withdrawing || empty}>
            {withdrawing ? <LoadingSpinner initialText='Withdrawing...' /> : 'Withdraw'}
          </Btn>
        </Row>
      </>
    );
  } else {
    content = (
      <CenterBackgroundSubtext width='100%' height='75px'>
        Select a Spacetime Rip
      </CenterBackgroundSubtext>
    );
  }

  return <StyledWithdrawSilver>{content}</StyledWithdrawSilver>;
}
