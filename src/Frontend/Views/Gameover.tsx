import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { AccountLabel } from '../Components/Labels/Labels';
import { Gold } from '../Components/Text';
import { TooltipTrigger } from '../Panes/Tooltip';
import { useGameover, useUIManager } from '../Utils/AppHooks';

function prettyTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const hString = h ? `${h} Hour${h !== 1 ? 's' : ''} ` : '';
  const m = Math.floor((seconds % 3600) / 60);
  const mString = m ? `${m} Minute${m !== 1 ? 's' : ''} ` : '';
  const s = Math.floor(seconds % 60);
  const sString = s ? `${s} Second${s !== 1 ? 's' : ''} ` : '';
  return hString.concat(mString).concat(sString);
}
export function Gameover() {
  const uiManager = useUIManager();
  const winners = uiManager.getWinners();
  const gameDuration = uiManager.getGameDuration();
  const gameover = useGameover();
  if (!gameover || winners.length == 0) {
    return <></>;
  }

  let winnerslabel = (
    <>
      {winners.map((winner, idx) => (
        <AccountLabel
          key={idx}
          includeAddressIfHasTwitter={true}
          ethAddress={winner}
        />
      ))}
    </>
  );

  return (
    <>
      <GameoverContainer>
        <TooltipTrigger
          extraContent={
            <>
              GAMEOVER! The winner{winners.length > 1 ? 's are' : ' is '} {winnerslabel}
            </>
          }
          name={TooltipName.Empty}
        >
          <Gold>GAMEOVER!</Gold>
          <br />
          The winner{winners.length > 1 ? 's are' : ' is '}
          {winnerslabel}
        </TooltipTrigger>
      </GameoverContainer>
      <TimeContainer>Game length: {prettyTime(gameDuration)}</TimeContainer>
    </>
  );
}

const GameoverContainer = styled.div`
  font-size: 2em;
  text-align: center;
`;
const TimeContainer = styled.div`
  font-size: 1em;
  text-align: center;
`;
