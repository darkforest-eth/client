import color from 'color';
import _ from 'lodash';
import React, { useState } from 'react';
import { Btn } from '../../Components/Btn';
import { Spacer } from '../../Components/CoreUI';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Minimap } from '../../Components/Minimap';
import { Modal } from '../../Components/Modal';
import { Row } from '../../Components/Row';
import { MinimapColors, MinimapConfig } from './MinimapUtils';
import { LobbyConfigAction } from './Reducer';

const rowChunkSize = 4;

const rowStyle = { gap: '5px' } as CSSStyleDeclaration & React.CSSProperties;

export interface keyItem {
  name: string;
  color: string;
}
const keyItems: keyItem[] = [
  { name: 'Nebula', color: MinimapColors.innerNebula },
  { name: 'Space', color: MinimapColors.outerNebula },
  { name: 'Deep Space', color: MinimapColors.deepSpace },
  { name: 'Dead Space', color: MinimapColors.deadSpace },
  { name: 'Staged Planet', color: MinimapColors.stagedPlanet },
  { name: 'Target Planet', color: MinimapColors.targetPlanet },
  { name: 'Spawn Planet', color: MinimapColors.spawnPlanet },
  { name: 'Created Planet', color: MinimapColors.createdPlanet },
];

function Key() {
  return (
    <>
      {_.chunk(keyItems, rowChunkSize).map((items, rowIdx) => {
        return (
          <Row key={`key-item${rowIdx}`} style={rowStyle}>
            {items.map((item) => (
              <span
                key={item.name}
                style={{
                  flex: `1 1 ${Math.floor(100 / rowChunkSize)}%`,
                  borderRadius: '3px',
                  backgroundColor: item.color,
                  padding: '3px',
                  textAlign: 'center',
                  color: `${color(item.color).isLight() ? 'black' : 'white'}`,
                  fontSize: '0.8rem' 
                }}
              >
                {item.name}
              </span>
            ))}
          </Row>
        );
      })}
    </>
  );
}

export function MinimapPane({
  modalIndex,
  minimapConfig,
  onUpdate,
  created,
}: {
  modalIndex: number;
  minimapConfig: MinimapConfig | undefined;
  onUpdate: (action: LobbyConfigAction) => void;
  created: boolean;
}) {
  const [refreshing, setRefreshing] = useState(false);

  const randomize = () => {
    console.log('randomizing!!!');
    const seed = Math.floor(Math.random() * 10000);
    onUpdate({ type: 'PLANETHASH_KEY', value: seed });
    onUpdate({ type: 'SPACETYPE_KEY', value: seed + 1 });
    onUpdate({ type: 'BIOMEBASE_KEY', value: seed + 2 });
  };

  return (
    <Modal width='416px' initialX={650} initialY={200} index={modalIndex}>
      <div slot='title'>World Minimap</div>
      <Minimap minimapConfig={minimapConfig} setRefreshing={setRefreshing} />
      <div style={{ textAlign: 'center', height: '24px' }}>
        {refreshing ? <LoadingSpinner initialText='Refreshing...' /> : null}
      </div>
      <Key />
      <Spacer height = {5}/> 
      <Btn size='stretch' onClick={randomize} disabled={refreshing || created}>
        Randomize Map
      </Btn>
    </Modal>
  );
}
