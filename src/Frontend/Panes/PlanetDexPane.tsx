import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { formatNumber } from '@darkforest_eth/gamelogic';
import {
  getPlanetClass,
  getPlanetCosmetic,
  getPlanetName,
  rgbStr,
} from '@darkforest_eth/procedural';
import { engineConsts } from '@darkforest_eth/renderer';
import { ModalName, Planet, PlanetType, RGBVec } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPlanetRank } from '../../Backend/Utils/Utils';
import { CenterBackgroundSubtext, Spacer } from '../Components/CoreUI';
import { Icon, IconType } from '../Components/Icons';
import { Sub } from '../Components/Text';
import { useUIManager } from '../Utils/AppHooks';
import { ModalPane } from '../Views/ModalPane';
import { PlanetLink } from '../Views/PlanetLink';
import { SortableTable } from '../Views/SortableTable';

const StyledPlanetThumb = styled.div<{ iconColor?: string }>`
  width: 20px;
  height: 20px;
  position: relative;
  line-height: 0;
  z-index: 1;

  /* Set the Icon color if specified on the outer component */
  --df-icon-color: ${({ iconColor }) => iconColor};
`;

const PlanetElement = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlanetName = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;

const TableContainer = styled.div`
  overflow-y: scroll;
`;

export function PlanetThumb({ planet }: { planet: Planet }) {
  const radius = 5 + 2 * planet.planetLevel;
  // const radius = 5 + 3 * PlanetLevel.MAX;
  const { speed, range, defense } = engineConsts.colors.belt;
  const { baseStr } = getPlanetCosmetic(planet);

  const ringColor = (): string => {
    const myClass = getPlanetClass(planet);
    const myColor: RGBVec = [defense, range, speed][myClass];
    return rgbStr(myColor);
  };

  const ringW = radius * 1.5;
  const ringH = Math.max(2, ringW / 7);

  if (planet.planetType === PlanetType.SILVER_MINE) {
    return (
      <StyledPlanetThumb iconColor={baseStr}>
        <Icon type={IconType.Silver} />
      </StyledPlanetThumb>
    );
  } else if (planet.planetType === PlanetType.SILVER_BANK) {
    return (
      <StyledPlanetThumb iconColor={baseStr}>
        <Icon type={IconType.SilverGrowth} />
      </StyledPlanetThumb>
    );
  } else if (planet.planetType === PlanetType.RUINS) {
    return (
      <StyledPlanetThumb iconColor={baseStr}>
        <Icon type={IconType.Artifact} />
      </StyledPlanetThumb>
    );
  } else if (planet.planetType === PlanetType.TRADING_POST) {
    return (
      <StyledPlanetThumb iconColor={baseStr}>
        <Icon type={IconType.Withdraw} />
      </StyledPlanetThumb>
    );
  }

  return (
    <StyledPlanetThumb>
      <PlanetElement>
        <div
          style={{
            width: radius + 'px',
            height: radius + 'px',
            borderRadius: radius / 2 + 'px',
            background: baseStr,
          }}
        />
      </PlanetElement>
      <PlanetElement>
        <div
          style={{
            width: ringW + 'px',
            height: ringH + 'px',
            borderRadius: ringW * 2 + 'px',
            background: getPlanetRank(planet) > 0 ? ringColor() : 'none',
          }}
        />
      </PlanetElement>
    </StyledPlanetThumb>
  );
}

function HelpContent() {
  return (
    <div>
      <p>These are all the planets you currently own.</p>
      <Spacer height={8} />
      <p>
        The table is interactive, and allows you to sort the planets by clicking each column's
        header. You can also navigate to a planet that you own by clicking on its name. The planet
        you click will be centered at the spot on the screen where the current planet you have
        selected is located.
      </p>
    </div>
  );
}

export function PlanetDexPane({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const uiManager = useUIManager();
  const [planets, setPlanets] = useState<Planet[]>([]);

  // update planet list on open / close
  useEffect(() => {
    if (!uiManager) return;
    const myAddr = uiManager.getAccount();
    if (!myAddr) return;
    const ownedPlanets = uiManager.getAllOwnedPlanets().filter((planet) => planet.owner === myAddr);
    setPlanets(ownedPlanets);
  }, [visible, uiManager]);

  // refresh planets every 10 seconds
  useEffect(() => {
    if (!uiManager) return;
    if (!visible) return;

    const refreshPlanets = () => {
      if (!uiManager) return;
      const myAddr = uiManager.getAccount();
      if (!myAddr) return;
      const ownedPlanets = uiManager
        .getAllOwnedPlanets()
        .filter((planet) => planet.owner === myAddr);
      setPlanets(ownedPlanets);
    };

    const intervalId = setInterval(refreshPlanets, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [visible, uiManager]);

  const headers = ['', 'Planet Name', 'Level', 'Energy', 'Silver', 'Inventory'];
  const alignments: Array<'r' | 'c' | 'l'> = ['r', 'l', 'r', 'r', 'r', 'r'];

  const columns = [
    (planet: Planet) => <PlanetThumb planet={planet} />,
    (planet: Planet) => (
      <PlanetLink planet={planet}>
        <PlanetName>{getPlanetName(planet)}</PlanetName>
      </PlanetLink>
    ),
    (planet: Planet) => <Sub>{planet.planetLevel}</Sub>,
    (planet: Planet) => <Sub>{formatNumber(planet.energy)}</Sub>,
    (planet: Planet) => <Sub>{formatNumber(planet.silver)}</Sub>,
    (planet: Planet) => <Sub>{formatNumber(planet.heldArtifactIds.length)}</Sub>,
  ];

  const sortingFunctions = [
    // thumb
    (_a: Planet, _b: Planet): number => 0,
    // name
    (a: Planet, b: Planet): number => {
      const [nameA, nameB] = [getPlanetName(a), getPlanetName(b)];
      return nameA.localeCompare(nameB);
    },
    // level
    (a: Planet, b: Planet): number => b.planetLevel - a.planetLevel,
    // energy
    (a: Planet, b: Planet): number => b.energy - a.energy,
    // silver
    (a: Planet, b: Planet): number => b.silver - a.silver,
    // artifacts
    (a: Planet, b: Planet): number => {
      const [numArtifacts, scoreB] = [a.heldArtifactIds.length, b.heldArtifactIds.length];
      return scoreB - numArtifacts;
    },
  ];

  let content;

  if (planets.length === 0) {
    content = (
      <CenterBackgroundSubtext width={RECOMMENDED_MODAL_WIDTH} height='100px'>
        Loading Your Home Planet...
      </CenterBackgroundSubtext>
    );
  } else {
    content = (
      <TableContainer>
        <SortableTable
          paginated={true}
          rows={planets}
          headers={headers}
          columns={columns}
          sortFunctions={sortingFunctions}
          alignments={alignments}
        />
      </TableContainer>
    );
  }

  return (
    <ModalPane
      visible={visible}
      onClose={onClose}
      id={ModalName.PlanetDex}
      title='Planet Dex'
      helpContent={HelpContent}
    >
      {content}
    </ModalPane>
  );
}
