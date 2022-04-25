import { SpaceshipType } from '@darkforest_eth/types';
import _ from 'lodash';
import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
} from '../../Components/Input';
import { SpaceshipDescription, SpaceshipLabel } from '../../Components/Labels/SpaceshipLabel';
import { Row } from '../../Components/Row';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

function Spaceships({
  value,
  index,
  onUpdate,
}: LobbiesPaneProps & { value: boolean | undefined; index: number }) {
  return (
    <div>
      {/* TODO: We should have a utility that converts an integer into an ArtifactRarity safely  */}
      <SpaceshipLabel spaceship={index as SpaceshipType} />
      <br></br>
      <SpaceshipDescription spaceship={index as SpaceshipType} />
      <Checkbox
        checked={value}
        onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ type: 'SPACESHIPS', value: e.target.checked, index })
        }/>
    </div>
  );
}

const pointsRowStyle = { gap: '8px' } as CSSStyleDeclaration & React.CSSProperties;

export function SpaceshipsPane({ config, onUpdate }: LobbiesPaneProps) {

  const spaceships = _.chunk(config.SPACESHIPS.displayValue, 5).map(
    (items, rowIdx) => {
      return (
      <Row key={`score-row-${rowIdx}`} style={pointsRowStyle}>
      {(config.SPACESHIPS.displayValue ?? []).map((displayValue, idx) => (
        <Spaceships
          key={`spaceship-${idx}`}
          config={config}
          value={displayValue as boolean}
          index={idx}
          onUpdate={onUpdate}
        />
      ))}
    </Row>
      );
    }
  )
  return (
    <>
      <Row>
        <span>Spaceships</span>
      </Row>
        {spaceships}
      <Row>
        <Warning>{config.ARTIFACT_POINT_VALUES.warning}</Warning>
      </Row>
    </>
  );
}
