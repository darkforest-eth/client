import React from 'react';
import { Checkbox, DarkForestCheckbox } from '../../Components/Input';
import { Row } from '../../Components/Row';
import {
  DarkForestSlider,
  DarkForestSliderHandle,
  Slider,
  SliderHandle,
} from '../../Components/Slider';
import { LobbiesPaneProps } from './LobbiesUtils';

export function SpaceTypeBiomePane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Checkbox
          label='Mirror space type and biome on x-axis?'
          checked={config.PERLIN_MIRROR_X}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ PERLIN_MIRROR_X: e.target.checked })
          }
        />
      </Row>
      <Row>
        <Checkbox
          label='Mirror space type and biome on y-axis?'
          checked={config.PERLIN_MIRROR_Y}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ PERLIN_MIRROR_Y: e.target.checked })
          }
        />
      </Row>
      <Row>
        <Slider
          label='Size of space types'
          labelVisibility='text'
          variant='filled'
          min={5}
          max={14}
          value={Math.log2(config.PERLIN_LENGTH_SCALE)}
          step={1}
          onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) =>
            onUpdate({ PERLIN_LENGTH_SCALE: 2 ** e.target.value })
          }
        />
      </Row>
      <Row>
        <Slider min={0} max={32} step={1} variant='range' label='Space type thresholds'>
          <SliderHandle
            slot='handle'
            name='space'
            label='Space'
            value={config.PERLIN_THRESHOLD_1}
            max='next'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              let { value } = e.target;
              if (value === config.PERLIN_THRESHOLD_2) {
                value = value - 1;
                // To keep the underlying component in sync with our reset
                e.target.value = value;
              }
              onUpdate({ PERLIN_THRESHOLD_1: value });
            }}
          />
          <SliderHandle
            slot='handle'
            name='deep-space'
            label='Deep Space'
            value={config.PERLIN_THRESHOLD_2}
            min='previous'
            max='next'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              let { value } = e.target;
              if (value === config.PERLIN_THRESHOLD_1) {
                value = value + 1;
                // To keep the underlying component in sync with our reset
                e.target.value = value;
              }
              if (value === config.PERLIN_THRESHOLD_3) {
                value = value - 1;
                // To keep the underlying component in sync with our reset
                e.target.value = value;
              }
              onUpdate({ PERLIN_THRESHOLD_2: value });
            }}
          />
          <SliderHandle
            slot='handle'
            name='dead-space'
            label='Dead Space'
            value={config.PERLIN_THRESHOLD_3}
            min='previous'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              let { value } = e.target;
              if (value === config.PERLIN_THRESHOLD_2) {
                value = value + 1;
                // To keep the underlying component in sync with our reset
                e.target.value = value;
              }
              onUpdate({ PERLIN_THRESHOLD_3: value });
            }}
          />
        </Slider>
      </Row>
      <Row>
        <Slider min={0} max={32} step={1} variant='range' label='Biome thresholds'>
          <SliderHandle
            slot='handle'
            name='biome-threshold-1'
            label='Biome threshold 1'
            value={config.BIOME_THRESHOLD_1}
            max='next'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              let { value } = e.target;
              if (value === config.BIOME_THRESHOLD_2) {
                value = value - 1;
                // To keep the underlying component in sync with our reset
                e.target.value = value;
              }
              onUpdate({ BIOME_THRESHOLD_1: value });
            }}
          />
          <SliderHandle
            slot='handle'
            name='biome-threshold-2'
            label='Biome threshold 2'
            value={config.BIOME_THRESHOLD_2}
            min='previous'
            onChange={(e: Event & React.ChangeEvent<DarkForestSliderHandle>) => {
              let { value } = e.target;
              if (value === config.BIOME_THRESHOLD_1) {
                value = value + 1;
                // To keep the underlying component in sync with our reset
                e.target.value = value;
              }
              onUpdate({ BIOME_THRESHOLD_2: value });
            }}
          />
        </Slider>
      </Row>
    </>
  );
}
