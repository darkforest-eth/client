import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { TooltipTrigger } from '../../Panes/Tooltip';
import { useGameover, usePaused, useUIManager } from '../../Utils/AppHooks';

export function Paused() {
  const paused = usePaused();
  const gameover = useGameover();
  const started = useUIManager().gameStarted;

  if (!paused || gameover || !started) {
    return <></>;
  }

  return (
    <PausedContainer>
      <TooltipTrigger
        extraContent={
          <>
            The game is currently paused so that everyone can spawn and then start playing at the
            same time. You can still mine the map, but you can't make any moves.
          </>
        }
        name={TooltipName.Empty}
      >
        PAUSED
      </TooltipTrigger>
    </PausedContainer>
  );
}

const PausedContainer = styled.div`
  font-size: 2em;
  text-align: center;
`;
