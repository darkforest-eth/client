import React from 'react';
import { Checkbox, DarkForestCheckbox } from '../../Components/Input';
import { Row } from '../../Components/Row';
import { LobbiesPaneProps } from './LobbiesUtils';

export function AdminPermissionsPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <Row>
      <Checkbox
        label='Admin can add planets?'
        checked={config.ADMIN_CAN_ADD_PLANETS}
        onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
          onUpdate({ ADMIN_CAN_ADD_PLANETS: e.target.checked })
        }
      />
    </Row>
  );
}
