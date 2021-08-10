import {
  Artifact,
  ArtifactId,
  EthAddress,
  Leaderboard,
  LocationId,
  Planet,
  Player,
} from '@darkforest_eth/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getActivatedArtifact, isActivated } from '../../Backend/GameLogic/ArtifactUtils';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { loadLeaderboard } from '../../Backend/Network/LeaderboardApi';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { ModalHandle } from '../Views/ModalPane';
import { createDefinedContext } from './createDefinedContext';
import { useEmitterSubscribe, useWrappedEmitter } from './EmitterHooks';
import { usePoll } from './Hooks';
import UIEmitter, { UIEmitterEvent } from './UIEmitter';

export const { useDefinedContext: useUIManager, provider: UIManagerProvider } =
  createDefinedContext<GameUIManager>();

export const { useDefinedContext: useTopLevelDiv, provider: TopLevelDivProvider } =
  createDefinedContext<HTMLDivElement>();

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

  const onUpdate = useCallback(() => {
    setPlayer(new Wrapper(uiManager.getPlayer(ethAddress)));
  }, [uiManager, ethAddress]);

  useEmitterSubscribe(uiManager.getGameManager().playersUpdated$, onUpdate);

  return player;
}

/**
 * Create a subscription to the currently selected planet.
 * @param uiManager instance of GameUIManager
 */
export function useSelectedPlanet(uiManager: GameUIManager): Wrapper<Planet | undefined> {
  return useWrappedEmitter<Planet>(uiManager.selectedPlanet$, undefined);
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

  const callback = useCallback(
    (id: LocationId) => {
      if (id === locationId) {
        setPlanet(new Wrapper(uiManager.getPlanetWithId(locationId)));
      }
    },
    [uiManager, locationId]
  );

  useEmitterSubscribe(uiManager.getGameManager().getGameObjects().planetUpdated$, callback);

  return planet;
}

/**
 * Create a subscription to the currently hovering planet.
 * @param uiManager instance of GameUIManager
 */
export function useHoverPlanet(uiManager: GameUIManager): Wrapper<Planet | undefined> {
  return useWrappedEmitter<Planet>(uiManager.hoverPlanet$, undefined);
}

export function useMyArtifacts(uiManager: GameUIManager): Wrapper<Artifact[]> {
  const [myArtifacts, setMyArtifacts] = useState(new Wrapper(uiManager.getMyArtifacts()));

  useEffect(() => {
    const interval = setInterval(() => {
      setMyArtifacts(new Wrapper(uiManager.getMyArtifacts()));
    }, 1000);
    return () => clearInterval(interval);
  });

  return myArtifacts;
}

export function useMyArtifactsList(uiManager: GameUIManager) {
  const myArtifactsMap = useMyArtifacts(uiManager);
  return Array.from(myArtifactsMap.value?.values() || []);
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
  return useWrappedEmitter<Artifact>(uiManager.selectedArtifact$, undefined);
}

export function useArtifact(uiManager: GameUIManager, artifactId: ArtifactId) {
  const [artifact, setArtifact] = useState<Wrapper<Artifact | undefined>>(
    new Wrapper(uiManager.getArtifactWithId(artifactId))
  );

  // @todo: actually hook this into the eventing system that we have in the game.
  useEffect(() => {
    const interval = setInterval(() => {
      setArtifact(new Wrapper(uiManager.getArtifactWithId(artifactId)));
    }, 1000);
    return () => clearInterval(interval);
  });

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

/**
 * Calls {@code onCompleted} when the user sends a move via the ui.
 */
export function useOnSendCompleted(onCompleted: () => void) {
  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.on(UIEmitterEvent.SendCompleted, onCompleted);
    return () => {
      uiEmitter.removeListener(UIEmitterEvent.SendCompleted, onCompleted);
    };
  }, [onCompleted]);
}
