import React from 'react';
import { DarkForestNumberInput, NumberInput } from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSliderHandle, Slider, SliderHandle } from '../../Components/Slider';
import { LobbiesPaneProps } from './LobbiesUtils';

export function PlayerSpawnPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Slider min={0} max={32} step={1} variant='range' label='Spawn perlin range'>
          <SliderHandle
            slot='handle'
            name='perlin-min'
            label='Perlin minimum'
            value={config.INIT_PERLIN_MIN}
            max='next'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              let { value } = e.target;
              if (value === config.INIT_PERLIN_MAX) {
                value = value - 1;
                // To keep the underlying component in sync with our reset
                e.target.value = value;
              }
              onUpdate({ INIT_PERLIN_MIN: value });
            }}
          />
          <SliderHandle
            slot='handle'
            name='perlin-max'
            label='Perlin maximum'
            value={config.INIT_PERLIN_MAX}
            min='previous'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              let { value } = e.target;
              if (value === config.INIT_PERLIN_MIN) {
                value = value + 1;
                // To keep the underlying component in sync with our reset
                e.target.value = value;
              }
              onUpdate({ INIT_PERLIN_MAX: value });
            }}
          />
        </Slider>
      </Row>
      <Row>
        {/* TODO: Explain this better in Help content */}
        <span>Equivalent spawnable radius</span>
        <NumberInput
          value={config.SPAWN_RIM_AREA ? Math.sqrt(config.SPAWN_RIM_AREA / Math.PI) : undefined}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            let { value } = e.target;
            if (typeof value === 'number') {
              // TODO: Validate this against 1000 and present the user with a warning/error
              value = Math.max(value, 0);
              // Using 1 billion instead of SAFE_UPPER_BOUNDS because math is done against this and don't want to lose precision
              value = Math.min(value, 1_000_000_000);
              value = Math.PI * value ** 2;
            }
            onUpdate({ SPAWN_RIM_AREA: value });
          }}
        />
      </Row>
    </>
  );
}
