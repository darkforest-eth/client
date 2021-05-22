import { EMPTY_LOCATION_ID } from '@darkforest_eth/constants';
import { ArtifactType, Biome, ArtifactRarity } from '@darkforest_eth/types';
import _ from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import {
  ArtifactFileColor,
  artifactFileName,
  setForceAncient,
} from '../../Backend/GameLogic/ArtifactUtils';
import { ARTIFACT_URL } from '../Components/ArtifactImage';

const Container = styled.div`
  width: fit-content;
  overflow-x: scroll;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: fit-content;
`;

function ArtifactPreviewer({
  type,
  biome,
  rarity,
  ancient,
  thumb,
}: {
  type: ArtifactType;
  biome: Biome;
  rarity: ArtifactRarity;
  ancient?: boolean;
  thumb: boolean;
}) {
  return (
    <video width={250} loop autoPlay key={type + '-' + biome + '-' + rarity + 'vid'}>
      <source
        src={
          ARTIFACT_URL +
          artifactFileName(
            true,
            thumb,
            {
              artifactType: type,
              planetBiome: biome,
              rarity,
              id: EMPTY_LOCATION_ID,
            },
            ArtifactFileColor.BLUE,
            { forceAncient: ancient === true, skipCaching: true }
          )
        }
        type={'video/webm'}
      />
    </video>
  );
}

const THUMB = false;
export function TestArtifactImages() {
  useEffect(() => {
    setForceAncient(false);
  }, []);
  return (
    <Container>
      <h1>Artifacts</h1>
      {_.range(ArtifactType.Monolith, ArtifactType.Pyramid + 1).map((type) => (
        <div key={type}>
          {_.range(ArtifactRarity.Common, ArtifactRarity.Mythic + 1).map((rarity) => (
            <Row key={rarity}>
              {_.range(Biome.MIN, Biome.MAX + 1).map((biome, i) => (
                <ArtifactPreviewer
                  key={i}
                  type={type}
                  biome={biome}
                  rarity={rarity}
                  thumb={THUMB}
                />
              ))}
            </Row>
          ))}
        </div>
      ))}
      <h1>Relics</h1>
      {_.range(ArtifactType.Wormhole, ArtifactType.BlackDomain + 1).map((type) => (
        <Row key={type}>
          {_.range(ArtifactRarity.Common, ArtifactRarity.Mythic + 1).map((rarity, i) => (
            <ArtifactPreviewer key={i} type={type} biome={1} rarity={rarity} thumb={THUMB} />
          ))}
        </Row>
      ))}
      <h1>Ancient</h1>
      {_.range(ArtifactType.MIN, ArtifactType.MAX + 1).map((type) => (
        <Row key={type}>
          {_.range(ArtifactRarity.Common, ArtifactRarity.Mythic + 1).map((rarity, i) => (
            <ArtifactPreviewer
              key={i}
              type={type}
              biome={1}
              rarity={rarity}
              ancient
              thumb={THUMB}
            />
          ))}
        </Row>
      ))}
    </Container>
  );
}
