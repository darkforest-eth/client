import { Artifact, LocatablePlanet, PlanetType, Upgrade } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { isActivated } from '../../../Backend/GameLogic/ArtifactUtils';
import { Spacer } from '../../Components/CoreUI';
import { ModalHandle } from '../../Views/ModalPane';
import { ArtifactActions } from './ArtifactActions';
import { ArtifactsList } from './ArtifactsList';
import { Find } from './Find';
import { Prospect } from './Prospect';
import { SortBy } from './SortBy';

function anyArtifactMaybeActive(artifacts: Array<Artifact | undefined>) {
  return !!artifacts.find(
    (a) => (a !== undefined && a.unconfirmedActivateArtifact) || isActivated(a)
  );
}

export function ManageArtifactsPane({
  planet,
  artifactsInInventory,
  artifactsOnPlanet,
  currentBlockNumber,
  playerAddress,
  roundOver,
  prospect,
  find,
  activate,
  deactivate,
  deposit,
  withdraw,
  modal,
}: {
  planet: LocatablePlanet;
  artifactsInInventory: Artifact[];
  artifactsOnPlanet: Array<Artifact | undefined>;
  currentBlockNumber: number | undefined;
  playerAddress: string;
  roundOver: boolean;
  prospect: () => void;
  find: () => void;
  activate: (artifact: Artifact) => void;
  deactivate: (artifact: Artifact) => void;
  deposit: (artifact: Artifact) => void;
  withdraw: (artifact: Artifact) => void;
  modal: ModalHandle;
}) {
  const isMyTradingPost =
    planet.owner === playerAddress && planet.planetType === PlanetType.TRADING_POST;
  const [viewingDepositList, setViewingDepositList] = useState(false);
  const [sortBy, setSortBy] = useState<keyof Upgrade | undefined>();
  const anyArtifactActive = anyArtifactMaybeActive(artifactsOnPlanet);

  let action;

  if (planet.planetType === PlanetType.RUINS && planet.owner === playerAddress) {
    if (planet.prospectedBlockNumber === undefined) {
      action = (
        <Prospect
          roundOver={roundOver}
          isProspecting={!!planet.unconfirmedProspectPlanet}
          prospect={prospect}
          planet={planet}
        />
      );
    } else if (!planet.hasTriedFindingArtifact) {
      action = (
        <Find
          roundOver={roundOver}
          isFinding={!!planet.unconfirmedFindArtifact}
          find={find}
          currentBlockNumber={currentBlockNumber}
          planet={planet}
        />
      );
    }
  }

  const artifactActions = useCallback(
    (artifact: Artifact) => (
      <ArtifactActions
        artifact={artifact}
        viewingDepositList={viewingDepositList}
        planetOwnedByPlayer={planet.owner === playerAddress}
        planetIsTradingPost={planet.planetType === PlanetType.TRADING_POST}
        planetLevel={planet.planetLevel}
        anyArtifactActive={anyArtifactActive}
        activate={activate}
        deactivate={deactivate}
        deposit={deposit}
        withdraw={withdraw}
      />
    ),
    [
      viewingDepositList,
      anyArtifactActive,
      planet.planetLevel,
      activate,
      deactivate,
      deposit,
      withdraw,
      planet.owner,
      planet.planetType,
      playerAddress,
    ]
  );

  useEffect(() => {
    setViewingDepositList(false);
  }, [planet.locationId, playerAddress]);

  return (
    <>
      {action && (
        <>
          <Spacer height={8} />
          {action}
          <Spacer height={8} />
        </>
      )}
      <SortBy sortBy={sortBy} setSortBy={setSortBy} />
      <Spacer height={4} />
      <ArtifactsList
        artifacts={viewingDepositList ? artifactsInInventory : artifactsOnPlanet}
        sortBy={sortBy}
        modal={modal}
        actions={artifactActions}
      />
      <Spacer height={4} />
      <SelectArtifactsContainer>
        <SelectArtifactList
          selected={!viewingDepositList}
          onClick={() => {
            setViewingDepositList(false);
            setSortBy(undefined);
          }}
        >
          On This Planet
        </SelectArtifactList>
        {isMyTradingPost && (
          <SelectArtifactList
            selected={viewingDepositList}
            onClick={() => {
              setViewingDepositList(true);
              setSortBy(undefined);
            }}
          >
            Deposit Artifact
          </SelectArtifactList>
        )}
      </SelectArtifactsContainer>
    </>
  );
}

const SelectArtifactsContainer = styled.div`
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
