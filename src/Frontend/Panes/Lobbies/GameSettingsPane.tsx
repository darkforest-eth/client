import React from 'react';
import {
  ModifierType,
} from '@darkforest_eth/types';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { ModifierText } from '../../Components/Labels/ModifierLabels';
import { Row } from '../../Components/Row';
import { DarkForestSlider, Slider } from '../../Components/Slider';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';
import _ from 'lodash';
import { Sub } from '../../Components/Text';

const rowChunkSize = 4;
const rowStyle = { gap: '8px' } as CSSStyleDeclaration & React.CSSProperties;
const itemStyle = { flex: `1 1 ${Math.floor(100 / rowChunkSize)}%` };

function Modifiers({
  index,
  value,
  onUpdate,
}: LobbiesPaneProps & {  index: number; value: number | undefined }) {
  // The level 0 value can never change
    return (
      <div style={itemStyle}>
        <ModifierText modifier = {index as ModifierType}/>
        <span> (%)</span>
        <NumberInput
          format='integer'
          value={value}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'MODIFIERS', index, value: e.target.value });
          }}
        />
      </div>
    );
}

export function GameSettingsPane({ config, onUpdate }: LobbiesPaneProps) {

  let modifiers =  _.chunk(config.MODIFIERS.displayValue, rowChunkSize).map(
    (items, rowIdx) => {
      return (
        <Row key={`threshold-row-${rowIdx}`} style={rowStyle}>
          {items.map((item, idx) => (
            <Modifiers
              key={`threshold-lvl-${idx}`}
              config={config}
              value={item}
              index={rowIdx * rowChunkSize + idx}
              onUpdate={onUpdate}
            />
          ))}
        </Row>
      );
    }
  );

  return (
    <>
     <Row>
        <Checkbox
          label='Start game paused?'
          checked={config.START_PAUSED.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onUpdate({ type: 'START_PAUSED', value: e.target.checked });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.START_PAUSED.warning}</Warning>
      </Row>
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
        <span>Advanced: Modify game constants</span> <br/>
      </Row>
      <Row>
      <Sub>Input value is a percent of default (100 is normal)</Sub>
      </Row>
      
      {modifiers}
      <Row>
        <Warning>{config.MODIFIERS.warning}</Warning>
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
