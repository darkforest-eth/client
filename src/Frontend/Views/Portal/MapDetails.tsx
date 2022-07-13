import { getConfigName } from '@darkforest_eth/procedural';
import { Leaderboard, LiveMatch } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import { loadArenaLeaderboard } from '../../../Backend/Network/ArenaLeaderboardApi';
import { GraphConfigPlayer, loadEloLeaderboard } from '../../../Backend/Network/EloLeaderboardApi';
import { loadLiveMatches } from '../../../Backend/Network/SpyApi';
import { Subber } from '../../Components/Text';
import { LobbyInitializers } from '../../Panes/Lobbies/Reducer';
import { ArenaLeaderboardDisplay, EloLeaderboardDisplay } from '../ArenaLeaderboard';
import { LiveMatches } from '../LiveMatches';
import { TabbedView } from '../TabbedView';
import { ConfigDetails } from './ConfigDetails';
import { FindMatch } from './FindMatch';

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

  const numSpawnPlanets = config?.ADMIN_PLANETS.filter((p) => p.isSpawnPlanet).length ?? 0;
  const hasWhitelist = config?.WHITELIST_ENABLED ?? true;

  useEffect(() => {
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
          .then((board) => {
            setLeaderboardError(undefined);
            setLeaderboard(board);
          })
          .catch((e) => setLeaderboardError(e));
      }
      loadLiveMatches(configHash, numSpawnPlanets > 1)
        .then((matches) => {
          setLiveMatchError(undefined);
          setLiveMatches(matches);
        })
        .catch((e) => {
          console.log(e);
          setLiveMatchError(e);
        });
    }
  }, [configHash]);

  return (
    <TabbedView
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flex: '1 1 50%',
        width: '50%',
        maxWidth: '50%',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}
      startSelected = {numSpawnPlanets >= 2 ? 1 : 0}
      tabTitles={['Leaderboard', numSpawnPlanets > 1 ? 'Join a Match' : 'Live Games', 'Config Details']}
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
            return (
              <FindMatch game={liveMatches} error={liveMatchError} nPlayers={numSpawnPlanets} />
            );
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
  );
}
