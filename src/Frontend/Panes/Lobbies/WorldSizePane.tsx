import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { LobbiesPaneProps, SAFE_UPPER_BOUNDS } from './LobbiesUtils';

export function WorldSizePane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Checkbox
        label='World radius locked?'
        checked={config.WORLD_RADIUS_LOCKED}
        onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
          onUpdate({ WORLD_RADIUS_LOCKED: e.target.checked })
        }
      />
      <Row>
        <span>{config.WORLD_RADIUS_LOCKED ? 'World radius:' : 'Minimum world radius'}</span>
        <NumberInput
          value={config.WORLD_RADIUS_MIN}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            let { value } = e.target;
            if (typeof value === 'number') {
              // TODO: Validate this against 1000 and present the user with a warning/error
              value = Math.max(value, 0);
              value = Math.min(value, SAFE_UPPER_BOUNDS);
            }
            onUpdate({ WORLD_RADIUS_MIN: value });
          }}
        />
      </Row>
    </>
  );
}
