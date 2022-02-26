import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSlider, Slider } from '../../Components/Slider';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

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
          value={config.TIME_FACTOR_HUNDREDTHS.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) => {
            onUpdate({ type: 'TIME_FACTOR_HUNDREDTHS', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.TIME_FACTOR_HUNDREDTHS.warning}</Warning>
      </Row>
      <Row>
        <Checkbox
          label='Planet transfer enabled?'
          checked={config.PLANET_TRANSFER_ENABLED.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onUpdate({ type: 'PLANET_TRANSFER_ENABLED', value: e.target.checked });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.PLANET_TRANSFER_ENABLED.warning}</Warning>
      </Row>
      <Row>
        <span>Location reveal cooldown (in seconds)</span>
        <NumberInput
          value={config.LOCATION_REVEAL_COOLDOWN.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'LOCATION_REVEAL_COOLDOWN', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.LOCATION_REVEAL_COOLDOWN.warning}</Warning>
      </Row>
      <Row>
        {/* It is a little weird that this is in Game Settings, but I'd rather keep other scoring grouped */}
        <span>Amount of points for each silver withdrawn</span>
        <NumberInput
          format='float'
          value={config.SILVER_SCORE_VALUE.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'SILVER_SCORE_VALUE', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.SILVER_SCORE_VALUE.warning}</Warning>
      </Row>
    </>
  );
}
