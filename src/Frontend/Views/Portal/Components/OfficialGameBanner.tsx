import { getConfigName } from '@darkforest_eth/procedural';
import { EthAddress, Leaderboard } from '@darkforest_eth/types';
import dfstyles from '@darkforest_eth/ui/dist/styles';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  GraphConfigPlayer,
  loadEloLeaderboard,
} from '../../../../Backend/Network/GraphApi/EloLeaderboardApi';
import { loadRecentMaps } from '../../../../Backend/Network/GraphApi/MapsApi';

export const OfficialGameBanner: React.FC<{
  configHash: string;
}> = ({ configHash }) => {
  const [leaderboardError, setLeaderboardError] = useState<Error | undefined>();
  const [eloLeaderboard, setEloLeaderboard] = useState<GraphConfigPlayer[] | undefined>();
  const [lobbyAddress, setLobbyAddress] = useState<EthAddress | undefined>();

  const history = useHistory();

  useEffect(() => {
    setEloLeaderboard(undefined);
    loadEloLeaderboard(configHash)
      .then((board) => {
        setLeaderboardError(undefined);
        setEloLeaderboard(board);
      })
      .catch((e) => setLeaderboardError(e));
    loadRecentMaps(1, configHash).then((maps) => {
      setLobbyAddress(maps && maps.length > 0 ? maps[0].lobbyAddress : undefined);
    });
  }, [configHash]);

  return (
    <>
      {lobbyAddress && (
        <Banner onClick = {() => {history.push(`/portal/map/${configHash}`)}}>
          <PrettyOverlayGradient src={'/public/img/deathstar.png'} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <BannerTitle>Play Galactic League</BannerTitle>
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                style={{ minWidth: '250px' }}
                target='blank'
                to={`/play/${lobbyAddress}?create=true`}
              >
                <ArenaPortalButton>Create Game</ArenaPortalButton>
              </Link>
              <Link to={`/portal/map/${configHash}`}>
                <ArenaPortalButton secondary>Join Game</ArenaPortalButton>
              </Link>
            </div> */}
          </div>
          {/* {eloLeaderboard && (
            <div
              style={{
                textAlign: 'center',
                borderLeft: `solid 1px ${dfstyles.colors.subbertext}`,
                height: '100%',
                padding: '20px 0px',
              }}
            >
              Top Players
              <EloLeaderboardDisplay
                leaderboard={eloLeaderboard}
                error={leaderboardError}
                totalPlayers={false}
              />
            </div>
          )} */}
        </Banner>
      )}
    </>
  );
};

const Banner = styled.button`
position: relative;
  width: 100%:
  height: 100%;
  background: #000;
  color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 6px;
  min-height: 270px;
  max-height: 25vh;
  overflow: hidden;
  width: min(1000px, calc(70% + 100px));
  margin: 10px;
  align-self: center;
  gap: 10px;
  flex-direction: column;
  border: solid 1px ${dfstyles.colors.border};

`;

const BannerTitle = styled.span`
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  position: absolute;
  bottom: 0;
  background: black;
  border-radius: 0px 20px 0px 0px;
  padding: 20px;
  color: ${dfstyles.colors.text}
  font-weight: 700;

`;

const PrettyOverlayGradient = styled.img`
  width: 100%;
  height: 100%;
  display: inline-block;
  object-fit: cover;
  border-radius: 20px;
  filter: brightness(0.8) blur(2px);
`;
