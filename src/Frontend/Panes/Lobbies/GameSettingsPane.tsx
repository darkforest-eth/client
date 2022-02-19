import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSlider, Slider } from '../../Components/Slider';
import { LobbiesPaneProps, SAFE_UPPER_BOUNDS } from './LobbiesUtils';

export function GameSettingsPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Slider
          variant='filled'
          label='Game speed'
          formatOptions={{ style: 'unit', unit: 'x' }}
          min={1}
          max={60}
          step={1}
          value={config.TIME_FACTOR_HUNDREDTHS / 100}
          onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) => {
            onUpdate({ TIME_FACTOR_HUNDREDTHS: e.target.value * 100 });
          }}
        />
      </Row>
      <Row>
        <Checkbox
          label='Planet transfer enabled?'
          checked={config.PLANET_TRANSFER_ENABLED}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onUpdate({ PLANET_TRANSFER_ENABLED: e.target.checked });
          }}
        />
      </Row>
      <Row>
        <span>Location reveal cooldown (in seconds)</span>
        <NumberInput
          value={config.LOCATION_REVEAL_COOLDOWN}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            let { value } = e.target;
            if (typeof value === 'number') {
              value = Math.max(value, 0);
              value = Math.min(value, SAFE_UPPER_BOUNDS);
            }
            onUpdate({ LOCATION_REVEAL_COOLDOWN: value });
          }}
        />
      </Row>
    </>
  );
}
