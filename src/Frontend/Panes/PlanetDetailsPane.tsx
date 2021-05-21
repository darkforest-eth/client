import React from 'react';
import styled from 'styled-components';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { isLocatable } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext, Spacer, Underline } from '../Components/CoreUI';
import { Coords, Sub } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { PlanetScape } from '../Renderers/PlanetscapeRenderer/PlanetScape';
import dfstyles from '../Styles/dfstyles';
import { useUIManager, useSelectedPlanet, useAccount } from '../Utils/AppHooks';
import { ModalHook, ModalName, ModalPane, RECOMMENDED_WIDTH } from '../Views/ModalPane';
import { ReadMore } from '../Components/ReadMore';
import { TOGGLE_PLANET_DETAILS_PANE } from '../Utils/ShortcutConstants';
import { LevelRankText, PlanetBiomeTypeLabel, PlanetOwnerLabel } from '../Components/PlanetLabels';

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

  const windowName = 'Planet Details';

  let content;

  if (selected) {
    content = (
      <StyledPlanetDetailsPane>
        <PlanetName>{ProcgenUtils.getPlanetName(selected)}</PlanetName>
        <PlanetNameSubtitle>
          <LevelRankText planet={selected} /> <PlanetBiomeTypeLabel planet={selected} />
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
              <PlanetOwnerLabel planet={selected} showYours color />
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
              {selected && ProcgenUtils.getHatSizeName(selected)}{' '}
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
              <span>
                <Coords coords={selected.location.coords} />
              </span>
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
