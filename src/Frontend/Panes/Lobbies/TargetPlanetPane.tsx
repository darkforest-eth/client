import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSlider, Slider } from '../../Components/Slider';
import { LobbiesPaneProps } from './LobbiesUtils';


export function TargetPlanetPane({ config: config, onUpdate: onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <Checkbox
          label='Players win by capturing admin designated target planets?'
          checked={config.TARGET_PLANETS.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            onUpdate({ type: 'TARGET_PLANETS', value: e.target.checked })
          }
        />
      </Row>
      {config.TARGET_PLANETS.displayValue && (
         <Row>
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
       </Row>
      )}
    </>
  );
}
