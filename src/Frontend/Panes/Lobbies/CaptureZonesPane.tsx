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

function CaptureZoneScorePerLevel({
  value,
  index,
  onUpdate,
}: LobbiesPaneProps & { value: number | undefined; index: number }) {
  return (
    <div>
      <span>Level {index}</span>
      <NumberInput
        format='integer'
        value={value}
        onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
          onUpdate({ type: 'CAPTURE_ZONE_PLANET_LEVEL_SCORE', value: e.target.value, index });
        }}
      />
    </div>
  );
}

const rowChunkSize = 5;
const rowStyle = { gap: '8px' } as CSSStyleDeclaration & React.CSSProperties;

export function CaptureZonesPane({ config, onUpdate }: LobbiesPaneProps) {
  let captureZoneOptions = null;
  if (config.CAPTURE_ZONES_ENABLED.currentValue === true) {
    const scores = _.chunk(config.CAPTURE_ZONE_PLANET_LEVEL_SCORE.displayValue, rowChunkSize).map(
      (items, rowIdx) => {
        return (
          <Row key={`score-row-${rowIdx}`} style={rowStyle}>
            {items.map((displayValue, idx) => (
              <CaptureZoneScorePerLevel
                key={`score-lvl-${idx}`}
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

    captureZoneOptions = (
      <>
        <Row>
          <span>Radius of each Capture Zone</span>
          <NumberInput
            format='integer'
            value={config.CAPTURE_ZONE_RADIUS.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              onUpdate({ type: 'CAPTURE_ZONE_RADIUS', value: e.target.value });
            }}
          />
        </Row>
        <Row>
          <Slider
            label='Amount of Capture Zones within each 5000 World Radius'
            variant='filled'
            min={1}
            max={10}
            value={config.CAPTURE_ZONES_PER_5000_WORLD_RADIUS.displayValue}
            step={1}
            onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) => {
              onUpdate({ type: 'CAPTURE_ZONES_PER_5000_WORLD_RADIUS', value: e.target.value });
            }}
          />
        </Row>
        <Row>
          <Warning>{config.CAPTURE_ZONES_PER_5000_WORLD_RADIUS.warning}</Warning>
        </Row>
        <Row>
          <Slider
            label='Change Capture Zones every X blocks?'
            variant='filled'
            min={1}
            max={255}
            value={config.CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL.displayValue}
            step={1}
            formatOptions={{ style: 'unit', unit: ' blocks' }}
            onChange={(e: Event & React.ChangeEvent<DarkForestSlider>) => {
              onUpdate({ type: 'CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL', value: e.target.value });
            }}
          />
        </Row>
        <Row>
          <Warning>{config.CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL.warning}</Warning>
        </Row>
        <Row>
          <span>Number of blocks between Invade & Capture</span>
          <NumberInput
            format='integer'
            value={config.CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED.displayValue}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              onUpdate({ type: 'CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED', value: e.target.value });
            }}
          />
        </Row>
        <Row>
          <Warning>{config.CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED.warning}</Warning>
        </Row>
        {scores}
        <Row>
          <Warning>{config.CAPTURE_ZONE_PLANET_LEVEL_SCORE.warning}</Warning>
        </Row>
      </>
    );
  }

  return (
    <>
      <Row>
        <Checkbox
          label='Capture zones enabled?'
          checked={config.CAPTURE_ZONES_ENABLED.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onUpdate({ type: 'CAPTURE_ZONES_ENABLED', value: e.target.checked });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.CAPTURE_ZONES_ENABLED.warning}</Warning>
      </Row>
      {captureZoneOptions}
    </>
  );
}
