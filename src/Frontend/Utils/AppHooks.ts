import { getActivatedArtifact, isActivated } from '@darkforest_eth/gamelogic';
import { address } from '@darkforest_eth/serde';
import { EthConnection } from '@darkforest_eth/network';
import {
  Artifact,
  ArtifactId,
  BadgeType,
  CleanConfigPlayer,
  ConfigPlayer,
  EthAddress,
  GrandPrixBadge,
  GrandPrixMetadata,
  GraphConfigPlayer,
  Leaderboard,
  LiveMatch,
  LocationId,
  Planet,
  Player,
  Transaction,
  TransactionId,
} from '@darkforest_eth/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { loadConfigFromHash } from '../../Backend/Network/GraphApi/ConfigApi';
import { Account } from '../../Backend/Network/AccountManager';
import { loadArenaLeaderboard } from '../../Backend/Network/GraphApi/GrandPrixApi';
import { loadEloLeaderboard } from '../../Backend/Network/GraphApi/EloLeaderboardApi';
import { loadLeaderboard } from '../../Backend/Network/GraphApi/LeaderboardApi';
import { loadLiveMatches } from '../../Backend/Network/GraphApi/SpyApi';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { ContractsAPIEvent } from '../../_types/darkforest/api/ContractsAPITypes';
import { AddressTwitterMap } from '../../_types/darkforest/api/UtilityServerAPITypes';
import { LobbyInitializers } from '../Panes/Lobby/Reducer';
import { ModalHandle } from '../Views/Game/ModalPane';
import { createDefinedContext } from './createDefinedContext';
import { useEmitterSubscribe, useEmitterValue, useWrappedEmitter } from './EmitterHooks';
import { usePoll } from './Hooks';
import { DUMMY } from './constants';
import { createDummyLiveMatches } from '../Views/Portal/PortalUtils';

export const { useDefinedContext: useEthConnection, provider: EthConnectionProvider } =
  createDefinedContext<EthConnection>();

export const { useDefinedContext: useAccount, provider: AccountProvider } =
  createDefinedContext<Account>();

export const { useDefinedContext: useUIManager, provider: UIManagerProvider } =
  createDefinedContext<GameUIManager>();

export const { useDefinedContext: useTopLevelDiv, provider: TopLevelDivProvider } =
  createDefinedContext<HTMLDivElement>();

export type TwitterContextType = {
  twitters: AddressTwitterMap;
  // setTwitters: (twitters: AddressTwitterMap) => void;
  setTwitters: React.Dispatch<React.SetStateAction<AddressTwitterMap>>;
};

export const { useDefinedContext: useTwitters, provider: TwitterProvider } =
  createDefinedContext<TwitterContextType>();

export function useOverlayContainer(): HTMLDivElement | null {
  return useUIManager()?.getOverlayContainer() ?? null;
}

export const { useDefinedContext: useSeasonPlayers, provider: SeasonPlayerProvider } =
  createDefinedContext<CleanConfigPlayer[]>();

export const { useDefinedContext: useSeasonData, provider: SeasonDataProvider } =
  createDefinedContext<GrandPrixMetadata[]>();

/**
 * Get the currently used account on the client.
 * @param uiManager instance of GameUIManager
 */
export function useAddress(uiManager: GameUIManager): EthAddress | undefined {
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

export function useArenaLeaderboard(
  isCompetitive: boolean,
  address: string | undefined = undefined,
  poll: number | undefined = undefined
): {
  arenaLeaderboard: Leaderboard | undefined;
  arenaError: Error | undefined;
} {
  const [arenaLeaderboard, setArenaLeaderboard] = useState<Leaderboard | undefined>();
  const [arenaError, setArenaError] = useState<Error | undefined>();

  const loadArena = useCallback(async function loadArena() {
    try {
      setArenaLeaderboard((await loadArenaLeaderboard(address, isCompetitive)) as Leaderboard);
    } catch (e) {
      console.log('error loading leaderboard', e);
      setArenaError(e);
    }
  }, []);

  usePoll(loadArena, poll, true);

  return { arenaLeaderboard, arenaError };
}

export function useEloLeaderboard(
  isCompetitive: boolean,
  address: string | undefined = undefined,
  poll: number | undefined = undefined
): {
  eloLeaderboard: GraphConfigPlayer[] | undefined;
  eloError: Error | undefined;
} {
  const [eloLeaderboard, setEloLeaderboard] = useState<GraphConfigPlayer[] | undefined>();
  const [eloError, setEloError] = useState<Error | undefined>();

  const loadElo = useCallback(async function loadElo() {
    try {
      setEloLeaderboard(await loadEloLeaderboard(address, isCompetitive));
    } catch (e) {
      console.log('error loading leaderboard', e);
      setEloError(e);
    }
  }, []);

  usePoll(loadElo, poll, true);

  return { eloLeaderboard, eloError };
}

export function useConfigFromHash(configHash?: string) {
  const [config, setConfig] = useState<LobbyInitializers | undefined>();
  const [lobbyAddress, setLobbyAddress] = useState<EthAddress | undefined>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (configHash) {
      loadConfigFromHash(configHash)
        .then((c) => {
          if (!c) {
            setConfig(undefined);
            return;
          }
          setConfig(c.config);
          setLobbyAddress(address(c.address));
        })
        .catch((e) => {
          setError(true);
          console.log(e);
        });
    }
  }, [configHash]);

  return { config, lobbyAddress, error };
}

export function useLiveMatches(
  config: string | undefined = undefined,
  poll: number | undefined = undefined
): {
  liveMatches: LiveMatch | undefined;
  spyError: Error | undefined;
} {
  const [liveMatches, setLiveMatches] = useState<LiveMatch | undefined>();
  const [spyError, setSpyError] = useState<Error | undefined>();
  const loadSpy = useCallback(async function loadSpy() {
    try {
      if (DUMMY) {
        setLiveMatches(createDummyLiveMatches(10));
      } else {
        setLiveMatches(await loadLiveMatches(config));
      }
    } catch (e) {
      console.log('error loading leaderboard', e);
      setSpyError(e);
    }
  }, []);

  usePoll(loadSpy, poll, true);

  return { liveMatches, spyError };
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

export function useGameStarted() {
  const ui = useUIManager();
  return useEmitterValue(ui.getGameStarted$(), ui.gameStarted);
}

export function useGameover() {
  const ui = useUIManager();
  return useEmitterValue(ui.getGameover$(), ui.getGameover());
}

/*
From: https://gist.github.com/reecelucas/2f510e6b8504008deaaa52732202d2da
*/
export const useDisableScroll = () => {
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const scrollBlocked = useRef(null);
  const html = (safeDocument as Document).documentElement;
  const { body } = safeDocument as Document;

  const blockScroll = () => {
    if (!body || !body.style || scrollBlocked.current) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    html.style.position = 'relative'; /* [1] */
    html.style.overflow = 'hidden'; /* [2] */
    body.style.position = 'relative'; /* [1] */
    body.style.overflow = 'hidden'; /* [2] */
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    (scrollBlocked as any).current = true;
  };

  const allowScroll = () => {
    if (!body || !body.style || !scrollBlocked.current) return;

    html.style.position = '';
    html.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    (scrollBlocked as any).current = false;
  };

  return [blockScroll, allowScroll];
};
