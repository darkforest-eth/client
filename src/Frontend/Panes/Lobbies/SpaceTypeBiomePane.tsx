import React from 'react';
import { Checkbox, DarkForestCheckbox } from '../../Components/Input';
import { Row } from '../../Components/Row';
import {
  DarkForestSlider,
  DarkForestSliderHandle,
  Slider,
  SliderHandle,
} from '../../Components/Slider';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

export function SpaceTypeBiomePane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Checkbox
          label='Mirror space type and biome on x-axis?'
          checked={config.PERLIN_MIRROR_X.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ type: 'PERLIN_MIRROR_X', value: e.target.checked })
          }
        />
      </Row>
      <Row>
        <Warning>{config.PERLIN_MIRROR_X.warning}</Warning>
      </Row>
      <Row>
        <Checkbox
          label='Mirror space type and biome on y-axis?'
          checked={config.PERLIN_MIRROR_Y.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ type: 'PERLIN_MIRROR_Y', value: e.target.checked })
          }
        />
      </Row>
      <Row>
        <Warning>{config.PERLIN_MIRROR_Y.warning}</Warning>
      </Row>
      <Row>
        <Slider
          label='Size of space types'
          labelVisibility='text'
          variant='filled'
          min={5}
          max={14}
          value={config.PERLIN_LENGTH_SCALE.displayValue}
          step={1}
          onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) =>
            onUpdate({ type: 'PERLIN_LENGTH_SCALE', value: e.target.value })
          }
        />
      </Row>
      <Row>
        <Warning>{config.PERLIN_LENGTH_SCALE.warning}</Warning>
      </Row>
      <Row>
        <Slider min={0} max={32} step={1} variant='range' label='Space type thresholds'>
          <SliderHandle
            slot='handle'
            name='space'
            label='Space'
            value={config.PERLIN_THRESHOLD_1.displayValue}
            step={1}
            max='next'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              onUpdate({ type: 'PERLIN_THRESHOLD_1', value: e.target.value });
            }}
          />
          <SliderHandle
            slot='handle'
            name='deep-space'
            label='Deep Space'
            value={config.PERLIN_THRESHOLD_2.displayValue}
            step={1}
            min='previous'
            max='next'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              onUpdate({ type: 'PERLIN_THRESHOLD_2', value: e.target.value });
            }}
          />
          <SliderHandle
            slot='handle'
            name='dead-space'
            label='Dead Space'
            value={config.PERLIN_THRESHOLD_3.displayValue}
            step={1}
            min='previous'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              onUpdate({ type: 'PERLIN_THRESHOLD_3', value: e.target.value });
            }}
          />
        </Slider>
      </Row>
      <Row>
        <Warning>
          {config.PERLIN_THRESHOLD_1.warning ||
            config.PERLIN_THRESHOLD_2.warning ||
            config.PERLIN_THRESHOLD_3.warning}
        </Warning>
      </Row>
      <Row>
        <Slider min={0} max={32} step={1} variant='range' label='Biome thresholds'>
          <SliderHandle
            slot='handle'
            name='biome-threshold-1'
            label='Biome threshold 1'
            value={config.BIOME_THRESHOLD_1.displayValue}
            step={1}
            max='next'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              onUpdate({ type: 'BIOME_THRESHOLD_1', value: e.target.value });
            }}
          />
          <SliderHandle
            slot='handle'
            name='biome-threshold-2'
            label='Biome threshold 2'
            value={config.BIOME_THRESHOLD_2.displayValue}
            step={1}
            min='previous'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              onUpdate({ type: 'BIOME_THRESHOLD_2', value: e.target.value });
            }}
          />
        </Slider>
      </Row>
      <Row>
        <Warning>{config.BIOME_THRESHOLD_1.warning || config.BIOME_THRESHOLD_2.warning}</Warning>
      </Row>
    </>
  );
}
