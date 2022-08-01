import React from 'react';
import styled from 'styled-components';
import { logOut } from '../../../Backend/Network/AccountManager';
import { Gnosis, Icon, IconType, Twitter } from '../../Components/Icons';
import { WithdrawSilverButton } from '../../Panes/Game/TooltipPanes';

import dfstyles from '../../Styles/dfstyles';
import { useEthConnection, useTwitters } from '../../Utils/AppHooks';
import { truncateAddress } from './PortalUtils';

export function Account() {
  const connection = useEthConnection();
  const address = connection.getAddress();
  const twitters = useTwitters();
  if (!address) return <></>;
  const twitter = twitters[address];
  const truncatedAddress = truncateAddress(address);

  return (
    <PaneContainer>
      <IconContainer>
        {' '}
        <button onClick={logOut}>Logout</button>
      </IconContainer>
      <a
        style={{ display: 'flex', alignItems: 'center' }}
        target='_blank'
        href={`https://blockscout.com/xdai/optimism/address/${address}`}
      >
        <GnoButton>
          <Gnosis width='24px' height='24px' />
        </GnoButton>
      </a>
      {twitter && (
        <a
          style={{ display: 'flex', alignItems: 'center' }}
          target='_blank'
          href={`https://twitter.com/${twitter}`}
        >
          <Twitter width='24px' height='24px' />
        </a>
      )}

      <NamesContainer>{twitter || truncatedAddress}</NamesContainer>
    </PaneContainer>
  );
}

const PaneContainer = styled.div`
  padding: 8px;
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 3px;
  gap: 8px;
  justify-self: flex-end;
`;

const IconContainer = styled.div`
  padding: 2px;
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 2px;
`;

const NamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const GnoButton = styled.button`
  // background-color: ${dfstyles.colors.text};
  border-radius: 30%;
  border-color: ${dfstyles.colors.border};
`;
