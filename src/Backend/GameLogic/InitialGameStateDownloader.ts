import { weiToEth } from '@darkforest_eth/network';
import {
  Artifact,
  ArtifactId,
  ClaimedCoords,
  LocationId,
  Planet,
  Player,
  QueuedArrival,
  RevealedCoords,
  VoyageId,
} from '@darkforest_eth/types';
import _ from 'lodash';
import React from 'react';
import { LoadingBarHandle } from '../../Frontend/Components/TextLoadingBar';
import { MakeDarkForestTips } from '../../Frontend/Views/DarkForestTips';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import { ContractConstants } from '../../_types/darkforest/api/ContractsAPITypes';
import { AddressTwitterMap } from '../../_types/darkforest/api/UtilityServerAPITypes';
import { tryGetAllTwitters } from '../Network/UtilityServerAPI';
import PersistentChunkStore from '../Storage/PersistentChunkStore';
import { ContractsAPI } from './ContractsAPI';

export interface InitialGameState {
  contractConstants: ContractConstants;
  players: Map<string, Player>;
  worldRadius: number;
  gptCreditPriceEther: number;
  myGPTCredits: number;
  allTouchedPlanetIds: LocationId[];
  allRevealedCoords: RevealedCoords[];
  allClaimedCoords: ClaimedCoords[];
  pendingMoves: QueuedArrival[];
  touchedAndLocatedPlanets: Map<LocationId, Planet>;
  artifactsOnVoyages: Artifact[];
  myArtifacts: Artifact[];
  heldArtifacts: Artifact[][];
  loadedPlanets: LocationId[];
  balance: number;
  revealedCoordsMap: Map<LocationId, RevealedCoords>;
  claimedCoordsMap: Map<LocationId, ClaimedCoords>;
  planetVoyageIdMap: Map<LocationId, VoyageId[]>;
  arrivals: Map<VoyageId, QueuedArrival>;
  twitters: AddressTwitterMap;
}

export class InitialGameStateDownloader {
  private terminal: TerminalHandle;

  public constructor(terminal: TerminalHandle) {
    this.terminal = terminal;
  }

  private makeProgressListener(prettyEntityName: string) {
    const ref = React.createRef<LoadingBarHandle>();
    this.terminal.printLoadingBar(prettyEntityName, ref);
    this.terminal.newline();

    return (percent: number) => {
      ref.current?.setFractionCompleted(percent);
    };
  }

