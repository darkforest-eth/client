import { PlanetTypeNames } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CloseButton, LobbyPlanet } from '../Panes/Lobbies/LobbiesUtils';
import { LobbyAction, LobbyConfigState } from '../Panes/Lobbies/Reducer';
import { PlanetPropEditor } from './LobbyPlanetPropEditor';

export interface LobbyPlanetInspectorProps {
  selectedPlanet?: LobbyPlanet ;
  selectedIndex?: number;
  config: LobbyConfigState;
  updateConfig: React.Dispatch<LobbyAction>;
  onDelete: (deletedIndex: number) => void;
  onClose: () => void;
  root: string;
}

// This is the component that lets you edit staged planet params when editing a custom lobby map.

// From https://dfwiki.net/wiki/Celestial_bodies
const PLANET_DESCRIPTION = [
  'Planets are the most basic type of celestial body. They can be found in all space types.',
  'Asteroid fields have half the defense of a same-level planet, making them cheap to take over while still maintaining the same energy growth and general functionality with silver production added on. This makes asteroid fields ideal for early expansion.',
  'Foundries contain artifacts that can be discovered by players.',
  'Spacetime rips are used to withdraw and deposit artifacts into and from the universe.',
  'Quasars can act as a resource battery in well-established player-owned regions of the universe.',
];

export const LobbyCreationPlanetInspector: React.FC<LobbyPlanetInspectorProps> = ({
  selectedPlanet,
  selectedIndex,
  updateConfig,
  config,
  onDelete,
  onClose,
  root,
}) => {
  const [mutablePlanet, setMutablePlanet] = useState<LobbyPlanet | undefined>(selectedPlanet);

  useEffect(() => {
    setMutablePlanet(selectedPlanet);
  }, [selectedPlanet, selectedIndex]);

  if(!mutablePlanet || !selectedPlanet || selectedIndex == undefined) return <Inspector><InspectorInner></InspectorInner></Inspector>;
  return (
    <Inspector>
      <InspectorInner>
        <HeaderRow>
          <InspectorTitle>{PlanetTypeNames[mutablePlanet.planetType]}</InspectorTitle>
          <CloseButton onClick={onClose} />
        </HeaderRow>
        <span style={{ maxWidth: '320px' }}>{PLANET_DESCRIPTION[mutablePlanet.planetType]}</span>
        <PlanetPropEditor
          selectedPlanet={mutablePlanet}
          canAddPlanets={config.ADMIN_CAN_ADD_PLANETS.displayValue ?? false}
          spawnPlanetsEnabled={config.MANUAL_SPAWN.displayValue ?? false}
          targetPlanetsEnabled={config.TARGET_PLANETS.displayValue ?? false}
          blockEnabled = {(config.BLOCK_CAPTURE.displayValue ?? false) || (config.BLOCK_MOVES.displayValue ?? false)}
          stagedPlanets = {config.ADMIN_PLANETS.currentValue ?? []}
          root={root}
          onChange={(planet) => setMutablePlanet(planet)}
        />
        {mutablePlanet !== selectedPlanet && (
          <Button
            primary
            onClick={() => {
              updateConfig({
                type: 'ADMIN_PLANETS',
                value: mutablePlanet,
                index: selectedIndex,
              });
            }}
          >
            Save changes
          </Button>
        )}
        <Button
          onClick={() => {
            if (!selectedPlanet) return;
            updateConfig({
              type: 'ADMIN_PLANETS',
              value: undefined,
              index: selectedIndex,
            });
            onDelete(selectedIndex);
          }}
        >
          Delete planet
        </Button>
      </InspectorInner>
    </Inspector>
  );
};

const Inspector = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  min-width: 320px;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.05);
`;

const InspectorInner = styled.div`
  height: calc(100% - 68px);
  overflow-y: auto;
  padding: 12px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InspectorTitle = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #fff;
`;

const Button = styled.button<{ primary?: boolean }>`
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: ${({ primary }) => (primary ? '2px solid #2EE7BA' : '1px solid #5F5F5F')};
  color: ${({ primary }) => (primary ? '#2EE7BA' : '#fff')};
  background: ${({ primary }) => (primary ? '#09352B' : '#252525')};
  padding: 16px;
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 80ms ease 0s, border-color;
  &:hover {
    background: ${({ primary }) => (primary ? '#0E5141' : '#3D3D3D')};
    border-color: ${({ primary }) => (primary ? '#30FFCD' : '#797979')};
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
