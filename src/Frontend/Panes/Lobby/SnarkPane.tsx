import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { PortalTooltipTrigger } from '../Tooltip';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

export function SnarkPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <PortalTooltipTrigger
          name={TooltipName.Empty}
          extraContent={'When ZK is disabled, the game generates mock proofs.'}
          style={{ width: '100%' }}
        >
          <Checkbox
            label='Disable ZK?'
            checked={config.DISABLE_ZK_CHECKS.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
              onUpdate({ type: 'DISABLE_ZK_CHECKS', value: e.target.checked });
            }}
          />
        </PortalTooltipTrigger>
      </Row>
      <Row>
        <Warning>{config.DISABLE_ZK_CHECKS.warning}</Warning>
      </Row>
      <Row>
        <PortalTooltipTrigger
          name={TooltipName.Empty}
          extraContent={'Changing this value will alter planet locations on the map.'}
          style={{ width: '100%' }}
        >
          <span>Planet hash key:</span>
          <NumberInput
            value={config.PLANETHASH_KEY.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              onUpdate({ type: 'PLANETHASH_KEY', value: e.target.value });
            }}
          />
        </PortalTooltipTrigger>
      </Row>
      <Row>
        <Warning>{config.PLANETHASH_KEY.warning}</Warning>
      </Row>
      <Row>
        <PortalTooltipTrigger
          name={TooltipName.Empty}
          extraContent={'Changing this value will alter space type locations.'}
          style={{ width: '100%' }}
        >
          <span>Space type key:</span>
          <NumberInput
            value={config.SPACETYPE_KEY.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              onUpdate({ type: 'SPACETYPE_KEY', value: e.target.value });
            }}
          />
        </PortalTooltipTrigger>
      </Row>
      <Row>
        <Warning>{config.SPACETYPE_KEY.warning}</Warning>
      </Row>
      <Row>
        <PortalTooltipTrigger
          name={TooltipName.Empty}
          extraContent={'Changing this value will alter biome locations.'}
          style={{ width: '100%' }}
        >
          <span>Biome base key:</span>
          <NumberInput
            value={config.BIOMEBASE_KEY.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              onUpdate({ type: 'BIOMEBASE_KEY', value: e.target.value });
            }}
          />
        </PortalTooltipTrigger>
      </Row>
      <Row>
        <Warning>{config.BIOMEBASE_KEY.warning}</Warning>
      </Row>
    </>
  );
}
