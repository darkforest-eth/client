import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSlider, Slider } from '../../Components/Slider';
import { PortalTooltipTrigger } from '../Tooltip';
import { LobbiesPaneProps } from './LobbiesUtils';

export function TargetPlanetPane({ config: config, onUpdate: onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <PortalTooltipTrigger
          name={TooltipName.Empty}
          extraContent={'When enabled, players must capture target planets to win the match.'}
          style={{ width: '100%' }}
        >
          <Checkbox
            label='Players win by capturing admin designated target planets?'
            checked={config.TARGET_PLANETS.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
              onUpdate({ type: 'TARGET_PLANETS', value: e.target.checked })
            }
          />
        </PortalTooltipTrigger>
      </Row>
      {config.TARGET_PLANETS.displayValue && (
        <Row>
          <PortalTooltipTrigger
            name={TooltipName.Empty}
            extraContent={
              "To win, players must fill each target planet with this percent of the planet's total energy cap."
            }
            style={{ width: '100%' }}
          >
            <Slider
              label='Percent energy needed to claim victory'
              variant='filled'
              min={1}
              max={100}
              value={config.CLAIM_VICTORY_ENERGY_PERCENT.displayValue}
              step={1}
              formatOptions={{ style: 'unit', unit: '%' }}
              onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) => {
                onUpdate({ type: 'CLAIM_VICTORY_ENERGY_PERCENT', value: e.target.value });
              }}
            />
          </PortalTooltipTrigger>
        </Row>
      )}
      {config.TARGET_PLANETS.displayValue && (
        <Row>
          <PortalTooltipTrigger
            name={TooltipName.Empty}
            extraContent={
              'To win, players must capture at least this number of target planets and fill each of them with energy.'
            }
            style={{ width: '100%' }}
          >
            <span>Number of targets required for victory:</span>
            <NumberInput
              value={config.TARGETS_REQUIRED_FOR_VICTORY.displayValue}
              onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
                onUpdate({ type: 'TARGETS_REQUIRED_FOR_VICTORY', value: e.target.value });
              }}
            />
          </PortalTooltipTrigger>
        </Row>
      )}
    </>
  );
}
