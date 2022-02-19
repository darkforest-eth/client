import React from 'react';
import { DarkForestNumberInput, NumberInput } from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSlider, Slider } from '../../Components/Slider';
import { LobbiesPaneProps, SAFE_UPPER_BOUNDS } from './LobbiesUtils';

export function PlanetPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <span>Planet rarity:</span>
        <NumberInput
          value={config.PLANET_RARITY}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            let { value } = e.target;
            if (typeof value === 'number') {
              // TODO: Validate this against `1` through `SAFE_UPPER_BOUNDS` and present the user with a warning/error
              value = Math.max(value, 0);
              value = Math.min(value, SAFE_UPPER_BOUNDS);
            }
            onUpdate({ PLANET_RARITY: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Slider
          label='Maximum natural planet level'
          variant='filled'
          min={0}
          max={9}
          value={config.MAX_NATURAL_PLANET_LEVEL}
          step={1}
          onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) =>
            onUpdate({ MAX_NATURAL_PLANET_LEVEL: e.target.value })
          }
        />
      </Row>
    </>
  );
}
