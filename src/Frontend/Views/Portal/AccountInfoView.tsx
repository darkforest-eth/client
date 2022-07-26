import { address } from '@darkforest_eth/serde';
import { EthAddress, RawAccount } from '@darkforest_eth/types';
import { isAddress } from 'ethers/lib/utils';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { loadAccountData } from '../../../Backend/Network/AccountApi';
import { TwitterLink } from '../../Components/Labels/Labels';
import { TextPreview } from '../../Components/TextPreview';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { useTwitters } from '../../Utils/AppHooks';
import { ArenaDisplay } from './ArenaDisplay';

export interface uniqueArenas {
  configHash: string;
  timeStarted: number | undefined;
  config: LobbyInitializers | undefined;
  count: number;
}

function PlayerOverview({
  playerAddress,
  playerData,
}: {
  playerAddress: EthAddress | undefined;
  playerData: RawAccount | undefined;
}) {
  const twitters = useTwitters();

  return (
    <OverviewContainer>
      {playerData && playerAddress && (
        <>
          <Title>
            {twitters[playerAddress] ? (
              <TwitterLink twitter={twitters[playerAddress]} />
            ) : (
              <TextPreview text={playerAddress} focusedWidth={'250px'} unFocusedWidth={'250px'} />
            )}
          </Title>
          <TextPreview text={playerAddress} focusedWidth={'200px'} unFocusedWidth={'200px'} />
          <Subber>
            {playerData.matches} Matches {playerData.wins} Wins
          </Subber>
          <ArenaDisplay arenas={playerData.arenaPlayers} />
        </>
      )}
    </OverviewContainer>
  );
}

export function AccountInfoView({ match }: RouteComponentProps<{ account: string }>) {
  const playerAddress = isAddress(match.params.account) ? address(match.params.account) : undefined;
  const [playerData, setPlayerData] = useState<RawAccount | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    if (playerAddress) {
      loadAccountData(playerAddress)
        .then((c) => {
          if (!c) {
            setPlayerData(undefined);
            return;
          }
          setPlayerData(c);
        })
        .catch((e) => {
          setError(true);
          console.log(e);
        });
    } else {
      setPlayerData(undefined);
    }
  }, [playerAddress]);

  return (
    <MapInfoContainer>
      {error ? (
        <>Player Not Found</>
      ) : (
        playerData && (
          <>
            <PlayerOverview playerAddress={playerAddress} playerData={playerData} />
          </>
        )
      )}
    </MapInfoContainer>
  );
}

const MapInfoContainer = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
  padding: 10px;
  overflow-y: scroll;
`;

const OverviewContainer = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
  text-align: center;
  font-size: 3em;
  white-space: nowrap;
  justify-content: center;
`;
const Subber = styled.div`
  font-size: 1.5em;
  text-align: center;
`;
