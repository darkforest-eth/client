import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalPane, ModalHook, ModalName } from './ModalPane';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { EthAddress, Planet, Player } from '../../_types/global/GlobalTypes';
import { Sub } from '../../components/Text';
import dfstyles from '../../styles/dfstyles';
import { PlanetThumb, PlanetLink } from './PlanetDexPane';
import { getCachedScoreboard } from '../../api/UtilityServerAPI';
import { ServerScoreboard } from '../../_types/darkforest/api/UtilityServerAPITypes';
import { format as formatTime } from 'timeago.js';

const LeaderboardWrapper = styled.div`
  width: 42em;
  min-height: 15em;
  max-height: 24em;
  overflow-y: scroll;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: 30px;

    & > span {
      margin-left: 0.25em;
      display: flex;
      flex-direction: row;
      align-items: center;
      &:last-child {
        margin-left: 0;
      }
      &:nth-child(1) {
        // rank
        width: 3em;
      }
      &:nth-child(2) {
        // playername
        flex-grow: 1;
      }
      &:nth-child(3) {
        // planet icons
        width: 10em;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      &:nth-child(4) {
        width: 4em;
        margin-left: 1em;
      }
    }

    // lmao make this shit a class
    &:not(:first-child) > span:nth-child(3) > span {
      width: 3em;
      cursor: pointer;
      transition: filter 0.2s;
      &:hover {
        filter: brightness(80%);
      }
    }
  }

  & a {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: ${dfstyles.colors.subtext};
    }
  }
`;

type ScoreboardEntry = {
  playerId: EthAddress;
  twitter?: string;
  score: number;
  topPlanets: Planet[];
};

// as [rank, score]
export function calculateRankAndScore(
  scoreboard: ScoreboardEntry[],
  account: EthAddress
): [number, number] {
  for (let i = 0; i < scoreboard.length; i++) {
    if (scoreboard[i].playerId === account) {
      return [i + 1, scoreboard[i].score];
    }
  }

  return [-1, -1];
}

export function getScoreboard(
  uiManager: GameUIManager,
  serverScoreboard: ServerScoreboard
): ScoreboardEntry[] {
  const entries: ScoreboardEntry[] = [];
  const players = uiManager.getAllPlayers();
  const playerMap: Record<string, Player> = {};
  for (const player of players) playerMap[player.address] = player;
  for (const serverEntry of serverScoreboard) {
    const planets: Planet[] = [];
    for (const planetId of serverEntry.top5Planets) {
      const planet = uiManager.getPlanetWithId(planetId);
      if (planet) planets.push(planet);
    }
    const entryToAdd: ScoreboardEntry = {
      playerId: serverEntry.player,
      score: serverEntry.score,
      topPlanets: planets,
    };
    if (
      playerMap[serverEntry.player] &&
      playerMap[serverEntry.player].twitter
    ) {
      entryToAdd.twitter = playerMap[serverEntry.player].twitter;
    }
    entries.push(entryToAdd);
  }
  return entries;
}

export function LeaderboardPane({ hook }: { hook: ModalHook }) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);
  const [scoreboard, setScoreboard] = useState<ScoreboardEntry[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const [account, setAccount] = useState<EthAddress | null>(null);
  useEffect(() => {
    if (!uiManager) return;
    setAccount(uiManager.getAccount());
  }, [uiManager]);

  const [visible] = hook;

  useEffect(() => {
    if (uiManager) {
      getCachedScoreboard().then((res) => {
        setScoreboard(getScoreboard(uiManager, res.scoreboard));
        setLastUpdated(res.timestamp);
      });
    }
  }, [uiManager, visible, account]);

  return (
    <ModalPane hook={hook} title='Leaderboard' name={ModalName.Leaderboard}>
      {lastUpdated ? (
        <div>
          <span></span>
          <span>
            <Sub>{`Last updated: ${formatTime(lastUpdated)}`}</Sub>
          </span>
          <span></span>
        </div>
      ) : null}
      <LeaderboardWrapper>
        <div>
          <span></span>
          <span>
            <Sub>
              <u>Player</u>
            </Sub>
          </span>
          <span>
            <Sub>
              <u>Top Planets</u>
            </Sub>
          </span>
          {/* <span>
            <Sub>
              <u>Score</u>
            </Sub>
          </span> */}
        </div>
        {scoreboard.map((entry, idx) => (
          <div
            key={idx}
            style={{
              background:
                entry.playerId === account
                  ? dfstyles.colors.backgroundlight
                  : undefined,
            }}
          >
            <span>
              <Sub>#{idx + 1}</Sub>
            </span>
            <span>
              {entry.twitter ? (
                <a
                  onClick={() =>
                    window.open(`http://twitter.com/${entry.twitter}`)
                  }
                >
                  @{entry.twitter}
                </a>
              ) : (
                <span>{entry.playerId}</span>
              )}
            </span>
            <span>
              {entry.topPlanets.slice(0, 3).map((planet, i) => (
                <span key={i}>
                  <PlanetLink planet={planet}>
                    <PlanetThumb planet={planet} />
                  </PlanetLink>
                </span>
              ))}
            </span>
            {/* <span>{Math.floor(entry.score)}</span> */}
          </div>
        ))}
      </LeaderboardWrapper>
    </ModalPane>
  );
}
