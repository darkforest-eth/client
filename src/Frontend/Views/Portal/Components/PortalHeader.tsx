import React, { useEffect, useState } from 'react';
import { Account } from '../Account';
import { theme } from '../styleUtils';
import { TabNav } from './TabNav';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useConfigFromHash, useDisableScroll, useEthConnection } from '../../../Utils/AppHooks';
import { tutorialConfig } from '../../../Utils/constants';
import { MinimalButton } from '../PortalMainView';
import { populate, populateBulk } from '../../../../Backend/Utils/Populate';
import { address } from '@darkforest_eth/serde';
import { Logo } from '../../../Panes/Lobby/LobbiesUtils';
import { loadRegistry } from '../../../../Backend/Network/GraphApi/GrandPrixApi';
import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { PortalModal } from './PortalModal';
import { PortalHelpCenter } from '../PortalHelpCenter';

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
            dropdown: [
              {
                label: 'Tutorial',
                to: `/play/${tutorialLobbyAddress}?create=true`,
                secondary: 'Play a guided tutorial game.',
              },
              {
                label: 'Strategy Guide',
                to: 'https://www.notion.so/cha0sg0d/Dark-Forest-Player-Guide-59e123fb6cbb43f785d24be035cf95cb',
                secondary: 'Learn strategies for playing Dark Forest.',
              },
            ],
            to: '',
          },
        ]}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.lg,
        }}
      >
        <PortalHelpCenter />
        <Account />
      </div>
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