  async download(
    contractsAPI: ContractsAPI,
    persistentChunkStore: PersistentChunkStore
  ): Promise<InitialGameState> {
    const storedTouchedPlanetIds = await persistentChunkStore.getSavedTouchedPlanetIds();
    const storedRevealedCoords = await persistentChunkStore.getSavedRevealedCoords();
    const storedClaimedCoords = await persistentChunkStore.getSavedClaimedCoords();

    this.terminal.printElement(MakeDarkForestTips());
    this.terminal.newline();

    const planetIdsLoadingBar = this.makeProgressListener('Planet IDs');
    const playersLoadingBar = this.makeProgressListener('Players');
    const revealedPlanetsLoadingBar = this.makeProgressListener('Revealed Planet IDs');
    const revealedPlanetsCoordsLoadingBar = this.makeProgressListener(
      'Revealed Planet Coordinates'
    );
    const claimedPlanetsLoadingBar = this.makeProgressListener('Claimed Planet IDs');
    const claimedPlanetsCoordsLoadingBar = this.makeProgressListener('Claimed Planet Coordinates');
    const pendingMovesLoadingBar = this.makeProgressListener('Pending Moves');
    const planetsLoadingBar = this.makeProgressListener('Planets');
    const planetsMetadataLoadingBar = this.makeProgressListener('Planet Metadatas');
    const artifactsOnPlanetsLoadingBar = this.makeProgressListener('Artifacts On Planets');
    const artifactsInFlightLoadingBar = this.makeProgressListener('Artifacts On Moves');
    const yourArtifactsLoadingBar = this.makeProgressListener('Your Artifacts');

    const contractConstants = contractsAPI.getConstants();
    const worldRadius = contractsAPI.getWorldRadius();
    const gptCreditPriceEther = contractsAPI.getGPTCreditPriceEther();
    const myGPTCredits = contractsAPI.getGPTCreditBalance(contractsAPI.getAccount());
    const balance = contractsAPI.getBalance();

    const players = contractsAPI.getPlayers(playersLoadingBar);

    const arrivals: Map<VoyageId, QueuedArrival> = new Map();
    const planetVoyageIdMap: Map<LocationId, VoyageId[]> = new Map();

    const minedChunks = Array.from(await persistentChunkStore.allChunks());
    const minedPlanetIds = new Set(
      _.flatMap(minedChunks, (c) => c.planetLocations).map((l) => l.hash)
    );

    const loadedTouchedPlanetIds = contractsAPI.getTouchedPlanetIds(
      storedTouchedPlanetIds.length,
      planetIdsLoadingBar
    );

    const loadedRevealedCoords = contractsAPI.getRevealedPlanetsCoords(
      storedRevealedCoords.length,
      revealedPlanetsLoadingBar,
      revealedPlanetsCoordsLoadingBar
    );
    const loadedClaimedCoords = contractsAPI.getClaimedPlanetsCoords(
      0,
      claimedPlanetsLoadingBar,
      claimedPlanetsCoordsLoadingBar
    );

    const allTouchedPlanetIds = storedTouchedPlanetIds.concat(await loadedTouchedPlanetIds);
    const allRevealedCoords = storedRevealedCoords.concat(await loadedRevealedCoords);
    const allClaimedCoords = storedClaimedCoords.concat(await loadedClaimedCoords);
    const revealedCoordsMap = new Map<LocationId, RevealedCoords>();
    for (const revealedCoords of allRevealedCoords) {
      revealedCoordsMap.set(revealedCoords.hash, revealedCoords);
    }
    const claimedCoordsMap = new Map<LocationId, ClaimedCoords>();
    for (const claimedCoords of allClaimedCoords) {
      claimedCoordsMap.set(claimedCoords.hash, claimedCoords);
    }

    let planetsToLoad = allTouchedPlanetIds.filter(
      (id) => minedPlanetIds.has(id) || revealedCoordsMap.has(id) || claimedCoordsMap.has(id)
    );

    const pendingMoves = await contractsAPI.getAllArrivals(planetsToLoad, pendingMovesLoadingBar);

    // add origin points of voyages to known planets, because we need to know origin owner to render
    // the shrinking / incoming circle
    for (const arrival of pendingMoves) {
      planetsToLoad.push(arrival.fromPlanet);
    }
    planetsToLoad = [...new Set(planetsToLoad)];

    const touchedAndLocatedPlanets = await contractsAPI.bulkGetPlanets(
      planetsToLoad,
      planetsLoadingBar,
      planetsMetadataLoadingBar
    );

    touchedAndLocatedPlanets.forEach((_planet, locId) => {
      if (touchedAndLocatedPlanets.has(locId)) {
        planetVoyageIdMap.set(locId, []);
      }
    });

    for (const arrival of pendingMoves) {
      const voyageIds = planetVoyageIdMap.get(arrival.toPlanet);
      if (voyageIds) {
        voyageIds.push(arrival.eventId);
        planetVoyageIdMap.set(arrival.toPlanet, voyageIds);
      }
      arrivals.set(arrival.eventId, arrival);
    }

    const artifactIdsOnVoyages: ArtifactId[] = [];
    for (const arrival of pendingMoves) {
      if (arrival.artifactId) {
        artifactIdsOnVoyages.push(arrival.artifactId);
      }
    }

    const artifactsOnVoyages = await contractsAPI.bulkGetArtifacts(
      artifactIdsOnVoyages,
      artifactsInFlightLoadingBar
    );

    const heldArtifacts = contractsAPI.bulkGetArtifactsOnPlanets(
      planetsToLoad,
      artifactsOnPlanetsLoadingBar
    );
    const myArtifacts = contractsAPI.getPlayerArtifacts(
      contractsAPI.getAccount(),
      yourArtifactsLoadingBar
    );

    const twitters = await tryGetAllTwitters();

    return {
      contractConstants: await contractConstants,
      players: await players,
      worldRadius: await worldRadius,
      gptCreditPriceEther: await gptCreditPriceEther,
      myGPTCredits: await myGPTCredits,
      allTouchedPlanetIds,
      allRevealedCoords,
      allClaimedCoords,
      pendingMoves,
      touchedAndLocatedPlanets,
      artifactsOnVoyages,
      myArtifacts: await myArtifacts,
      heldArtifacts: await heldArtifacts,
      loadedPlanets: planetsToLoad,
      balance: weiToEth(await balance),
      revealedCoordsMap,
      claimedCoordsMap,
      planetVoyageIdMap,
      arrivals,
      twitters,
    };
  }
}
