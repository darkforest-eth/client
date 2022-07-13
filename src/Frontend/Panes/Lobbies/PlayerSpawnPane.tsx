import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSliderHandle, Slider, SliderHandle } from '../../Components/Slider';
import { PortalTooltipTrigger } from '../Tooltip';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

export function PlayerSpawnPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Checkbox
          label='Players can only spawn into admin designated spawn planets?'
          checked={config.MANUAL_SPAWN.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onUpdate({ type: 'MANUAL_SPAWN', value: e.target.checked });
            if (e.target.checked) {
              onUpdate({ type: 'INIT_PERLIN_MIN', value: 0 });
              onUpdate({ type: 'INIT_PERLIN_MAX', value: 32 });
            } else {
              onUpdate({ type: 'CONFIRM_START', value: false });
            }
          }}
        />
      </Row>
      {config.MANUAL_SPAWN.displayValue && (
        <>
          <Row>
            <PortalTooltipTrigger
              name={TooltipName.Empty}
              extraContent={'When enabled, all players must confirm ready before the game begins.'}
              style={{ width: '100%' }}
            >
              <Checkbox
                label='Players confirm ready before start?'
                checked={config.CONFIRM_START.displayValue}
                onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
                  onUpdate({ type: 'CONFIRM_START', value: e.target.checked })
                }
              />
            </PortalTooltipTrigger>
          </Row>
          <Row>
            <Warning>{config.CONFIRM_START.warning}</Warning>
          </Row>
        </>
      )}
      <Row>
        <PortalTooltipTrigger
          name={TooltipName.Empty}
          extraContent={
            'Players must spawn within the assigned perlin range. Use this to force players to spawn in specific space types (defined in Space type & Biome pane).'
          }
          style={{ width: '100%' }}
        >
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
        </PortalTooltipTrigger>
      </Row>
      <Row>
        <Warning>{config.INIT_PERLIN_MIN.warning || config.INIT_PERLIN_MAX.warning}</Warning>
      </Row>
      <Row>
        <PortalTooltipTrigger
          name={TooltipName.Empty}
          extraContent={'Players must spawn this far from the center of the map (0,0).'}
          style={{ width: '100%' }}
        >
          {/* TODO: Explain this better in Help content */}
          <span>Equivalent spawnable radius</span>
          <NumberInput
            value={config.SPAWN_RIM_AREA.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              onUpdate({ type: 'SPAWN_RIM_AREA', value: e.target.value });
            }}
          />
        </PortalTooltipTrigger>
      </Row>
      <Row>
        <Warning>{config.SPAWN_RIM_AREA.warning}</Warning>
      </Row>
    </>
  );
}
