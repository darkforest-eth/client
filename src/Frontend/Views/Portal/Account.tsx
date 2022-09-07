import { EthAddress } from '@darkforest_eth/types';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { logOut } from '../../../Backend/Network/AccountManager';
import { Copyable } from '../../Components/Copyable';
import { Gnosis, Icon, IconType, Twitter } from '../../Components/Icons';
import { LobbyButton } from '../../Pages/Lobby/LobbyMapEditor';

import { useDisableScroll, useEthConnection, useTwitters } from '../../Utils/AppHooks';
import { addressToColor, truncateAddress } from './PortalUtils';
import { theme } from './styleUtils';

interface AccountModalProps {
  address: EthAddress | undefined;
  twitter: string | undefined;
  balance: string | undefined;
  setOpen: (open: boolean) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ address, twitter, balance, setOpen }) => {
  if (!address) return <></>;

  return (
    <ModalContainer onClick={() => setOpen(false)}>
      <AccountDetails
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <AccountContent>
          <CloseButton
            style={{ position: 'absolute', top: '12px', right: '12px' }}
            onClick={() => setOpen(false)}
          >
            <Icon type={IconType.X} />
          </CloseButton>
          <Avatar width='3rem' height='3rem' color={addressToColor(address)} />
          <div style={{ fontSize: '1.5em' }}>
            {twitter ?? (
              <Copyable textToCopy={address} onCopyError={() => {}}>
                <span>{truncateAddress(address)}</span>
              </Copyable>
            )}
          </div>
          <span style={{ color: theme.colors.fgMuted2 }}>{balance ?? 0} xDAI</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: theme.spacing.lg,
            }}
          >
            <Button
              onClick={() => {
                window.open(`https://blockscout.com/xdai/optimism/address/${address}`, '_blank');
              }}
            >
              <Gnosis width='24px' height='24px' />
              Explorer
            </Button>
            {twitter && (
              <Button
                onClick={() => {
                  window.open(`https://twitter.com/${twitter}`, '_blank');
                }}
              >
                <Twitter width='24px' height='24px' />
                {twitter ? 'Twitter' : 'Connect'}
              </Button>
            )}
          </div>
        </AccountContent>
        <Footer>
          <Button onClick={logOut}>
            <ExitIcon />
            Disconnect
          </Button>
        </Footer>
      </AccountDetails>
    </ModalContainer>
  );
};
export function Account() {
  const [open, setOpen] = useState<boolean>(false);
  const connection = useEthConnection();
  const address = connection.getAddress();
  const balance = connection.getMyBalance();
  const twitters = useTwitters();
  const [blockScroll, allowScroll] = useDisableScroll();

  useEffect(() => {
    if (open) blockScroll();
    else allowScroll();
  }, [open]);

  if (!address) return <></>;
  const twitter = twitters[address];
  const truncatedAddress = truncateAddress(address);

  const formattedBalance = (+formatEther(balance ?? '0')).toFixed(2);

  return (
    <>
      {open && (
        <AccountModal
          setOpen={setOpen}
          address={address}
          twitter={twitter}
          balance={formattedBalance}
        />
      )}
      <AccountButton onClick={() => setOpen(true)}>
        <AvatarSection>
          <Avatar
            width={theme.spacing.lg}
            height={theme.spacing.lg}
            color={addressToColor(address)}
          />
          Account
          <ChevronDown />
        </AvatarSection>
      </AccountButton>
    </>
  );
}

const Avatar = styled.div<{ width: string; height: string; color: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: ${({ color }) => color};
  border-radius: 100%;
  border: 1px solid ${theme.colors.fgMuted};
`;

const ModalContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  animation: bgFadeIn 0.15s ease;
  @keyframes bgFadeIn {
    0% {
      opacity: 0;
    }
    ,
    100% {
      opacity: 1;
    }
  }
`;

const CloseButton = styled.div`
  background: ${theme.colors.bg2};
  padding: ${theme.spacing.sm};
  cursor: pointer;
  border-radius: 100%;
  display: grid;
  place-items: center;
  height: 24px;
  width: 24px;
  transition: background 0.2s ease;
  &:hover {
    background: ${theme.colors.bg3};
  }
`;

const AccountContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const AccountDetails = styled.div`
  width: 400px;
  font-family: ${theme.fonts.mono};
  box-sizing: content-box;
  min-height: 20%;
  background: ${theme.colors.bg1};
  color: ${theme.colors.fgPrimary};
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.lg};
  justify-content: space-between;
  align-items: center;
  border-radius: ${theme.borderRadius};
  position: relative;
  animation: fadeIn 0.15s ease;
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    ,
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const AccountButton = styled.button`
  outline: none;
  font-family: ${theme.fonts.mono};
  padding: ${theme.spacing.sm};
  position: relative;
  display: flex;
  align-items: center;
  background: ${theme.colors.bg1};
  border-radius: ${theme.borderRadius};
  justify-self: flex-end;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  &:hover {
    border: 1px solid ${theme.colors.bg2};
  }
`;

const AvatarSection = styled.div`
  border-radius: ${theme.borderRadius};
  transition: all 0.125s ease;
  color: ${theme.colors.fgPrimary};
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.bg2};
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  &:hover {
    background: ${theme.colors.bg3};
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 12px;
`;

const ChevronDown = () => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};

const ExitIcon = () => {
  return (
    <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};

const Button = styled(LobbyButton)`
  border: none;
  background: ${theme.colors.bg2};
  gap: ${theme.spacing.md};
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${theme.colors.bg3} !important;
  }
`;
