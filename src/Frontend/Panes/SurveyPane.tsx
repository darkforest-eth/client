import { Leaderboard, ModalName, Setting } from '@darkforest_eth/types';
import React, { CSSProperties, useEffect, useState } from 'react';
import styled from 'styled-components';
import TutorialManager, {
  TutorialManagerEvent,
  TutorialState,
} from '../../Backend/GameLogic/TutorialManager';
import { getRank, Rank } from '../../Backend/Utils/Rank';
import { Hook } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { Link } from '../Components/CoreUI';
import { Icon, IconType } from '../Components/Icons';
import { Row } from '../Components/Row';
import { Bronze, Gold, Green, Red, Silver, White } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useArenaLeaderboard, useEloLeaderboard, useUIManager } from '../Utils/AppHooks';
import { bronzeTime, goldTime, silverTime } from '../Utils/constants';
import { useBooleanSetting } from '../Utils/SettingsHooks';
import { formatDuration } from '../Utils/TimeUtils';
import { ModalPane } from '../Views/ModalPane';
import { LinkButton } from './Lobbies/LobbiesUtils';

function getPlace(leaderboard: Leaderboard, time: number) {
  const entries = leaderboard.entries;
  entries.sort((a, b) => {
    if (typeof a.score !== 'number' && typeof b.score !== 'number') {
      return 0;
    } else if (typeof a.score !== 'number') {
      return 1;
    } else if (typeof b.score !== 'number') {
      return -1;
    }

    return a.score - b.score;
  });

  const i = 1;
  for (let i = 0; i < entries.length; i++) {
    const score = entries[i].score;
    if (!score) continue;
    if (time < score) return i + 1;
  }
  return entries.length;
}

function getStyledRank(rank: Rank) {
  if (rank === Rank.GOLD) return <Gold>Gold</Gold>;
  if (rank === Rank.SILVER) return <Silver>Silver</Silver>;
  if (rank === Rank.BRONZE) return <Bronze>Bronze</Bronze>;
  return <p>None</p>;
}

function SurveyPaneContent({ numSpawnPlanets }: { numSpawnPlanets: number }) {
  const uiManager = useUIManager();
  const time = uiManager.getGameDuration();
  const isCompetitive = uiManager.getGameManager().isCompetitive();
  const config = uiManager.getGameManager().getContractConstants().CONFIG_HASH;
  // const config = '0x8ea5aaee703231d3893553d7c2d287c2da33e2251811dce40cca2d768b3a7950'
  const { arenaLeaderboard, arenaError } = useArenaLeaderboard(false, config);
  const winners = uiManager.getWinners();
  const losers = uiManager
    .getAllPlayers()
    .filter((player) => !winners.find((address) => address == player.address));

  let arenaStats = undefined;
  if (isCompetitive) {
    const rank = getRank(time);

    arenaStats = (
      <div>
        <Row>
          Gold time: <Gold>{formatDuration(goldTime * 1000)}</Gold>
        </Row>
        <Row>
          Silver time: <Silver>{formatDuration(silverTime * 1000)}</Silver>
        </Row>
        <Row>
          Bronze time: <Bronze>{formatDuration(bronzeTime * 1000)}</Bronze>
        </Row>
        <hr />
        <Row>
          <p>Rank: {getStyledRank(rank)}</p>
        </Row>
        <Row>
          <a style={{ width: '100%' }} target='_blank' href='https://arena.dfdao.xyz/play/'>
            <Btn size='stretch'>Race again</Btn>
          </a>
        </Row>
      </div>
    );
  }

  if (uiManager.getGameManager().getSpawnPlanets.length == 1) {
    return (
      <div>
        <Row>
          <White>Run Statistics</White>
        </Row>
        <Row>
          Time: <Green>{formatDuration(time * 1000)}</Green>
        </Row>
        {arenaLeaderboard && !arenaError && (
          <Row>
            Place:{' '}
            <White>
              {getPlace(arenaLeaderboard, time)}/{arenaLeaderboard.entries.length}
            </White>
          </Row>
        )}
        {arenaStats}
        <div style={{ textAlign: 'center' }}>
          <p>Help us improve Grand Prix by </p>
          <Link to={'https://forms.gle/coFn68RvPrEKaXcKA'}> giving feedback on this survey 😊</Link>
        </div>{' '}
      </div>
    );
  } else {
    return (
      //TODO: Provide data about run
      <div>
        {/* <Row>
        <White>Match Statistics</White>
      </Row>
      <Row>
        Time: <Green>{formatDuration(time * 1000)}</Green>
      </Row>
   */}
        {/* {arenaStats} */}
        <div style={{ textAlign: 'center' }}>
          <p>Help us improve Dark Forest Arena by </p>
          <Link to={'https://forms.gle/coFn68RvPrEKaXcKA'}> giving feedback on this survey 😊</Link>
        </div>{' '}
      </div>
    );
  }
}

export function SurveyPane({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const uiManager = useUIManager();
  const numSpawnPlanets = uiManager.getGameManager().getSpawnPlanets().length;
  if (numSpawnPlanets == 0 || !uiManager.getGameover()) return <></>;
  return (
    <ModalPane
      id={ModalName.Survey}
      title={`Thanks for Playing!`}
      visible={visible}
      hideClose
      onClose={onClose}
    >
      <SurveyPaneContent numSpawnPlanets={numSpawnPlanets} />
    </ModalPane>
  );
}
