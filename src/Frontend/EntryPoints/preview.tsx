import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Biome, LocatablePlanet, PlanetLevel, PlanetType, SpaceType } from '@darkforest_eth/types';
import { PlanetPreviewImage } from '../Panes/PlanetPreview';
import _ from 'lodash';

const StyledPreview = styled.div`
  display: inline-block;
  canvas {
    border: 1px solid black;
    background: black;
  }
`;

const myPlanet = {
  location: {
    coords: { x: 0, y: 0 },
    hash: '00000000018ace6c47809b66f2392c1c1de0ad88251d882fd3f4168eb41dd26d',
    perlin: 10,
    biomebase: 8,
  },

  locationId: '00000000018ace6c47809b66f2392c1c1de0ad88251d882fd3f4168eb41dd26d',
  perlin: 10,
  spaceType: SpaceType.DEEP_SPACE,

  planetLevel: 6,
  planetType: PlanetType.PLANET,

  biome: Biome.CORRUPTED,
  destroyed: false,
} as unknown as LocatablePlanet;

function Preview({ type, biome, level }: { type: PlanetType; biome: Biome; level: PlanetLevel }) {
  const [planet, setPlanet] = useState<LocatablePlanet>({ ...myPlanet });

  // workaround to deal with https://github.com/darkforest-eth/darkforest/issues/1062
  useEffect(() => {
    setTimeout(() => {
      myPlanet.planetType = type;
      myPlanet.biome = biome;
      myPlanet.planetLevel = level;
      setPlanet({ ...myPlanet });
    }, Math.random() * 2000 + 100);
  }, [type, biome, level]);

  return (
    <div>
      <StyledPreview>
        <PlanetPreviewImage selected={planet} size={512} />;
      </StyledPreview>
    </div>
  );
}

const StyledPreviewPage = styled.div`
  div.row {
    display: flex;
    flex-direction: row;
    width: fit-content;

    overflow-x: scroll;
    width: max-content;
  }
`;

function PreviewPage() {
  return (
    <StyledPreviewPage>
      <div className='row'>
        {_.range(PlanetLevel.MIN, PlanetLevel.MAX + 1).map((level) => (
          <Preview type={PlanetType.PLANET} biome={Biome.CORRUPTED} level={level} key={level} />
        ))}
      </div>
    </StyledPreviewPage>
  );
}

ReactDOM.render(<PreviewPage />, document.getElementById('root'));
