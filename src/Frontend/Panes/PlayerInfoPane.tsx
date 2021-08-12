import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatNumber } from '../../Backend/Utils/Utils';
import { TooltipName } from '../Game/WindowManager';
import dfstyles from '../Styles/dfstyles';
import { useAccount, useUIManager } from '../Utils/AppHooks';
import { ModalHook } from '../Views/ModalPane';
import { TooltipTrigger } from './Tooltip';

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
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export function PlayerInfoPane({ hook: twitterHook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);

  const [twitter, setTwitter] = useState<string | undefined>(undefined);

  const [rank, _setRank] = useState<number>(0);
  const [score, _setScore] = useState<number>(0);

  const [energy, setEnergy] = useState<number>(0);
  const [silver, setSilver] = useState<number>(0);

  useEffect(() => {
    if (!uiManager || !account) return;

    const updateEnergyAndSilver = () => {
      setEnergy(uiManager.getEnergyOfPlayer(account));
      setSilver(uiManager.getSilverOfPlayer(account));
      _setScore(uiManager.getPlayerScore(account) ?? Infinity);
    };

    const energySilverInterval = setInterval(updateEnergyAndSilver, 60 * 1000);
    updateEnergyAndSilver();

    return () => {
      clearInterval(energySilverInterval);
    };
  }, [uiManager, account]);

  // sync account and twitter
  // TODO Make this listen to an event instead
  useEffect(() => {
    if (!uiManager) return;
    const updateTwitter = () => {
      setTwitter(uiManager.getTwitter(undefined));
    };

    const intervalId = setInterval(updateTwitter, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [uiManager]);
  return (
    <>
      <PlayerInfoWrapper>
        <div>
          <TooltipTrigger name={TooltipName.Energy}>
            <span>Energy</span>
          </TooltipTrigger>
          <span>{formatNumber(energy)}</span>
        </div>
        <div>
          <TooltipTrigger name={TooltipName.Silver}>
            <span>Silver</span>
          </TooltipTrigger>
          <span>{formatNumber(silver)}</span>
        </div>
        <div>
          <TooltipTrigger name={TooltipName.TwitterHandle}>
            <span>Handle</span>
          </TooltipTrigger>
          <span>
            {twitter ? (
              <span>@{twitter}</span>
            ) : (
              <span onClick={() => twitterHook[1]((b) => !b)} className='twitter-connect'>
                Connect Twitter
              </span>
            )}
          </span>
        </div>
        <div>
          <TooltipTrigger name={TooltipName.Score}>
            <span>Score</span>
          </TooltipTrigger>
          <span>{score === -1 ? 'n/a' : Math.floor(score)}</span>
        </div>
        <div>
          <TooltipTrigger name={TooltipName.Rank}>
            <span>Rank</span>
          </TooltipTrigger>
          <span>{rank === -1 ? 'unranked' : rank}</span>
        </div>
      </PlayerInfoWrapper>
    </>
  );
}
