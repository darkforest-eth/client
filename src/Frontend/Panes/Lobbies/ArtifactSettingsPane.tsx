import { ArtifactRarity } from '@darkforest_eth/types';
import React from 'react';
import { DarkForestNumberInput, NumberInput } from '../../Components/Input';
import { ArtifactRarityLabel } from '../../Components/Labels/ArtifactLabels';
import { Row } from '../../Components/Row';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';

function ArtifactPointsPerRarity({
  value,
  index,
  onUpdate,
}: LobbiesPaneProps & { value: number | undefined; index: number }) {
  // We can skip Unknown
  if (index === 0) {
    return null;
  }

  return (
    <div>
      {/* TODO: We should have a utility that converts an integer into an ArtifactRarity safely  */}
      <ArtifactRarityLabel rarity={index as ArtifactRarity} />
      <NumberInput
        format='integer'
        value={value}
        onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
          onUpdate({ type: 'ARTIFACT_POINT_VALUES', value: e.target.value, index });
        }}
      />
    </div>
  );
}

const pointsRowStyle = { gap: '8px' } as CSSStyleDeclaration & React.CSSProperties;

export function ArtifactSettingsPane({ config, onUpdate }: LobbiesPaneProps) {
  return (
    <>
      <Row>
        <span>Photoid Cannon activation delay (in seconds)</span>
        <NumberInput
          value={config.PHOTOID_ACTIVATION_DELAY.displayValue}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onUpdate({ type: 'PHOTOID_ACTIVATION_DELAY', value: e.target.value });
          }}
        />
      </Row>
      <Row>
        <Warning>{config.PHOTOID_ACTIVATION_DELAY.warning}</Warning>
      </Row>
      <Row>
        <span>Artifact point values by rarity</span>
      </Row>
      <Row style={pointsRowStyle}>
        {(config.ARTIFACT_POINT_VALUES.displayValue ?? []).map((displayValue, idx) => (
          <ArtifactPointsPerRarity
            key={`artifact-points-row-${idx}`}
            config={config}
            value={displayValue}
            index={idx}
            onUpdate={onUpdate}
          />
        ))}
      </Row>
      <Row>
        <Warning>{config.ARTIFACT_POINT_VALUES.warning}</Warning>
      </Row>
    </>
  );
}
