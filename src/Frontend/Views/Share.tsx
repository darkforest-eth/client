import { EthConnection } from '@darkforest_eth/network';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Account, getAccounts } from '../../Backend/Network/AccountManager';
import { getEthConnection } from '../../Backend/Network/Blockchain';
import ReaderDataStore from '../../Backend/Storage/ReaderDataStore';
import LandingPageCanvas from '../Renderers/LandingPageCanvas';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { TerminalHandle } from './Terminal';

const ShareWrapper = styled.div`
  width: 100%;
  height: 100%;

  & p {
    margin: 0.5em 0;
    & a {
      color: ${dfstyles.colors.dfblue};
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const OnTop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;

const AddressChooserContainer = styled.div`
  width: 500px;
  background-color: ${dfstyles.colors.text};
  color: black;
  padding: 8px;
  margin: 4px;
`;

const AddressOption = styled.div`
  ${({ selected }: { selected: boolean }) => css`
    background-color: ${dfstyles.colors.text};
    cursor: pointer;
    display: block;
    margin: 3px;
    font-weight: ${selected ? 'bold' : 'unset'};

    &:hover {
      text-decoration: underline;
    }
  `}
`;

export interface ShareProps<T> {
  load: (store: ReaderDataStore) => Promise<T>;
  children: (state: T | undefined, loading: boolean, error: Error | undefined) => ReactNode;
}

/**
 * Helper component that allows you to load data from the contract, as if it was
 * viewed from a particular account. Allows you to switch accounts. Just pass in:
 *
 * 1) a function that loads the data you want, given a [[ReaderDataStore]]
 * 2) a function that renders the given data with React
 *
 * ... and this component will take care of loading what you want.
 */
export function Share<T>(props: ShareProps<T>) {
  const terminalHandle = useRef<TerminalHandle | undefined>();
  const [ethConnection, setEthConnection] = useState<EthConnection | undefined>();
  const knownAccounts = [undefined, ...getAccounts()];
  const [currentAccount, setCurrentAccount] = useState<Account | undefined>(knownAccounts[0]);
  const [store, setStore] = useState<ReaderDataStore | undefined>();
  const [state, setState] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);
  const uiManager = useUIManager();
  const contractAddress = uiManager.getContractAddress();

  const selectAccount = (idx: number) => () => {
    setCurrentAccount(knownAccounts[idx]);
  };

  useEffect(() => {
    getEthConnection()
      .then((ethConnection) => {
        setEthConnection(ethConnection);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (
      terminalHandle.current &&
      !loading &&
      (!store || store?.getViewer() !== currentAccount) &&
      ethConnection
    ) {
      store?.destroy();
      setStore(undefined);
      setLoading(true);

      const config = {
        connection: ethConnection,
        viewer: currentAccount?.address,
        contractAddress,
      };

      ReaderDataStore.create(config).then(async (store) => {
        setStore(store);

        try {
          setState(await props.load(store));
        } catch (e) {
          setError(e);
        }

        setLoading(false);
      });
    }
  }, [store, currentAccount, loading, ethConnection, props, contractAddress]);

  return (
    <ShareWrapper>
      <LandingPageCanvas />
      <OnTop>
        <AddressChooserContainer>
          <p>view as...</p>
          {knownAccounts.map((addr, i) => (
            <AddressOption onClick={selectAccount(i)} key={i} selected={addr === currentAccount}>
              {addr || 'anonymous'}
            </AddressOption>
          ))}
        </AddressChooserContainer>
        {props.children(state, loading, error)}
      </OnTop>
    </ShareWrapper>
  );
}
