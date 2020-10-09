import React, { useContext, useState, useEffect } from 'react';
import { SidebarPane } from '../GameWindowComponents/GameWindowComponents';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { EthAddress } from '../../_types/global/GlobalTypes';
import { formatNumber } from '../../utils/Utils';
import { ModalHook, ModalTwitterVerifyIcon } from './ModalPane';
import { TooltipTrigger } from './Tooltip';
import { TooltipName } from '../../utils/WindowManager';
import { calculateRankAndScore } from './LeaderboardPane';
import { AccountContext } from '../GameWindow';

const PlayerInfoWrapper = styled.div`
  width: 100%;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > span {
      display: flex;
      flex-direction: row;
      align-items: center;
      &:first-child {
        color: ${dfstyles.colors.subtext};
      }
    }
  }

  & span.twitter-connect {
    color: ${dfstyles.colors.subtext};
    &: hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export function PlayerInfoPane({ hook: twitterHook }: { hook: ModalHook }) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);
  const account = useContext<EthAddress | null>(AccountContext);

  const [twitter, setTwitter] = useState<string | null>(null);

  const [rank, setRank] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [energy, setEnergy] = useState<number>(0);
  const [silver, setSilver] = useState<number>(0);

  useEffect(() => {
    if (!uiManager || !account) return;

    const updateRankAndScore = () => {
      const players = uiManager.getAllPlayers();
      const planets = uiManager.getAllOwnedPlanets();
      const [myRank, myScore] = calculateRankAndScore(
        players,
        planets,
        account
      );

      setRank(myRank);
      setScore(myScore);

      setEnergy(uiManager.getEnergyOfPlayer(account));
      setSilver(uiManager.getSilverOfPlayer(account));
    };

    const intervalId = setInterval(updateRankAndScore, 60000);
    updateRankAndScore();

    return () => {
      clearInterval(intervalId);
    };
  }, [uiManager, account]);

  // sync account and twitter
  // TODO Make this listen to an event instead
  useEffect(() => {
    if (!uiManager) return;
    const updateTwitter = () => {
      setTwitter(uiManager.getTwitter(null));
    };

    const intervalId = setInterval(updateTwitter, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [uiManager]);

  return (
    <SidebarPane
      title='Player Info'
      headerItems={<ModalTwitterVerifyIcon hook={twitterHook} />}
    >
      <PlayerInfoWrapper>
        <div>
          <TooltipTrigger name={TooltipName.Energy} needsShift>
            <span>Energy</span>
          </TooltipTrigger>
          <span>{formatNumber(energy)}</span>
        </div>
        <div>
          <TooltipTrigger name={TooltipName.Silver} needsShift>
            <span>Silver</span>
          </TooltipTrigger>
          <span>{formatNumber(silver)}</span>
        </div>
        <div>
          <TooltipTrigger name={TooltipName.TwitterHandle} needsShift>
            <span>Handle</span>
          </TooltipTrigger>
          <span>
            {twitter ? (
              <span>@{twitter}</span>
            ) : (
              <span
                onClick={() => twitterHook[1]((b) => !b)}
                className='twitter-connect'
              >
                Connect Twitter
              </span>
            )}
          </span>
        </div>
        <div>
          <TooltipTrigger name={TooltipName.Score} needsShift>
            <span>Score</span>
          </TooltipTrigger>
          <span>{Math.floor(score)}</span>
        </div>
        <div>
          <TooltipTrigger name={TooltipName.Rank} needsShift>
            <span>Rank</span>
          </TooltipTrigger>
          <span>{rank}</span>
        </div>
      </PlayerInfoWrapper>
    </SidebarPane>
  );
}
