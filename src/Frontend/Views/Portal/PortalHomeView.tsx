import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TimeUntil } from '../../Components/TimeUntil';
import { competitiveConfig, tutorialConfig } from '../../Utils/constants';
import { OfficialGameBanner } from './Components/OfficialGameBanner';
import { useConfigFromHash } from '../../Utils/AppHooks';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../../../Backend/Network/UtilityServerAPI';

export const PortalHomeView: React.FC<{}> = () => {
  const { data: adminData, error } = useSWR(`${process.env.DFDAO_WEBSERVER_URL}/rounds`, fetcher);
  let finalTime = undefined;
  let roundConfig = undefined;
  let current = undefined;

  if (adminData) {
    console.log(adminData);
    const data = adminData as any[];
    const sortedData: any[] = data.sort((a, b) => a.startTime - b.endTime);

    const now = Date.now();
    for (const round of sortedData) {
      // if we get here, there is no current round.
      if (round.startTime > now) {
        finalTime = round.startTime;
        break;
      }
      // set the round config up to the current round
      roundConfig = round.configHash;

      if (round.startTime < now && round.endTime > now) {
        finalTime = round.endTime;
        current = true;
        break;
      }
    }
  }

  const title = !roundConfig
    ? 'No rounds stored'
    : current
    ? 'Race the Grand Prix'
    : "Practice Last Week's Grand Prix";
  const description = !finalTime ? (
    <>No round scheduled</>
  ) : current ? (
    <>
      This round ends in <TimeUntil timestamp={finalTime} ifPassed='zero seconds!' />
    </>
  ) : (
    <>
      Next round starts in <TimeUntil timestamp={finalTime} ifPassed='zero seconds!' />
    </>
  );
  const link = `/portal/map/${roundConfig}`;

  const { lobbyAddress: tutorialLobbyAddress } = useConfigFromHash(tutorialConfig);
  return (
    <Container>
      <Content>
        <span style={{ fontSize: '3em', gridColumn: '1/7' }}>Welcome to Dark Forest Arena!</span>
        <OfficialGameBanner
          title={title}
          description={description}
          style={{ gridColumn: '1 / 5', gridRow: '2/4' }}
          link={link}
          disabled={!roundConfig}
          imageUrl='/public/img/screenshots/deathstar.png'
        />
        <OfficialGameBanner
          title='Previous Rounds'
          style={{ gridColumn: '5 / 7', gridRow: '2/3' }}
          link='/portal/history'
          imageUrl='/public/img/screenshots/pickles.png'
        />
        <OfficialGameBanner
          title='Find a match'
          style={{ gridColumn: '5 / 7', gridRow: '3/4' }}
          link='/portal/matchmaking'
          imageUrl='/public/img/screenshots/purple.png'
        />
        <OfficialGameBanner
          title='Tutorial (IP)'
          description='Learn to play'
          style={{ gridColumn: '1 / 3', gridRow: '4/5' }}
          link={`/play/${tutorialLobbyAddress}?create=true`}
          imageUrl='/public/img/screenshots/tutorial-banner.png'
          contain
        />
        <OfficialGameBanner
          title='Create a map'
          style={{ gridColumn: '5 / 7', gridRow: '4/5' }}
          link={`/arena`}
          imageUrl='/public/img/screenshots/wholeworld.png'
          contain
        />
        <OfficialGameBanner
          title='Community Maps'
          style={{ gridColumn: '3 / 5', gridRow: '4/5' }}
          link={`/portal/community`}
          imageUrl='/public/img/screenshots/bluespace.png'
        />
      </Content>
    </Container>
  );
};
const Content = styled.div`
  display: grid;
  height: 100%;
  overflow: hidden;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px repeat(2, calc(30% - 40px)) calc(40% - 40px);
  grid-gap: 16px;
  padding: 24px;
  height: 100%;
  width: 70%;
`;
const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  height: calc(100vh - 56px);
`;

// TODO: Replace this with LobbyButton when #68 is merged
export const ArenaPortalButton = styled.button<{ secondary?: boolean }>`
  padding: 8px 16px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: ${({ secondary }) => (!secondary ? '2px solid #2EE7BA' : '1px solid #5F5F5F')};
  color: ${({ secondary }) => (!secondary ? '#2EE7BA' : '#fff')};
  background: ${({ secondary }) => (!secondary ? '#09352B' : '#252525')};
  padding: 16px;
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 80ms ease 0s, border-color;
  &:hover {
    background: ${({ secondary }) => (!secondary ? '#0E5141' : '#3D3D3D')};
    border-color: ${({ secondary }) => (!secondary ? '#30FFCD' : '#797979')};
  }
`;

const MoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 10px;
  margin-top: 16px;
`;

const MoreMapsContainer = styled.div`
  overflow-y: auto;
`;
