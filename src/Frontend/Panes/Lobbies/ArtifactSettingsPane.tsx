import { ArtifactRarity } from '@darkforest_eth/types';
import React from 'react';
import { DarkForestNumberInput, NumberInput } from '../../Components/Input';
import { ArtifactRarityLabel } from '../../Components/Labels/ArtifactLabels';
import { Row } from '../../Components/Row';
import { LobbiesPaneProps, SAFE_UPPER_BOUNDS } from './LobbiesUtils';

function ArtifactPointsPerRarity({ config, idx, onUpdate }: LobbiesPaneProps & { idx: number }) {
  // We can skip Unknown
  if (idx === 0) {
    return null;
  }

  return (
    <div>
      {/* TODO: We should have a utility that converts an integer into an ArtifactRarity safely  */}
      <ArtifactRarityLabel rarity={idx as ArtifactRarity} />
      <NumberInput
        format='integer'
        value={config.ARTIFACT_POINT_VALUES[idx]}
        onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
          const points: typeof config.ARTIFACT_POINT_VALUES = [...config.ARTIFACT_POINT_VALUES];
          let { value } = e.target;

          if (typeof value === 'number') {
            value = Math.max(value, 0);
            value = Math.min(value, SAFE_UPPER_BOUNDS);
            points[idx] = value;
          } else {
            // @ts-expect-error Because we can't nest Partial on these tuples
            points[idx] = undefined;
          }

          onUpdate({ ARTIFACT_POINT_VALUES: points });
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
          value={config.PHOTOID_ACTIVATION_DELAY}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            let { value } = e.target;
            if (typeof value === 'number') {
              value = Math.max(value, 0);
              value = Math.min(value, SAFE_UPPER_BOUNDS);
            }
            onUpdate({ PHOTOID_ACTIVATION_DELAY: value });
          }}
        />
      </Row>
      <Row style={pointsRowStyle}>
        <span>Artifact point values by rarity</span>
      </Row>
      <Row>
        {config.ARTIFACT_POINT_VALUES.map((_, idx) => (
          <ArtifactPointsPerRarity
            key={`artifact-points-row-${idx}`}
            config={config}
            idx={idx}
            onUpdate={onUpdate}
          />
        ))}
      </Row>
    </>
  );
}
