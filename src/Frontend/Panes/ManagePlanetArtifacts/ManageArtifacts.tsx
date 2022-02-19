import { Artifact, LocatablePlanet, PlanetType } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Spacer } from '../../Components/CoreUI';
import { ModalHandle } from '../../Views/ModalPane';
import { AllArtifacts } from '../ArtifactsList';

export function ManageArtifactsPane({
  planet,
  artifactsInWallet,
  artifactsOnPlanet,
  playerAddress,
  modal,
}: {
  planet: LocatablePlanet;
  artifactsInWallet: Artifact[];
  artifactsOnPlanet: Array<Artifact | undefined>;
  playerAddress: string;
  modal: ModalHandle;
}) {
  const isMyTradingPost =
    planet.owner === playerAddress &&
    planet.planetType === PlanetType.TRADING_POST &&
    !planet.destroyed;
  const [viewingDepositList, setViewingDepositList] = useState(false);

  let action;

  useEffect(() => {
    setViewingDepositList(false);
  }, [planet.locationId, playerAddress]);

  return (
    <>
      <AllArtifacts
        maxRarity={viewingDepositList ? planet.planetLevel - 1 : undefined}
        depositOn={viewingDepositList ? planet.locationId : undefined}
        artifacts={
          (viewingDepositList ? artifactsInWallet : artifactsOnPlanet).filter(
            (a) => !!a
          ) as Artifact[]
        }
        modal={modal}
        noArtifactsMessage={
          <>
            No Artifacts <br /> On This Planet
          </>
        }
        noShipsMessage={
          <>
            No Ships <br /> On This Planet
          </>
        }
      />
      {action && (
        <>
          <Spacer height={8} />
          {action}
          <Spacer height={8} />
        </>
      )}

      <Spacer height={4} />

      {isMyTradingPost && (
        <SelectArtifactsContainer>
          <SelectArtifactList
            selected={!viewingDepositList}
            onClick={() => {
              setViewingDepositList(false);
            }}
          >
            On This Planet
          </SelectArtifactList>
          <SelectArtifactList
            selected={viewingDepositList}
            onClick={() => {
              setViewingDepositList(true);
            }}
          >
            Deposit Artifact
          </SelectArtifactList>
        </SelectArtifactsContainer>
      )}
    </>
  );
}

const SelectArtifactsContainer = styled.div`
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const SelectArtifactList = styled.span`
  ${({ selected }: { selected?: boolean }) => css`
    ${selected && 'text-decoration: underline;'}
    cursor: pointer;
  `}
`;
