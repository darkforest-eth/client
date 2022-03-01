import { getActivatedArtifact, isActivated } from '@darkforest_eth/gamelogic';
import {
  Artifact,
  ArtifactId,
  EthAddress,
  Leaderboard,
  LocationId,
  Planet,
  Player,
  Transaction,
  TransactionId,
} from '@darkforest_eth/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { loadLeaderboard } from '../../Backend/Network/LeaderboardApi';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { ContractsAPIEvent } from '../../_types/darkforest/api/ContractsAPITypes';
import { ModalHandle } from '../Views/ModalPane';
import { createDefinedContext } from './createDefinedContext';
import { useEmitterSubscribe, useEmitterValue, useWrappedEmitter } from './EmitterHooks';
import { usePoll } from './Hooks';

export const { useDefinedContext: useUIManager, provider: UIManagerProvider } =
  createDefinedContext<GameUIManager>();

export const { useDefinedContext: useTopLevelDiv, provider: TopLevelDivProvider } =
  createDefinedContext<HTMLDivElement>();

export function useOverlayContainer(): HTMLDivElement | null {
  return useUIManager()?.getOverlayContainer() ?? null;
}

/**
 * Get the currently used account on the client.
 * @param uiManager instance of GameUIManager
 */
export function useAccount(uiManager: GameUIManager): EthAddress | undefined {
  const account = useMemo(() => uiManager.getAccount(), [uiManager]);

  return account;
}

/**
 * Hook which gets you the player, and updates whenever that player's twitter or score changes.
 */
export function usePlayer(
  uiManager: GameUIManager,
  ethAddress?: EthAddress
): Wrapper<Player | undefined> {
  const [player, setPlayer] = useState<Wrapper<Player | undefined>>(
    () => new Wrapper(uiManager.getPlayer(ethAddress))
  );

  useEmitterSubscribe(
    uiManager.getGameManager().playersUpdated$,
    () => {
      setPlayer(new Wrapper(uiManager.getPlayer(ethAddress)));
    },
    [uiManager, setPlayer, ethAddress]
  );

  return player;
}

/**
 * Create a subscription to the currently selected planet.
 * @param uiManager instance of GameUIManager
 */
export function useSelectedPlanet(uiManager: GameUIManager): Wrapper<Planet | undefined> {
  const selectedPlanetId = useWrappedEmitter<LocationId>(uiManager.selectedPlanetId$, undefined);
  return usePlanet(uiManager, selectedPlanetId.value);
}

export function useSelectedPlanetId(uiManager: GameUIManager, defaultId?: LocationId) {
  return useWrappedEmitter<LocationId>(uiManager.selectedPlanetId$, defaultId);
}

export function usePlanet(
  uiManager: GameUIManager,
  locationId: LocationId | undefined
): Wrapper<Planet | undefined> {
  const [planet, setPlanet] = useState<Wrapper<Planet | undefined>>(
    () => new Wrapper(uiManager.getPlanetWithId(locationId))
  );

  useEffect(() => {
    setPlanet(new Wrapper(uiManager.getPlanetWithId(locationId)));
  }, [uiManager, locationId]);

  useEmitterSubscribe(
    uiManager.getGameManager().getGameObjects().planetUpdated$,
    (id: LocationId) => {
      if (id === locationId) {
        setPlanet(new Wrapper(uiManager.getPlanetWithId(locationId)));
      }
    },
    [uiManager, setPlanet, locationId]
  );

  return planet;
}

/**
 * Create a subscription to the currently hovering planet.
 * @param uiManager instance of GameUIManager
 */
export function useHoverPlanet(uiManager: GameUIManager): Wrapper<Planet | undefined> {
  return useWrappedEmitter<Planet>(uiManager.hoverPlanet$, undefined);
}

export function useHoverArtifact(uiManager: GameUIManager): Wrapper<Artifact | undefined> {
  return useWrappedEmitter<Artifact>(uiManager.hoverArtifact$, undefined);
}

export function useHoverArtifactId(uiManager: GameUIManager): Wrapper<ArtifactId | undefined> {
  return useWrappedEmitter<ArtifactId>(uiManager.hoverArtifactId$, undefined);
}

export function useMyArtifactsList(uiManager: GameUIManager) {
  const [myArtifacts, setMyArtifacts] = useState(uiManager.getMyArtifacts());
  useEmitterSubscribe(
    uiManager.getArtifactUpdated$(),
    () => {
      setMyArtifacts(uiManager.getMyArtifacts());
    },
    [uiManager, setMyArtifacts]
  );
  return myArtifacts;
}

// note that this is going to throw an error if the pointer to `artifacts` changes but not to `planet`
export function usePlanetArtifacts(
  planet: Wrapper<Planet | undefined>,
  uiManager: GameUIManager
): Artifact[] {
  const artifacts = useMemo(
    () => (planet.value ? uiManager.getArtifactsWithIds(planet.value.heldArtifactIds) : []),
    [planet, uiManager]
  );

  return artifacts.filter((a) => !!a) as Artifact[];
}

