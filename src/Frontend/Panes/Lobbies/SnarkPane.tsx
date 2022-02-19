import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { LobbiesPaneProps, SAFE_UPPER_BOUNDS } from './LobbiesUtils';

export function SnarkPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Checkbox
          label='Disable ZK?'
          checked={config.DISABLE_ZK_CHECKS}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onUpdate({ DISABLE_ZK_CHECKS: e.target.checked });
          }}
        />
      </Row>
      <Row>
        <span>Planet hash key:</span>
        <NumberInput
          value={config.PLANETHASH_KEY}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            let { value } = e.target;
            if (typeof value === 'number') {
              value = Math.max(value, 0);
              value = Math.min(value, SAFE_UPPER_BOUNDS);
            }
            onUpdate({ PLANETHASH_KEY: value });
          }}
        />
      </Row>
      <Row>
        <span>Space type key:</span>
        <NumberInput
          value={config.SPACETYPE_KEY}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            let { value } = e.target;
            if (typeof value === 'number') {
              value = Math.max(value, 0);
              value = Math.min(value, SAFE_UPPER_BOUNDS);
            }
            onUpdate({ SPACETYPE_KEY: value });
          }}
        />
      </Row>
      <Row>
        <span>Biome base key:</span>
        <NumberInput
          value={config.BIOMEBASE_KEY}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            let { value } = e.target;
            if (typeof value === 'number') {
              value = Math.max(value, 0);
              value = Math.min(value, SAFE_UPPER_BOUNDS);
            }
            onUpdate({ BIOMEBASE_KEY: value });
          }}
        />
      </Row>
    </>
  );
}
