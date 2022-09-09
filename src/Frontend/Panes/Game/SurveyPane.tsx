import { Leaderboard, ModalName } from '@darkforest_eth/types';
import React from 'react';

import { getRank, Rank } from '../../../Backend/Utils/Rank';
import { Btn } from '../../Components/Btn';
import { Link } from '../../Components/CoreUI';
import { Row } from '../../Components/Row';
import { Bronze, Gold, Green, Red, Silver, White } from '../../Components/Text';
import { useArenaLeaderboard, useEloLeaderboard, useUIManager } from '../../Utils/AppHooks';
import { bronzeTime, goldTime, silverTime } from '../../Utils/constants';
import { formatDuration } from '../../Utils/TimeUtils';
import { ModalPane } from '../../Views/Game/ModalPane';

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

function getPlacev2(leaderboard: Leaderboard, time: number) {
  const entries = leaderboard.entries.sort((a, b) => {
    return a.time - b.time;
  });
  let place = 0;
  entries.map((e,i) => {
    if(e.time == time) place = i
  })
  return place + 1;
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
  // const isCompetitive = uiManager.isCompetitive();
  const config = uiManager.contractConstants.CONFIG_HASH;
  const lobbyAddress = uiManager.getContractAddress()
  const { arenaLeaderboard, arenaError } = useArenaLeaderboard(false, config);
  const winners = uiManager.getWinners();
  const losers = uiManager
    .getAllPlayers()
    .filter((player) => !winners.find((address) => address == player.address));

  let arenaStats = undefined;

  const rank = getRank(time);

  arenaStats = (
    <div>
      <Row>
        <Link openInThisTab={true} style={{ width: '100%' }} to={`/play/${lobbyAddress}?create=true`}>
          <Btn size='stretch'>Race again</Btn>
        </Link>
      </Row>
    </div>
  );

  if (uiManager.getSpawnPlanets().length == 1) {
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
              {getPlacev2(arenaLeaderboard, time)} / {arenaLeaderboard.entries.length}
            </White>
          </Row>
        )}
        {arenaStats}
        <div style={{ textAlign: 'center' }}>
          Help us improve Grand Prix by {' '}
          <Link openInThisTab={false} to={'https://forms.gle/coFn68RvPrEKaXcKA'}> giving feedback on this survey</Link>
          {' 😊'}
          
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
  const numSpawnPlanets = uiManager.getSpawnPlanets().length;
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
