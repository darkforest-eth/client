import React from 'react';
import { DarkForestNumberInput, NumberInput } from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSliderHandle, Slider, SliderHandle } from '../../Components/Slider';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

export function PlayerSpawnPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Slider min={0} max={32} step={1} variant='range' label='Spawn perlin range'>
          <SliderHandle
            slot='handle'
            name='perlin-min'
            label='Perlin minimum'
            value={config.INIT_PERLIN_MIN.displayValue}
            step={1}
            max='next'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              onUpdate({ type: 'INIT_PERLIN_MIN', value: e.target.value });
            }}
          />
          <SliderHandle
            slot='handle'
            name='perlin-max'
            label='Perlin maximum'
            value={config.INIT_PERLIN_MAX.displayValue}
            step={1}
            min='previous'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              onUpdate({ type: 'INIT_PERLIN_MAX', value: e.target.value });
            }}
          />
        </Slider>
      </Row>
      <Row>
        <Warning>{config.INIT_PERLIN_MIN.warning || config.INIT_PERLIN_MAX.warning}</Warning>
      </Row>
      <Row>
        {/* TODO: Explain this better in Help content */}
        <span>Equivalent spawnable radius</span>
        <NumberInput
          value={config.SPAWN_RIM_AREA.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'SPAWN_RIM_AREA', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.SPAWN_RIM_AREA.warning}</Warning>
      </Row>
    </>
  );
}
