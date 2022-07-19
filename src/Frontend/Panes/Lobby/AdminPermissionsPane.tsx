import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
import { Checkbox, DarkForestCheckbox } from '../../Components/Input';
import { Row } from '../../Components/Row';
import { PortalTooltipTrigger } from '../Tooltip';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

export function AdminPermissionsPane({ config, onUpdate }: LobbiesPaneProps) {
  const checkboxes = [];
  return (
    <>
      <Row>
        <PortalTooltipTrigger
          name={TooltipName.Empty}
          extraContent={
            'When admin is disabled, no players can access admin controls once the world is created.'
          }
          style={{ width: '100%' }}
        >
          <Checkbox
            label='Admin disabled?'
            checked={config.NO_ADMIN.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
              onUpdate({ type: 'NO_ADMIN', value: e.target.checked })
            }
          />
        </PortalTooltipTrigger>
      </Row>
      <Row>
        <Warning>{config.NO_ADMIN.warning}</Warning>
      </Row>

      {/* <Row>
        <Checkbox
          label='Admin can add planets?'
          checked={config.ADMIN_CAN_ADD_PLANETS.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ type: 'ADMIN_CAN_ADD_PLANETS', value: e.target.checked })
          }
        />
      </Row> */}
      {/* <Row>
        <Warning>{config.ADMIN_CAN_ADD_PLANETS.warning}</Warning>
      </Row> */}
      <Row>
        <Checkbox
          label='Allowlist enabled?'
          checked={config.WHITELIST_ENABLED.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ type: 'WHITELIST_ENABLED', value: e.target.checked })
          }
        />
      </Row>
      {/* <Row>
        <Warning>{config.WHITELIST_ENABLED.warning}</Warning>
      </Row> */}
      <Row>
        <PortalTooltipTrigger
          name={TooltipName.Empty}
          extraContent={'When enabled, this match will contribute to the players ranking'}
          style={{ width: '100%' }}
        >
          <Checkbox
            label='Ranked match?'
            checked={config.RANKED.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
              onUpdate({ type: 'RANKED', value: e.target.checked })
            }
          />
        </PortalTooltipTrigger>
      </Row>
      <Row>
        <Warning>{config.RANKED.warning}</Warning>
      </Row>
    </>
  );
}
