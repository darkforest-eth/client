import { useMemo, useState, useEffect } from 'react';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { EthAddress, Planet, ArtifactId, Artifact } from '@darkforest_eth/types';
import { createDefinedContext } from './createDefinedContext';
import { useKeyPressed, useWrappedEmitter } from './EmitterHooks';
import { ctrlDown$, ctrlUp$ } from './KeyEmitters';
import { ContextMenuType } from '../Components/ContextMenu';

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

export function useMyArtifacts(
  uiManager: GameUIManager
): Wrapper<Map<ArtifactId, Artifact> | undefined> {
  return useWrappedEmitter<Map<ArtifactId, Artifact>>(
    uiManager.myArtifacts$,
    uiManager.getMyArtifactMap()
  );
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

// this is only an OK abstraction but it's fine while our context menu is simple
/**
 * Calculate current context menu from the current UI state
 * @param selectedPlanet the currently selected planet
 */
export function useContextMenu(selectedPlanet: Planet | undefined): ContextMenuType {
  const [menu, setMenu] = useState<ContextMenuType>(ContextMenuType.None);

  useEffect(() => {
    if (!selectedPlanet) setMenu(ContextMenuType.None);
    else setMenu(ContextMenuType.Planet);
  }, [selectedPlanet]);

  return menu;
}
