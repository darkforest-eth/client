import _ from 'lodash';
import React from 'react';
import { DarkForestNumberInput, NumberInput } from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSlider, Slider } from '../../Components/Slider';
import { Sub } from '../../Components/Text';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

const rowChunkSize = 5;
const rowStyle = { gap: '8px' } as CSSStyleDeclaration & React.CSSProperties;
// Handling the non-input lvl 0 by calculating the items in the row
const itemStyle = { flex: `1 1 ${Math.floor(100 / rowChunkSize)}%` };

function ThresholdByPlanetLevel({
  index,
  value,
  onUpdate,
}: LobbiesPaneProps & { value: number | undefined; index: number }) {
  // The level 0 value can never change
  if (index === 0) {
    return (
      <div style={itemStyle}>
        <span>Level 0</span>
        <div>
          <Sub>{value}</Sub>
        </div>
      </div>
    );
  } else {
    return (
      <div style={itemStyle}>
        <span>Level {index}</span>
        <NumberInput
          format='integer'
          value={value}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'PLANET_LEVEL_THRESHOLDS', index, value: e.target.value });
          }}
        />
      </div>
    );
  }
}

export function PlanetPane({ config, onUpdate }: LobbiesPaneProps) {
  let planetLevelThresholds = null;
  if (config.PLANET_LEVEL_THRESHOLDS.displayValue) {
    planetLevelThresholds = _.chunk(config.PLANET_LEVEL_THRESHOLDS.displayValue, rowChunkSize).map(
      (items, rowIdx) => {
        return (
          <Row key={`threshold-row-${rowIdx}`} style={rowStyle}>
            {items.map((displayValue, idx) => (
              <ThresholdByPlanetLevel
                key={`threshold-lvl-${idx}`}
                config={config}
                value={displayValue}
                index={rowIdx * rowChunkSize + idx}
                onUpdate={onUpdate}
              />
            ))}
          </Row>
        );
      }
    );
  }

  return (
    <>
      <Row>
        <span>Planet rarity:</span>
        <NumberInput
          value={config.PLANET_RARITY.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'PLANET_RARITY', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.PLANET_RARITY.warning}</Warning>
      </Row>
      <Row>
        <Slider
          label='Maximum natural planet level'
          variant='filled'
          min={0}
          max={9}
          value={config.MAX_NATURAL_PLANET_LEVEL.displayValue}
          step={1}
          onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) =>
            onUpdate({ type: 'MAX_NATURAL_PLANET_LEVEL', value: e.target.value })
          }
        />
      </Row>
      <Row>
        <Warning>{config.MAX_NATURAL_PLANET_LEVEL.warning}</Warning>
      </Row>
      <Row>
        <span>Advanced: Frequency of planet levels</span>
      </Row>
      {planetLevelThresholds}
      <Row>
        <Warning>{config.PLANET_LEVEL_THRESHOLDS.warning}</Warning>
      </Row>
    </>
  );
}
