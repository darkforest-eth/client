import React from 'react';
import { Account } from '../Account';
import { theme } from '../styleUtils';
import { TabNav } from './TabNav';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useConfigFromHash, useEthConnection } from '../../../Utils/AppHooks';
import { tutorialConfig } from '../../../Utils/constants';
import { MinimalButton } from '../PortalMainView';
import { populate, populateBulk } from '../../../../Backend/Utils/Populate';
import { address } from '@darkforest_eth/serde';
import { Logo } from '../../../Panes/Lobby/LobbiesUtils';
import { loadRegistry } from '../../../../Backend/Network/GraphApi/GrandPrixApi';
import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';

export const PortalHeader = () => {
  const history = useHistory();
  const connection = useEthConnection();
  const playerAddress = connection.getAddress();

  const { lobbyAddress: tutorialLobbyAddress } = useConfigFromHash(tutorialConfig);
  return (
    <Container>
      <TitleContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxHeight: '56px',
            padding: '8px',
            cursor: 'pointer',
          }}
          onClick={() => history.push('/portal/home')}
        >
          <Logo width={56} />
        </div>
        {process.env.NODE_ENV !== 'production' ? (
          <MinimalButton
            onClick={async () => {
              await populateBulk(connection, address(CONTRACT_ADDRESS), 5);
              //await populate(connection, address(CONTRACT_ADDRESS));
            }}
          >
            Populate
          </MinimalButton>
        ) : null}
      </TitleContainer>

      <TabNav
        tabs={[
          {
            label: 'Play',
            to: '/portal/home',
          },
          {
            label: 'History',
            to: `/portal/history/${playerAddress}`,
            wildcard: playerAddress,
          },
          {
            label: 'Create',
            to: '/arena',
          },
          {
            label: 'Community',
            to: `/portal/community`,
          },
          {
            label: 'Learn',
            to: `/play/${tutorialLobbyAddress}?create=true`,
          },
        ]}
      />
      <Account />
    </Container>
  );
};

const Container = styled.header`
  display: grid;
  grid-template-columns: min-content auto max-content;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${theme.spacing.lg};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;
