import { getConfigName } from '@darkforest_eth/procedural';
import { Leaderboard, LiveMatch } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import { loadArenaLeaderboard } from '../../../Backend/Network/GraphApi/ArenaLeaderboardApi';
import {
  GraphConfigPlayer,
  loadEloLeaderboard,
} from '../../../Backend/Network/GraphApi/EloLeaderboardApi';
import { loadLiveMatches } from '../../../Backend/Network/GraphApi/SpyApi';
import { Subber } from '../../Components/Text';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { ArenaLeaderboardDisplay, EloLeaderboardDisplay } from '../Leaderboards/ArenaLeaderboard';
import { LiveMatches } from '../Leaderboards/LiveMatches';
import { TabbedView } from '../TabbedView';
import { ConfigDetails } from './ConfigDetails';
import { FindMatch } from './FindMatch';

export const getRoundID = async (configHash: string): Promise<number> => {
  const searchParams = new URLSearchParams({
    configHash: configHash,
  });
  const selectedRoundID = await fetch(`http://localhost:3000/rounds?${searchParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const fetchedText = await selectedRoundID.text();
  const fetchedId = JSON.parse(fetchedText).body[0].id;
  return fetchedId;
};

export function MapDetails({
  configHash,
  config,
}: {
  configHash: string | undefined;
  config: LobbyInitializers | undefined;
}) {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | undefined>();
  const [eloLeaderboard, setEloLeaderboard] = useState<GraphConfigPlayer[] | undefined>();
  const [leaderboardError, setLeaderboardError] = useState<Error | undefined>();
  const [liveMatches, setLiveMatches] = useState<LiveMatch | undefined>();
  const [liveMatchError, setLiveMatchError] = useState<Error | undefined>();
  const [description, setDescription] = useState<string>('');

  const numSpawnPlanets = config?.ADMIN_PLANETS.filter((p) => p.isSpawnPlanet).length ?? 0;
  const hasWhitelist = config?.WHITELIST_ENABLED ?? true;

  useEffect(() => {
    async function getConfigDescription(configHash: string) {
      const roundId = await getRoundID(configHash);
      const res = await fetch(`http://localhost:3000/rounds/${roundId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const text = await res.text();
      return JSON.parse(text).body.description;
    }

    setLeaderboard(undefined);
    setLiveMatches(undefined);
    if (configHash) {
      if (numSpawnPlanets > 1) {
        loadEloLeaderboard(configHash, numSpawnPlanets > 1)
          .then((board) => {
            setLeaderboardError(undefined);
            setEloLeaderboard(board);
          })
          .catch((e) => setLeaderboardError(e));
      } else {
        loadArenaLeaderboard(configHash, numSpawnPlanets > 1 ? true : false)
          .then((board: Leaderboard) => {
            setLeaderboardError(undefined);
            setLeaderboard(board);
          })
          .catch((e) => setLeaderboardError(e));
      }
      loadLiveMatches(configHash)
        .then((matches) => {
          setLiveMatchError(undefined);
          setLiveMatches(matches);
        })
        .catch((e) => {
          console.log(e);
          setLiveMatchError(e);
        });
      getConfigDescription(configHash).then((x) => {
        if (x) {
          setDescription(x);
        }
      });
    }
  }, [configHash]);

  return (
    <div
      style={{
        display: 'flex',
        flexShrink: 1,
        flexDirection: 'column',
        height: '100%',
        flex: '1 1 50%',
        width: '50%',
        maxWidth: '50%',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      {description.length > 0 && (
        <div
          style={{
            margin: '2rem auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#fff' }}>Description</span>
          <span
            style={{
              maxWidth: '66%',
              margin: '0 auto',
              textAlign: 'center',
              opacity: '70%',
            }}
          >
            {description}
          </span>
        </div>
      )}
      <TabbedView
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          // flex: '1 1 50%',
          width: '100%',
          maxHeight: '100vh',
          overflowY: 'auto',
        }}
        startSelected={numSpawnPlanets >= 2 ? 1 : 0}
        tabTitles={[
          'Leaderboard',
          numSpawnPlanets > 1 ? 'Join a Match' : 'Live Games',
          'Config Details',
        ]}
        tabContents={(i) => {
          if (i === 0) {
            return numSpawnPlanets > 1 ? (
              <EloLeaderboardDisplay leaderboard={eloLeaderboard} error={leaderboardError} />
            ) : (
              <ArenaLeaderboardDisplay leaderboard={leaderboard} error={leaderboardError} />
            );
          }
          if (i === 1) {
            if (numSpawnPlanets > 1 && !hasWhitelist) {
              return <FindMatch game={liveMatches} />;
            } else {
              return (
                <>
                  <LiveMatches game={liveMatches} error={liveMatchError} />{' '}
                  <Subber style={{ textAlign: 'end' }}>
                    by <a href={'https://twitter.com/bulmenisaurus'}>Bulmenisaurus</a>
                  </Subber>
                </>
              );
            }
          }
          return <ConfigDetails config={config} />;
        }}
      />
    </div>
  );
}
