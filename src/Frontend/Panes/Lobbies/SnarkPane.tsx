import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

export function SnarkPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Checkbox
          label='Disable ZK?'
          checked={config.DISABLE_ZK_CHECKS.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onUpdate({ type: 'DISABLE_ZK_CHECKS', value: e.target.checked });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.DISABLE_ZK_CHECKS.warning}</Warning>
      </Row>
      <Row>
        <span>Planet hash key:</span>
        <NumberInput
          value={config.PLANETHASH_KEY.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'PLANETHASH_KEY', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.PLANETHASH_KEY.warning}</Warning>
      </Row>
      <Row>
        <span>Space type key:</span>
        <NumberInput
          value={config.SPACETYPE_KEY.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'SPACETYPE_KEY', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.SPACETYPE_KEY.warning}</Warning>
      </Row>
      <Row>
        <span>Biome base key:</span>
        <NumberInput
          value={config.BIOMEBASE_KEY.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'BIOMEBASE_KEY', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.BIOMEBASE_KEY.warning}</Warning>
      </Row>
    </>
  );
}
