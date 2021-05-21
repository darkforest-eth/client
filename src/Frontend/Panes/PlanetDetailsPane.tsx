import { BiomeNames, PlanetTypeNames, Planet } from '@darkforest_eth/types';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { getPlanetRank } from '../../Backend/Utils/Utils';
import { isLocatable } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext, Spacer, Underline } from '../Components/CoreUI';
import { Sub } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { PlanetScape } from '../Renderers/PlanetscapeRenderer/PlanetScape';
import dfstyles from '../Styles/dfstyles';
import { useUIManager, useSelectedPlanet, useAccount } from '../Utils/AppHooks';
import { HAT_SIZES } from '../Utils/constants';
import { ModalHook, ModalName, ModalPane, RECOMMENDED_WIDTH } from '../Views/ModalPane';
import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { ReadMore } from '../Components/ReadMore';
import { TOGGLE_PLANET_DETAILS_PANE } from '../Utils/ShortcutConstants';

const StyledPlanetDetailsPane = styled.div``;

const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  & > span:nth-child(2n) {
    text-align: right;
  }
`;

const DetailsRowSingle = styled(DetailsRow)`
  & > span {
    &:last-child {
      margin-left: 0.5em;
    }
  }
  margin-bottom: 2px;
`;

const PlanetName = styled.div`
  color: white;
  font-weight: bold;
`;

const PlanetNameSubtitle = styled.div`
  color: ${dfstyles.colors.subtext};
  margin-bottom: 8px;
`;

const LeftHalf = styled.div`
  width: 50%;
  display: inline-block;
`;

const RightHalf = styled.div`
  padding-left: 16px;
  width: 50%;
  display: inline-block;
`;

function planetTitleWithBiome(selected: Planet): string | undefined {
  if (!selected) {
    return;
  }

  const planetType = PlanetTypeNames[selected.planetType];

  if (isLocatable(selected)) {
    const biome = BiomeNames[selected.biome];
    return `${biome} ${planetType}`;
  }

  return planetType;
}

/**
 * The ui that is shown when the user clicks the question mark icon in the modal's title bar.
 */
function HelpContent() {
  return (
    <div>
      <p>
        This pane contains a proceduraly generated description of the selected planet, along with
        some basic planet stats.
      </p>
      <Spacer height={8} />
      <p>
        You can open and close this pane using the keyboard key "
        <Underline>{TOGGLE_PLANET_DETAILS_PANE}</Underline>".
      </p>
    </div>
  );
}

export function PlanetDetailsPane({ hook, hatHook }: { hook: ModalHook; hatHook: ModalHook }) {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager).value;
  const account = useAccount(uiManager);
  const [planetOwnerTwitter, setPlanetOwnerTwitter] = useState<string | undefined>(undefined);

  const windowName = 'Planet Details';

  useEffect(() => {
    if (!selected) {
      setPlanetOwnerTwitter(undefined);
      return;
    }
    setPlanetOwnerTwitter(uiManager.getTwitter(selected.owner));
  }, [uiManager, selected]);

  let content;

  if (selected) {
    content = (
      <StyledPlanetDetailsPane>
        <PlanetName>{ProcgenUtils.getPlanetName(selected)}</PlanetName>
        <PlanetNameSubtitle>
          Level {selected.planetLevel}, Rank {getPlanetRank(selected)}{' '}
          {planetTitleWithBiome(selected)}
        </PlanetNameSubtitle>

        <PlanetScape planet={selected} />
        <Spacer height={8} />

        <div>
          <ReadMore height={'5em'}>
            <Sub>
              {ProcgenUtils.getPlanetTagline(selected)}.
              <Spacer height={8} />
              {ProcgenUtils.getPlanetBlurb(selected)}
            </Sub>
          </ReadMore>
        </div>

        <LeftHalf>
          <DetailsRowSingle className='margin-top' style={{ marginTop: '1em' }}>
            <Sub>Owner</Sub>
            <span>
              {selected ? (
                planetOwnerTwitter ? (
                  '@' + planetOwnerTwitter
                ) : selected.owner === EMPTY_ADDRESS ? (
                  'Unclaimed'
                ) : (
                  <TextPreview text={selected.owner} />
                )
              ) : (
                '0'
              )}
            </span>
          </DetailsRowSingle>

          <DetailsRowSingle>
            <Sub>Hash</Sub>
            <TextPreview text={selected.locationId} />
          </DetailsRowSingle>
        </LeftHalf>

        <RightHalf>
          <DetailsRowSingle>
            <Sub>Hat</Sub>
            <span>
              {HAT_SIZES[selected ? selected.hatLevel : 0]}{' '}
              {selected && selected && selected.owner === account && (
                <Btn onClick={() => hatHook[1](true)}>
                  {selected.hatLevel > 0 ? 'Upgrade' : 'Buy'}
                </Btn>
              )}
            </span>
          </DetailsRowSingle>
          {selected && selected.silverGrowth > 0 && (
            <DetailsRowSingle>
              <Sub>Silver Growth</Sub>
              <span>{selected.silverGrowth.toFixed(2)}</span>
            </DetailsRowSingle>
          )}
          {isLocatable(selected) && (
            <DetailsRowSingle>
              <Sub>Coords</Sub>
              <span>{`(${selected.location.coords.x}, ${selected.location.coords.y})`}</span>
            </DetailsRowSingle>
          )}
        </RightHalf>
      </StyledPlanetDetailsPane>
    );
  } else {
    content = (
      <CenterBackgroundSubtext width='100%' height='75px'>
        Select a Planet
      </CenterBackgroundSubtext>
    );
  }
  return (
    <ModalPane
      hook={hook}
      title={windowName}
      name={ModalName.PlanetDetails}
      helpContent={HelpContent}
      width={RECOMMENDED_WIDTH}
    >
      {content}
    </ModalPane>
  );
}
