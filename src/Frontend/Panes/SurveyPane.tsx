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
import { useCompetitiveLeaderboard, useUIManager } from '../Utils/AppHooks';
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

function SurveyPaneContent() {
  const uiManager = useUIManager();
  const time = uiManager.getGameDuration();
  const isCompetitive = uiManager.getGameManager().isCompetitive();
  const config = uiManager.getGameManager().getContractConstants().CONFIG_HASH;
  // const config = '0x8ea5aaee703231d3893553d7c2d287c2da33e2251811dce40cca2d768b3a7950'
  const { competitiveLeaderboard, competitiveError } = useCompetitiveLeaderboard(false, config);

  let competitiveStats = undefined;
  if (isCompetitive) {
    const rank = getRank(time);

    competitiveStats = (
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

  if (!uiManager.getGameover()) return <></>;
  return (
    <div>
      <Row>
        <White>Run Statistics</White>
      </Row>
      <Row>
        Time: <Green>{formatDuration(time * 1000)}</Green>
      </Row>
      {competitiveLeaderboard && !competitiveError && (
        <Row>
          Place:{' '}
          <White>
            {getPlace(competitiveLeaderboard, time)}/{competitiveLeaderboard.entries.length}
          </White>
        </Row>
      )}
      {competitiveStats}
      <div style={{ textAlign: 'center' }}>
        <p>Help us improve Grand Prix by </p>
        <Link to={'https://forms.gle/coFn68RvPrEKaXcKA'}>
          {' '}
          giving feedback on this survey 😊
        </Link>
      </div>{' '}
    </div>
  );
}

const StyledSurveyPane = styled.div`
  display: block;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;

  background: ${dfstyles.colors.backgroundlighter};
  color: ${dfstyles.colors.text};
  padding: 8px;
  border-bottom: 1px solid ${dfstyles.colors.border};
  border-right: 1px solid ${dfstyles.colors.border};

  width: 24em;
  height: fit-content;

  z-index: 10;

  & .tutintro {
    & > div:last-child {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 1em;
    }
  }

  & .tutzoom,
  & .tutalmost {
    & > div:last-child {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 1em;
    }
  }
`;

export function SurveyPane({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const uiManager = useUIManager();
  return (
    <ModalPane
      id={ModalName.Survey}
      title={`Thanks for Playing!`}
      visible={visible}
      hideClose
      onClose={onClose}
    >
      <SurveyPaneContent />
    </ModalPane>
  );
}
