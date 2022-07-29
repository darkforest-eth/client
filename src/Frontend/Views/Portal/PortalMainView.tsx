import { EthAddress, ModalName } from '@darkforest_eth/types';
import { IconType } from '@darkforest_eth/ui';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { loadAccountData } from '../../../Backend/Network/GraphApi/AccountApi';
import { loadRecentMaps } from '../../../Backend/Network/GraphApi/MapsApi';
import { Btn } from '../../Components/Btn';
import Button from '../../Components/Button';
import { Dropdown, DropdownItem } from '../../Components/Dropdown';
import { Icon } from '../../Components/Icons';
import { Modal } from '../../Components/Modal';
import dfstyles from '../../Styles/dfstyles';
import { useTwitters } from '../../Utils/AppHooks';
import { competitiveConfig } from '../../Utils/constants';
import { ModalPane } from '../Game/ModalPane';
import { Account } from './Account';
import { AccountInfoView } from './AccountInfoView';
import { MapInfoView } from './MapInfoView';
import { PortalHomeView } from './PortalHomeView';
import { truncateAddress, truncateString } from './PortalUtils';

export function PortalMainView() {
  const [input, setInput] = useState<string>('');
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [results, setResults] = useState<DropdownItem[]>([]);
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const history = useHistory();
  const twitters = useTwitters() as Object;

  useEffect(() => {
    async function handleSearch() {
      if (input.length > 0) {
        let results: DropdownItem[] = [];
        const lower = input.trim().toLowerCase();
        // check twitters
        const foundTwitter = Object.entries(twitters).find((t) => t[1] == lower);
        if (foundTwitter) {
          results.push({
            label: `Twitter -${foundTwitter[0]}`,
            action: () => history.push(`/portal/account/${foundTwitter[0]}`),
          });
        }
        // check config hashes
        const configHashes = await loadRecentMaps(1, lower, undefined);
        if (configHashes && configHashes.length > 0) {
          results.push({
            label: `Map - ${truncateString(configHashes[0].configHash, 8)}`,
            action: () => history.push(`/portal/map/${configHashes[0].configHash}`),
          });
        }
        // check accounts
        const accounts = await loadAccountData(lower as EthAddress);
        if (accounts) {
          results.push({
            label: `Address - ${truncateAddress(lower as EthAddress)}`,
            action: () => history.push(`/portal/account/${lower}`),
          });
        }
        if (results.length > 0) {
          setResults(results);
        } else {
          setResults([{ label: 'No results found.', action: () => {} }]);
        }
      } else {
        setResults([{ label: 'No results found.', action: () => {} }]);
      }
    }
    handleSearch();
  }, [input]);

  function PortalHelp() {
    if (!helpOpen) return <></>;

    return (
      <Modal title='Help'>
        <HelpWrapper>
          <HelpInner>
            <HelpClose
              onClick={() => {
                setHelpOpen(false);
              }}
            >
              <Icon type={IconType.X} />
            </HelpClose>
            <span>Hello</span>
          </HelpInner>
        </HelpWrapper>
      </Modal>
    );
  }

  return (
    <>
      <PortalHelp />
      <MainContainer>
        <TopBar>
          <TitleContainer>
            <Title onClick={() => history.push('/portal/home')}>Home</Title>
          </TitleContainer>

          <TitleContainer>
            <InputContainer>
              <PortalInput
                placeholder={'Search for a map hash, twitter, or address'}
                // TODO: fix type
                onChange={(e: any) => setInput(e.target.value)}
                onFocus={() => setOpenSearch(true)}
                onBlur={() => setOpenSearch(false)}
              />
              <Dropdown items={results} open={input.length > 0 && openSearch} />
            </InputContainer>
          </TitleContainer>
          <TitleContainer>
            {/* <Button
              onClick={() => {
                setHelpOpen(true);
              }}
            >
              <Icon type={IconType.Help} />
            </Button> */}
            <Account />
          </TitleContainer>
        </TopBar>
        <Switch>
          <Redirect path='/portal/map' to={`/portal/map/${competitiveConfig}`} exact={true} />

          <Route path={'/portal/home'} exact={true} component={PortalHomeView} />
          <Route path={'/portal/map/:configHash'} component={MapInfoView} />
          <Route path={'/portal/account/:account'} component={AccountInfoView} />

          <Route
            path='/portal/*'
            component={() => (
              <TitleContainer style={{ justifyContent: 'center' }}>Page Not Found</TitleContainer>
            )}
          />
        </Switch>
      </MainContainer>
    </>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
`;

const TopBar = styled.div`
  height: 56px;
  max-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1.5em;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MinimalButton = styled.button`
  border-radius: 3px;
  padding: 8px;
  background: #252525;
  color: #fff;
  text-transform: uppercase;
`;

const PortalInput = styled.input`
  min-width: 350px;
  background: #252525;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${dfstyles.colors.borderDarker};
  z-index: 1;
`;

const HelpWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
  height: 100vh;
  width: 100vw;
  z-index: 999;
  display: flex;
`;

const HelpInner = styled.div`
  margin: auto;
  position: relative;
  width: 75%;
  height: 75%;
  // text-align: center;
  display: flex;
  // align-items: center;
  // justify-content: space-around;
  background: ${dfstyles.colors.background};
  border-radius: ${dfstyles.borderRadius};
  border: 1px solid ${dfstyles.colors.borderDark} !important;
  color: ${dfstyles.colors.text};
  padding: 50px;
`;

const HelpClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  background: none;
  border: 0;
`;