export function usePlanetInactiveArtifacts(
  planet: Wrapper<Planet | undefined>,
  uiManager: GameUIManager
): Artifact[] {
  const artifacts = usePlanetArtifacts(planet, uiManager);
  const filtered = useMemo(() => artifacts.filter((a) => !isActivated(a)), [artifacts]);

  return filtered;
}

export function useActiveArtifact(
  planet: Wrapper<Planet | undefined>,
  uiManager: GameUIManager
): Artifact | undefined {
  const artifacts = usePlanetArtifacts(planet, uiManager);
  return getActivatedArtifact(artifacts);
}

/**
 * Create a subscription to the currently selected artifact.
 * @param uiManager instance of GameUIManager
 */
export function useSelectedArtifact(uiManager: GameUIManager): Wrapper<Artifact | undefined> {
  return useWrappedEmitter<Artifact>(uiManager.hoverArtifact$, undefined);
}

export function useArtifact(uiManager: GameUIManager, artifactId: ArtifactId) {
  const [artifact, setArtifact] = useState<Wrapper<Artifact | undefined>>(
    new Wrapper(uiManager.getArtifactWithId(artifactId))
  );

  useEmitterSubscribe(
    uiManager.getGameManager().getGameObjects().artifactUpdated$,
    (id: ArtifactId) => {
      if (id === artifactId) {
        setArtifact(new Wrapper(uiManager.getArtifactWithId(artifactId)));
      }
    },
    [uiManager, setArtifact, artifactId]
  );

  useEffect(() => {
    setArtifact(new Wrapper(uiManager.getArtifactWithId(artifactId)));
  }, [uiManager, artifactId]);

  return artifact;
}

// TODO cache this globally

/** Loads the leaderboard */
export function useLeaderboard(poll: number | undefined = undefined): {
  leaderboard: Leaderboard | undefined;
  error: Error | undefined;
} {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | undefined>();
  const [error, setError] = useState<Error | undefined>();

  const load = useCallback(async function load() {
    try {
      setLeaderboard(await loadLeaderboard());
    } catch (e) {
      console.log('error loading leaderboard', e);
      setError(e);
    }
  }, []);

  usePoll(load, poll, true);

  return { leaderboard, error };
}

export function usePopAllOnSelectedPlanetChanged(
  modal: ModalHandle,
  startingId: LocationId | undefined
) {
  const selected = useSelectedPlanetId(useUIManager(), startingId).value;

  useEffect(() => {
    if (selected !== startingId) {
      modal.popAll();
    }
  }, [selected, modal, startingId]);
}

export type TransactionRecord = Record<TransactionId, Transaction>;

/**
 * Creates subscriptions to all contract transaction events to keep an up to date
 * list of all transactions and their states.
 */
export function useTransactionLog() {
  const uiManager = useUIManager();
  const [transactions, setTransactions] = useState<Wrapper<TransactionRecord>>(new Wrapper({}));

  /**
   * Update the matching transaction in the {@link TransactionRecord}
   * with data from the contract lifecycle events. A {@link Wrapper}
   * around the {@link TransactionRecord} needs to be used to avoid
   * force a React state change and re-render.
   */
  const updateTransaction = useCallback((tx: Transaction) => {
    setTransactions((txs) => {
      const txWrapper = new Wrapper(txs.value);
      txWrapper.value[tx.id] = {
        ...tx,
      };
      return txWrapper;
    });
  }, []);

  useEffect(() => {
    const gameManager = uiManager.getGameManager();
    const contractEventEmitter = gameManager.getContractAPI();

    contractEventEmitter.on(ContractsAPIEvent.TxQueued, updateTransaction);
    contractEventEmitter.on(ContractsAPIEvent.TxPrioritized, updateTransaction);
    contractEventEmitter.on(ContractsAPIEvent.TxProcessing, updateTransaction);
    contractEventEmitter.on(ContractsAPIEvent.TxSubmitted, updateTransaction);
    contractEventEmitter.on(ContractsAPIEvent.TxConfirmed, updateTransaction);
    contractEventEmitter.on(ContractsAPIEvent.TxErrored, updateTransaction);
    contractEventEmitter.on(ContractsAPIEvent.TxCancelled, updateTransaction);

    return () => {
      contractEventEmitter.off(ContractsAPIEvent.TxQueued, updateTransaction);
      contractEventEmitter.off(ContractsAPIEvent.TxPrioritized, updateTransaction);
      contractEventEmitter.off(ContractsAPIEvent.TxProcessing, updateTransaction);
      contractEventEmitter.off(ContractsAPIEvent.TxSubmitted, updateTransaction);
      contractEventEmitter.off(ContractsAPIEvent.TxConfirmed, updateTransaction);
      contractEventEmitter.off(ContractsAPIEvent.TxErrored, updateTransaction);
      contractEventEmitter.off(ContractsAPIEvent.TxCancelled, updateTransaction);
    };
  }, [uiManager, updateTransaction]);

  return transactions;
}

export function usePaused() {
  const ui = useUIManager();
  return useEmitterValue(ui.getPaused$(), ui.getPaused());
}
