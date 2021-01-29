import React, { ReactNode, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import EthConnection from '../../api/EthConnection';
import ReaderDataStore from '../../api/ReaderDataStore';
import dfstyles from '../../styles/dfstyles';
import { CheckedTypeUtils } from '../../utils/CheckedTypeUtils';
import { EthAddress } from '../../_types/global/GlobalTypes';
import LandingPageCanvas from '../LandingPageCanvas';

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
  background-color: white;
  color: black;
  padding: 8px;
  margin: 4px;
`;

const AddressOption = styled.div`
  ${({ selected }: { selected: boolean }) => css`
    background-color: white;
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
  children: (
    state: T | undefined,
    loading: boolean,
    error: Error | undefined
  ) => ReactNode;
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
  const [ethConnection, _setEthConnection] = useState(new EthConnection());
  const knownAddrs = [undefined, ...ethConnection.getKnownAccounts()];
  const [currentAccount, setCurrentAccount] = useState<EthAddress | undefined>(
    knownAddrs[0]
  );
  const [store, setStore] = useState<ReaderDataStore | undefined>();
  const [state, setState] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  const selectAccount = (addr: string | undefined) => () => {
    if (!addr) {
      setCurrentAccount(undefined);
    } else {
      setCurrentAccount(CheckedTypeUtils.address(addr));
    }
  };

  useEffect(() => {
    if (!loading && (!store || store?.getViewer() !== currentAccount)) {
      store?.destroy();
      setStore(undefined);
      setLoading(true);

      ReaderDataStore.create(ethConnection, currentAccount).then(
        async (store) => {
          setStore(store);

          try {
            setState(await props.load(store));
          } catch (e) {
            setError(e);
          }

          setLoading(false);
        }
      );
    }
  }, [store, currentAccount, loading, ethConnection, props]);

  return (
    <ShareWrapper>
      <LandingPageCanvas />
      <OnTop>
        <AddressChooserContainer>
          <p>view as...</p>
          {knownAddrs.map((addr, i) => (
            <AddressOption
              onClick={selectAccount(addr)}
              key={i}
              selected={addr === currentAccount}
            >
              {addr || 'anonymous'}
            </AddressOption>
          ))}
        </AddressChooserContainer>
        {props.children(state, loading, error)}
      </OnTop>
    </ShareWrapper>
  );
}
