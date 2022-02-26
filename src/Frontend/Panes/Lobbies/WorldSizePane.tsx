import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

export function WorldSizePane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Checkbox
          label='World radius locked?'
          checked={config.WORLD_RADIUS_LOCKED.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ type: 'WORLD_RADIUS_LOCKED', value: e.target.checked })
          }
        />
      </Row>
      <Row>
        <Warning>{config.WORLD_RADIUS_LOCKED.warning}</Warning>
      </Row>
      <Row>
        <span>{config.WORLD_RADIUS_LOCKED ? 'World radius:' : 'Minimum world radius'}</span>
        <NumberInput
          value={config.WORLD_RADIUS_MIN.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'WORLD_RADIUS_MIN', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.WORLD_RADIUS_MIN.warning}</Warning>
      </Row>
    </>
  );
}
