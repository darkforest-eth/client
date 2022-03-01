import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HeaderText, Spacer, TextButton } from '../Components/CoreUI';
import dfstyles from '../Styles/dfstyles';

const TipText = styled.div`
  max-width: 500px;
  word-break: keep-all;
  text-align: justify;
`;

const CYCLE_TIPS_INTERVAL = 10 * 1000;

export function DarkForestTips({
  tips,
  title,
}: {
  tips: (JSX.Element | string)[];
  title?: string;
}) {
  const [tipIndex, setTipIndex] = useState(0);
  const [_interval, setIntervalHandle] = useState<ReturnType<typeof setInterval> | undefined>();

  const incrementTipIndex = useCallback(
    (increment: number, shouldClearInterval = false) => {
      if (shouldClearInterval) {
        setIntervalHandle((interval) => {
          if (interval) {
            clearInterval(interval);
          }
          return undefined;
        });
      }

      setTipIndex((tipIndex) => (tipIndex + increment + tips.length) % tips.length);
    },
    [tips.length]
  );

  useEffect(() => {
    const intervalHandle = setInterval(() => incrementTipIndex(1), CYCLE_TIPS_INTERVAL);
    setIntervalHandle(intervalHandle);
    return () => clearInterval(intervalHandle);
  }, [incrementTipIndex]);

  return (
    <TipsContainer>
      <HeaderText style={{ textDecoration: 'none' }}>{title ?? 'Dark Forest Tips'}</HeaderText>{' '}
      <PrevNextContainer>
        <TextButton onClick={() => incrementTipIndex(-1, true)}>previous</TextButton>
        <Spacer width={16} />
        <TextButton onClick={() => incrementTipIndex(1, true)}>next</TextButton>
      </PrevNextContainer>
      <br />
      <br />
      <TipText>{tips[tipIndex]}</TipText>
    </TipsContainer>
  );
}

export function MakeDarkForestTips(tips: string[]) {
  const shuffledTips = _.shuffle(tips);
  return <DarkForestTips tips={shuffledTips} />;
}

const PrevNextContainer = styled.div`
  float: right;
`;

const TipsContainer = styled.div`
  margin-bottom: 8px;
  background-color: ${dfstyles.colors.backgrounddark};
  width: 400px;
  height: 250px;
  padding: 16px;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid ${dfstyles.colors.border};
`;
