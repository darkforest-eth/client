import _ from 'lodash';
import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';

import { LobbiesPaneProps, Warning } from './LobbiesUtils';

export function TargetPlanetPane({ config: config, onUpdate: onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Checkbox
          label='Players win by capturing admin designated target planets?'
          checked={config.TARGET_PLANETS.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ type: 'TARGET_PLANETS', value: e.target.checked })
          }
        />
      </Row>
      {config.TARGET_PLANETS.displayValue && (
        <Row>
          <span>Blocks between Invade & Claim Victory</span>
          <NumberInput
            value={config.TARGET_PLANET_HOLD_BLOCKS_REQUIRED.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              onUpdate({ type: 'TARGET_PLANET_HOLD_BLOCKS_REQUIRED', value: e.target.value });
            }}
          />
        </Row>
      )}
    </>
  );
}
