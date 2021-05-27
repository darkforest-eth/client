import React from 'react';
import styled from 'styled-components';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { isLocatable } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext, Spacer, Underline } from '../Components/CoreUI';
import { Coords, Sub } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import dfstyles from '../Styles/dfstyles';
import { useUIManager, useSelectedPlanet, useAccount } from '../Utils/AppHooks';
import { ModalHook, ModalName, ModalPane, RECOMMENDED_WIDTH } from '../Views/ModalPane';
import { ReadMore } from '../Components/ReadMore';
import { TOGGLE_PLANET_DETAILS_PANE } from '../Utils/ShortcutConstants';
import {
  LevelRankText,
  PlanetBiomeTypeLabelAnim,
  PlanetOwnerLabel,
} from '../Components/Labels/PlanetLabels';
import { Planet } from '@darkforest_eth/types';
import { Wrapper } from '../../Backend/Utils/Wrapper';

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

const Wrap = styled.div`
  width: fit-content;
  height: fit-content;
`;

const ShowWithPlanet = styled(Wrap)<{ planet: Planet | undefined }>`
  display: ${({ planet }) => (planet ? 'block' : 'none')};
`;

const ShowWithoutPlanet = styled(Wrap)<{ planet: Planet | undefined }>`
  display: ${({ planet }) => (planet ? 'none' : 'block')};
`;

const StyledPlanetDetailsPane = styled(ShowWithPlanet)``;

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

function NoPlanet({ selectedWrapper }: { selectedWrapper: Wrapper<Planet | undefined> }) {
  return (
    <ShowWithoutPlanet planet={selectedWrapper.value}>
      <CenterBackgroundSubtext width='100%' height='75px'>
        Select a Planet
      </CenterBackgroundSubtext>
    </ShowWithoutPlanet>
  );
}

function WithPlanet({
  selectedWrapper,
  hatHook,
}: {
  selectedWrapper: Wrapper<Planet | undefined>;
  hatHook: ModalHook;
}) {
  const s = selectedWrapper;
  const uiManager = useUIManager();
  const account = useAccount(uiManager);

  return (
    <StyledPlanetDetailsPane planet={selectedWrapper.value}>
      <PlanetName>{ProcgenUtils.getPlanetName(s.value)}</PlanetName>
      <PlanetNameSubtitle>
        <LevelRankText planet={s.value} /> <PlanetBiomeTypeLabelAnim planet={s.value} />
      </PlanetNameSubtitle>

      {/* <PlanetScape wrapper={s} /> */}
      <Spacer height={8} />

      <div>
        <ReadMore height={'5em'}>
          <Sub>
            {ProcgenUtils.getPlanetTagline(s.value)}.
            <Spacer height={8} />
            {ProcgenUtils.getPlanetBlurb(s.value)}
          </Sub>
        </ReadMore>
      </div>

      <LeftHalf>
        <DetailsRowSingle className='margin-top' style={{ marginTop: '1em' }}>
          <Sub>Owner</Sub>
          <span>
            <PlanetOwnerLabel planet={s.value} showYours color />
          </span>
        </DetailsRowSingle>

        <DetailsRowSingle>
          <Sub>Hash</Sub>
          {s.value && <TextPreview text={s.value.locationId} />}
        </DetailsRowSingle>
      </LeftHalf>

      <RightHalf>
        <DetailsRowSingle>
          <Sub>Hat</Sub>
          <span>
            {s.value && ProcgenUtils.getHatSizeName(s.value)}{' '}
            {s && s.value && s.value.owner === account && (
              <Btn onClick={() => hatHook[1](true)}>{s.value.hatLevel > 0 ? 'Upgrade' : 'Buy'}</Btn>
            )}
          </span>
        </DetailsRowSingle>
        {s.value && s.value.silverGrowth > 0 && (
          <DetailsRowSingle>
            <Sub>Silver Growth</Sub>
            <span>{s.value.silverGrowth.toFixed(2)}</span>
          </DetailsRowSingle>
        )}
        {s.value && isLocatable(s.value) && (
          <DetailsRowSingle>
            <Sub>Coords</Sub>
            <span>
              <Coords coords={s.value.location.coords} />
            </span>
          </DetailsRowSingle>
        )}
      </RightHalf>
    </StyledPlanetDetailsPane>
  );
}

export function PlanetDetailsPane({ hook, hatHook }: { hook: ModalHook; hatHook: ModalHook }) {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager);

  const windowName = 'Planet Details';

  return (
    <ModalPane
      hook={hook}
      title={windowName}
      name={ModalName.PlanetDetails}
      helpContent={HelpContent}
      width={RECOMMENDED_WIDTH}
    >
      <WithPlanet selectedWrapper={selected} hatHook={hatHook} />
      <NoPlanet selectedWrapper={selected} />
    </ModalPane>
  );
}
