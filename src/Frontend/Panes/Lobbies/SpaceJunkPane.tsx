import _ from 'lodash';
import React from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { DarkForestSlider, Slider } from '../../Components/Slider';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

function JunkPerLevel({
  value,
  index,
  onUpdate,
}: LobbiesPaneProps & { index: number; value: number | undefined }) {
  return (
    <div>
      <span>Level {index}</span>
      <NumberInput
        format='integer'
        value={value}
        onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
          onUpdate({ type: 'PLANET_LEVEL_JUNK', index, value: e.target.value });
        }}
      />
    </div>
  );
}

const rowChunkSize = 5;
const junkRowStyle = { gap: '8px' } as CSSStyleDeclaration & React.CSSProperties;

export function SpaceJunkPane({ config, onUpdate }: LobbiesPaneProps) {
  let spaceJunkOptions = null;
  if (config.SPACE_JUNK_ENABLED.currentValue === true) {
    const junk = _.chunk(config.PLANET_LEVEL_JUNK.displayValue, rowChunkSize).map(
      (items, rowIdx) => {
        return (
          <Row key={`junk-row-${rowIdx}`} style={junkRowStyle}>
            {items.map((displayValue, idx) => (
              <JunkPerLevel
                key={`junk-lvl-${idx}`}
                config={config}
                value={displayValue}
                index={rowIdx * rowChunkSize + idx}
                onUpdate={onUpdate}
              />
            ))}
          </Row>
        );
      }
    );
    spaceJunkOptions = (
      <>
        <Row>
          <span>Player space junk maximum</span>
          <NumberInput
            format='integer'
            value={config.SPACE_JUNK_LIMIT.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              onUpdate({ type: 'SPACE_JUNK_LIMIT', value: e.target.value });
            }}
          />
        </Row>
        <Row>
          <Warning>{config.SPACE_JUNK_LIMIT.warning}</Warning>
        </Row>
        <Row>
          <Slider
            label='Abandon speed boost bonus'
            variant='filled'
            min={1}
            max={11}
            value={config.ABANDON_SPEED_CHANGE_PERCENT.displayValue}
            step={0.1}
            formatOptions={{ style: 'unit', unit: 'x' }}
            onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) => {
              onUpdate({ type: 'ABANDON_SPEED_CHANGE_PERCENT', value: e.target.value });
            }}
          />
        </Row>
        <Row>
          <Warning>{config.ABANDON_SPEED_CHANGE_PERCENT.warning}</Warning>
        </Row>
        <Row>
          <Slider
            label='Abandon range boost bonus'
            variant='filled'
            min={1}
            max={11}
            value={config.ABANDON_RANGE_CHANGE_PERCENT.displayValue}
            step={0.1}
            formatOptions={{ style: 'unit', unit: 'x' }}
            onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) => {
              onUpdate({ type: 'ABANDON_RANGE_CHANGE_PERCENT', value: e.target.value });
            }}
          />
        </Row>
        <Row>
          <Warning>{config.ABANDON_RANGE_CHANGE_PERCENT.warning}</Warning>
        </Row>
        <Row>
          <span>Default junk for each planet level</span>
        </Row>
        {junk}
        <Row>
          <Warning>{config.PLANET_LEVEL_JUNK.warning}</Warning>
        </Row>
      </>
    );
  }
  return (
    <>
      <Row>
        <Checkbox
          label='Space junk enabled?'
          checked={config.SPACE_JUNK_ENABLED.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onUpdate({ type: 'SPACE_JUNK_ENABLED', value: e.target.checked });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.SPACE_JUNK_ENABLED.warning}</Warning>
      </Row>
      {spaceJunkOptions}
    </>
  );
}
