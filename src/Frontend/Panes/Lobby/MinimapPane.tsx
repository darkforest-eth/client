import React, { useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../../Components/Btn';
import { Spacer } from '../../Components/CoreUI';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Minimap } from '../../Components/Minimap';
import { MinimapColors, MinimapConfig } from './MinimapUtils';
import { LobbyConfigAction } from './Reducer';
import { chunk } from 'lodash';

export const KEY_ITEMS: KeyItem[] = [
  { name: 'Nebula', color: MinimapColors.innerNebula },
  { name: 'Space', color: MinimapColors.outerNebula },
  { name: 'Deep Space', color: MinimapColors.deepSpace },
  { name: 'Dead Space', color: MinimapColors.deadSpace },
  { name: 'Staged Planet', color: MinimapColors.stagedPlanet },
  { name: 'Target Planet', color: MinimapColors.targetPlanet },
  { name: 'Spawn Planet', color: MinimapColors.spawnPlanet },
  { name: 'Created Planet', color: MinimapColors.createdPlanet },
];

export interface MinimapDisplayConfig {
  keys?: boolean;
  size?: { width: string; height: string };
}

const ROW_CHUNK_SIZE = 4;

export interface KeyItem {
  name: string;
  color: string;
}

export const MinimapKeys: React.FC<{ keyItems: KeyItem[] }> = ({ keyItems }) => {
  return (
    <MetaRow>
      {chunk(keyItems, ROW_CHUNK_SIZE).map((items, rowIdx) => {
        return (
          <Column key={`key-item${rowIdx}`}>
            {items.map((item, itemIdx) => (
              <MapKey key={itemIdx}>
                <MapKeyIcon color={item.color}></MapKeyIcon>
                <span
                  key={item.name}
                  style={{
                    color: '#fff',
                    fontSize: '0.8rem',
                  }}
                >
                  {item.name}
                </span>
              </MapKey>
            ))}
          </Column>
        );
      })}
    </MetaRow>
  );
};

export function MinimapPane({
  minimapConfig,
  onUpdate,
  created,
  displayConfig,
}: {
  minimapConfig: MinimapConfig | undefined;
  onUpdate: (action: LobbyConfigAction) => void;
  created: boolean;
  displayConfig?: MinimapDisplayConfig;
}) {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <div>
      <Minimap
        style={
          displayConfig && displayConfig.size
            ? { width: displayConfig.size.width, height: displayConfig.size.height }
            : { width: '400px', height: '400px' }
        }
        minimapConfig={minimapConfig}
        setRefreshing={setRefreshing}
      />
      <div style={{ textAlign: 'center', height: '24px' }}>
        {refreshing ? <LoadingSpinner initialText='Refreshing...' /> : null}
      </div>
      {displayConfig && displayConfig.keys && <MinimapKeys keyItems={KEY_ITEMS} />}
      <Spacer height={5} />
    </div>
  );
}

const MapKey = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MapKeyIcon = styled.div<{ color: string }>`
  height: 16px;
  width: 16px;
  background: ${({ color }) => color};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
