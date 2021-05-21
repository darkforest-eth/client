import { useMemo } from 'react';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { EthAddress, Planet, ArtifactId, Artifact } from '@darkforest_eth/types';
import { createDefinedContext } from './createDefinedContext';
import { useKeyPressed, useWrappedEmitter } from './EmitterHooks';
import { ctrlDown$, ctrlUp$ } from './KeyEmitters';
import { getActivatedArtifact, isActivated } from '../../Backend/GameLogic/ArtifactUtils';

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
 * Create a subscription to the currently selected planet.
 * @param uiManager instance of GameUIManager
 */
export function useSelectedPlanet(uiManager: GameUIManager): Wrapper<Planet | undefined> {
  return useWrappedEmitter<Planet>(uiManager.selectedPlanet$, undefined);
}

/**
 * Create a subscription to the currently hovering planet.
 * @param uiManager instance of GameUIManager
 */
export function useHoverPlanet(uiManager: GameUIManager): Wrapper<Planet | undefined> {
  return useWrappedEmitter<Planet>(uiManager.hoverPlanet$, undefined);
}

export function useMyArtifacts(
  uiManager: GameUIManager
): Wrapper<Map<ArtifactId, Artifact> | undefined> {
  return useWrappedEmitter<Map<ArtifactId, Artifact>>(
    uiManager.myArtifacts$,
    uiManager.getMyArtifactMap()
  );
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

  return artifacts;
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

/** Return a bool that indicates if the control key is pressed. */
export function useControlDown(): boolean {
  return useKeyPressed(ctrlDown$, ctrlUp$);
}
