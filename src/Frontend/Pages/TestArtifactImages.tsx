import { EMPTY_ARTIFACT_ID } from '@darkforest_eth/constants';
import { ArtifactFileColor, artifactFileName, setForceAncient } from '@darkforest_eth/gamelogic';
import { ArtifactRarity, ArtifactType, Biome } from '@darkforest_eth/types';
import React, { useEffect } from 'react';
import styled from 'styled-components';
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

const basicArtifacts = Object.values(ArtifactType).filter(
  (type) => type >= ArtifactType.Monolith && type <= ArtifactType.Pyramid
);
const relicArtifacts = Object.values(ArtifactType).filter(
  (type) => type >= ArtifactType.Wormhole && type <= ArtifactType.BlackDomain
);

const knownTypes = Object.values(ArtifactType).filter((type) => type !== ArtifactType.Unknown);
const knownBiomes = Object.values(Biome).filter((biome) => biome !== Biome.UNKNOWN);
const knownRarities = Object.values(ArtifactRarity).filter(
  (rarity) => rarity !== ArtifactRarity.Unknown
);

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
              id: EMPTY_ARTIFACT_ID,
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
      {basicArtifacts.map((type) => (
        <div key={type}>
          {knownRarities.map((rarity) => (
            <Row key={rarity}>
              {knownBiomes.map((biome, i) => (
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
      {relicArtifacts.map((type) => (
        <Row key={type}>
          {knownRarities.map((rarity, i) => (
            <ArtifactPreviewer
              key={i}
              type={type}
              biome={Biome.OCEAN}
              rarity={rarity}
              thumb={THUMB}
            />
          ))}
        </Row>
      ))}
      <h1>Ancient</h1>
      {knownTypes.map((type) => (
        <Row key={type}>
          {knownRarities.map((rarity, i) => (
            <ArtifactPreviewer
              key={i}
              type={type}
              biome={Biome.OCEAN}
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
