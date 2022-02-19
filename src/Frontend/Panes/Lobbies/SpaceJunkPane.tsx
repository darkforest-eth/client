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
import { LobbiesPaneProps, SAFE_UPPER_BOUNDS } from './LobbiesUtils';

function JunkPerLevel({ config, idx, onUpdate }: LobbiesPaneProps & { idx: number }) {
  return (
    <div>
      <span>Level {idx}</span>
      <NumberInput
        format='integer'
        value={config.PLANET_LEVEL_JUNK[idx]}
        onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
          const junk: typeof config.PLANET_LEVEL_JUNK = [...config.PLANET_LEVEL_JUNK];
          let { value } = e.target;

          if (typeof value === 'number') {
            value = Math.max(value, 0);
            value = Math.min(value, SAFE_UPPER_BOUNDS);
            // TODO: Validate this against the SPACE_JUNK_LIMIT and present the user with a warning/error
            junk[idx] = value;
          } else {
            // @ts-expect-error Because we can't nest Partial on these tuples
            junk[idx] = undefined;
          }

          onUpdate({ PLANET_LEVEL_JUNK: junk });
        }}
      />
    </div>
  );
}

const rowChunkSize = 5;
const junkRowStyle = { gap: '8px' } as CSSStyleDeclaration & React.CSSProperties;

export function SpaceJunkPane({ config, onUpdate }: LobbiesPaneProps) {
  let spaceJunkOptions = null;
  if (config.SPACE_JUNK_ENABLED) {
    const junk = _.chunk(config.PLANET_LEVEL_JUNK, rowChunkSize).map((items, rowIdx) => {
      return (
        <Row key={`junk-row-${rowIdx}`} style={junkRowStyle}>
          {items.map((_, idx) => (
            <JunkPerLevel
              key={`junk-lvl-${idx}`}
              config={config}
              idx={rowIdx * rowChunkSize + idx}
              onUpdate={onUpdate}
            />
          ))}
        </Row>
      );
    });
    spaceJunkOptions = (
      <>
        <Row>
          <span>Player space junk maximum</span>
          <NumberInput
            format='integer'
            value={config.SPACE_JUNK_LIMIT}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              let { value } = e.target;
              if (typeof value === 'number') {
                // TODO: Validate this against the PLANET_LEVEL_JUNK and present the user with a warning/error
                value = Math.max(value, 0);
                value = Math.min(value, SAFE_UPPER_BOUNDS);
              }
              onUpdate({ SPACE_JUNK_LIMIT: value });
            }}
          />
        </Row>
        <Row>
          <Slider
            label='Abandon speed boost bonus'
            variant='filled'
            min={1}
            max={11}
            value={config.ABANDON_SPEED_CHANGE_PERCENT / 100}
            step={0.1}
            formatOptions={{ style: 'unit', unit: 'x' }}
            onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) => {
              onUpdate({ ABANDON_SPEED_CHANGE_PERCENT: e.target.value * 100 });
            }}
          />
        </Row>
        <Row>
          <Slider
            label='Abandon range boost bonus'
            variant='filled'
            min={1}
            max={11}
            value={config.ABANDON_RANGE_CHANGE_PERCENT / 100}
            step={0.1}
            formatOptions={{ style: 'unit', unit: 'x' }}
            onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) => {
              onUpdate({ ABANDON_RANGE_CHANGE_PERCENT: e.target.value * 100 });
            }}
          />
        </Row>
        <Row>
          <span>Default junk for each planet level</span>
        </Row>
        {junk}
      </>
    );
  }
  return (
    <>
      <Row>
        <Checkbox
          label='Space junk enabled?'
          checked={config.SPACE_JUNK_ENABLED}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onUpdate({ SPACE_JUNK_ENABLED: e.target.checked });
          }}
        />
      </Row>
      {spaceJunkOptions}
    </>
  );
}
