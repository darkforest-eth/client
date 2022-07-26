import React from 'react';
import {
    Checkbox,
    DarkForestCheckbox,
    DarkForestNumberInput,
    NumberInput
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

export function TeamsPane({ config, onUpdate }: LobbiesPaneProps) {
  let numTeams = null;
  if (config.TEAMS_ENABLED.displayValue == true) {
    numTeams = (
      <>
        <Row>
          <span>Number of teams:</span>
          <NumberInput
            value={config.NUM_TEAMS.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              onUpdate({ type: 'NUM_TEAMS', value: e.target.value });
            }}
          />
        </Row>
        <Row>
          <Warning>{config.WORLD_RADIUS_MIN.warning}</Warning>
        </Row>
      </>
    );
  }
  return (
    <>
      <Row>
        <Checkbox
          label='Teams enabled?'
          checked={config.TEAMS_ENABLED.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ type: 'TEAMS_ENABLED', value: e.target.checked })
          }
        />
      </Row>
      <Row>
        <Warning>{config.TEAMS_ENABLED.warning}</Warning>
      </Row>
      {numTeams}
    </>
  );
}
