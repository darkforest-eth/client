import { GraphConfigPlayer, Leaderboard, LiveMatch } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import { loadEloLeaderboard } from '../../../Backend/Network/GraphApi/EloLeaderboardApi';
import { Subber } from '../../Components/Text';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { ArenaLeaderboardDisplay, EloLeaderboardDisplay } from '../Leaderboards/ArenaLeaderboard';
import { LiveMatches } from '../Leaderboards/LiveMatches';
import { TabbedView } from '../TabbedView';
import { ConfigDetails } from './ConfigDetails';
import { FindMatch } from './FindMatch';
import { useLiveMatches, useSeasonPlayers, useTwitters } from '../../Utils/AppHooks';
import { loadGrandPrixLeaderboard } from '../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import { DUMMY } from '../../Utils/constants';

export function MapDetails({
  configHash,
  config,
}: {
  configHash: string;
  config: LobbyInitializers;
}) {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | undefined>();
  const [eloLeaderboard, setEloLeaderboard] = useState<GraphConfigPlayer[] | undefined>();
  const [leaderboardError, setLeaderboardError] = useState<Error | undefined>();
  const [liveMatchError, setLiveMatchError] = useState<Error | undefined>();

  const numSpawnPlanets = config?.ADMIN_PLANETS.filter((p) => p.isSpawnPlanet).length ?? 0;
  const hasWhitelist = config?.WHITELIST_ENABLED ?? true;
  const twitters = useTwitters();
  const allPlayers = useSeasonPlayers();
  const leaders = loadGrandPrixLeaderboard(allPlayers, configHash, twitters);

  // 5sec poll if live data
  const { liveMatches, spyError } = useLiveMatches(configHash, !DUMMY ? 5000 : undefined);
  useEffect(() => {
    setLeaderboard(undefined);
    if (configHash) {
      setLeaderboard(leaders);
      // if (numSpawnPlanets > 1) {
      //   loadEloLeaderboard(configHash, numSpawnPlanets > 1)
      //     .then((board) => {
      //       setLeaderboardError(undefined);
      //       setEloLeaderboard(board);
      //     })
      //     .catch((e) => setLeaderboardError(e));
      // } else {
      //   setLeaderboard(leaders);
      // }
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
          'History',
          // 'Config Details',
        ]}
        tabContents={(i) => {
          if (i === 0) {
            return <ArenaLeaderboardDisplay leaderboard={leaderboard} error={leaderboardError} />
          }
          if (i === 1) {
            return (
              <>
                <LiveMatches game={liveMatches} error={liveMatchError} />{' '}
                <Subber style={{ textAlign: 'end' }}>
                  by <a href={'https://twitter.com/bulmenisaurus'}>Bulmenisaurus</a>
                </Subber>
              </>
            );
          }
        }}
      />
    </div>
  );
}
