import { EthConnection } from '@darkforest_eth/network';
import { EthAddress } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Account, getActive, logOut } from '../../Backend/Network/AccountManager';
import { getEthConnection } from '../../Backend/Network/Blockchain';
import { getAllTwitters } from '../../Backend/Network/UtilityServerAPI';
import { AddressTwitterMap } from '../../_types/darkforest/api/UtilityServerAPITypes';
import { InitRenderState, Wrapper } from '../Components/GameLandingPageComponents';
import { HideSmall } from '../Components/Text';
import { TwitterProvider } from '../Utils/AppHooks';
import { PortalMainView } from '../Views/Portal/PortalMainView';
import { PortalSidebarView } from '../Views/Portal/PortalSidebarView';
import { BackgroundImage } from './LandingPage';
import LoadingPage from './LoadingPage';
import { PortalLandingPage, sendDrip } from './PortalLandingPage';

export function PortalPage() {
  const [connection, setConnection] = useState<EthConnection | undefined>();
  const [account, setAccount] = useState<Account | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getConnection() {
      try {
        const connection = await getEthConnection();
        setConnection(connection);
      } catch (e) {
        alert('error connecting to blockchain');
        console.log(e);
      }
    }

    getConnection();
  }, []);


  useEffect(() => {
    async function setPlayer(ethConnection : EthConnection) {
      const active = getActive();
      try {
        if (!!active) {
          await sendDrip(ethConnection, active.address);
          await ethConnection.setAccount(active.privateKey);
          setAccount(active);
          onReady(ethConnection);
          return;
        }
      } catch (e) {
        alert('Unable to connect to active account. Please login into another.');
        logOut();        
      } finally {
        setLoading(false);
      }
    }
    if(connection) {
      setPlayer(connection);
    }
  }, [connection]);


  const onReady = useCallback(
    (connect: EthConnection) => {
      const address = connect.getAddress();
      const privateKey = connect.getPrivateKey();
      if(!address || !privateKey) throw new Error('account not found');
      setAccount({address, privateKey});
    },
    [setConnection]
  );

  if(!connection || loading) return <LoadingPage/>
  if (connection && account) {
    return <Portal playerAddress={account.address} />;
  }
  
  return (
    <Wrapper initRender={InitRenderState.NONE} terminalEnabled={false}>
      <PortalLandingPage onReady={onReady} connection = {connection}/>
    </Wrapper>
  );
}

function Portal({ playerAddress }: { playerAddress: EthAddress }) {
  const [twitters, setTwitters] = useState<AddressTwitterMap | undefined>();

  useEffect(() => {
    getAllTwitters().then((t) => setTwitters(t));
  }, []);
  return (
    <>
      {twitters ? (
        <TwitterProvider value={twitters}>
          {/* <Background /> */}
          <PortalContainer>
            <HideSmall>
              <PortalSidebarView playerAddress={playerAddress} />
            </HideSmall>
            <PortalMainView playerAddress={playerAddress} />
          </PortalContainer>
        </TwitterProvider>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

const PortalContainer = styled.div`
  vertical-align: baseline;
  display: flex;
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
`;

const Background = styled(BackgroundImage)`
  background: #111;
`;
