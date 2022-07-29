import { EthAddress } from '@darkforest_eth/types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { logOut } from '../../../Backend/Network/AccountManager';
import { Dropdown } from '../../Components/Dropdown';
import { TwitterLink } from '../../Components/Labels/Labels';
import { TextPreview } from '../../Components/TextPreview';

import dfstyles from '../../Styles/dfstyles';
import { useEthConnection, useTwitters } from '../../Utils/AppHooks';
import { truncateAddress } from './PortalUtils';

export function AccountDetails({ address }: { address: EthAddress }) {
  const twitters = useTwitters();
  const truncatedAddress = truncateAddress(address);
  return (
    <NamesContainer>
      {twitters[address] ? (
        <>
          <TwitterLink twitter={twitters[address]} />
          <TextPreview text={address} focusedWidth={'200px'} unFocusedWidth={'120px'} />
        </>
      ) : (
        <span>{truncatedAddress}</span>
      )}
    </NamesContainer>
  );
}

export function Account() {
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const connection = useEthConnection();
  const address = connection.getAddress();

  if (!address) return <></>;
  return (
    <div style={{ position: 'relative' }}>
      <PaneContainer onClick={() => setDropdownActive(!dropdownActive)}>
        <AccountDetails address={address} />
      </PaneContainer>
      <Dropdown open={dropdownActive} items={[{ label: 'Log out', action: logOut }]}></Dropdown>
    </div>
  );
}

const PaneContainer = styled.div`
  padding: 8px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  width: 100%;
  border-radius: 3px;
  gap: 8px;
  cursor: pointer;
`;

const NamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
