import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { Planet, PlanetType } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  blocksLeftToProspectExpiration,
  isFindable,
  isProspectable,
} from '../../Backend/GameLogic/ArrivalUtils';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { formatNumber, getPlanetRank } from '../../Backend/Utils/Utils';
import { CenterBackgroundSubtext, Padded, Spacer } from '../Components/CoreUI';
import { ArtifactIcon, SilverGrowthIcon, SilverIcon, WithdrawIcon } from '../Components/Icons';
import { Green, Sub } from '../Components/Text';
import { engineConsts } from '../Renderers/GameRenderer/EngineConsts';
import { RGBVec } from '../Renderers/GameRenderer/EngineTypes';
import { useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';
import { PlanetLink } from '../Views/PlanetLink';
import { SortableTable } from '../Views/SortableTable';

const StyledPlanetThumb = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  line-height: 0;
  z-index: -1;
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

const ColorIcon = styled.span<{ color: string }>`
  path {
    fill: ${({ color }) => color} !important;
  }
`;

const TableContainer = styled.div`
  max-height: 300px;
  height: 300px;
  overflow-y: scroll;
`;

export function PlanetThumb({ planet }: { planet: Planet }) {
  const radius = 5 + 2 * planet.planetLevel;
  // const radius = 5 + 3 * PlanetLevel.MAX;
  const { speed, range, defense } = engineConsts.colors.belt;
  const { baseStr } = ProcgenUtils.getPlanetCosmetic(planet);

  const ringColor = (): string => {
    const myClass = ProcgenUtils.getPlanetClass(planet);
    const myColor: RGBVec = [defense, range, speed][myClass];
    return ProcgenUtils.rgbStr(myColor);
  };

  const ringW = radius * 1.5;
  const ringH = Math.max(2, ringW / 7);

  if (planet.planetType === PlanetType.SILVER_MINE) {
    return (
      <StyledPlanetThumb>
        <ColorIcon color={baseStr}>
          <SilverIcon />
        </ColorIcon>
      </StyledPlanetThumb>
    );
  } else if (planet.planetType === PlanetType.SILVER_BANK) {
    return (
      <StyledPlanetThumb>
        <ColorIcon color={baseStr}>
          <SilverGrowthIcon />
        </ColorIcon>
      </StyledPlanetThumb>
    );
  } else if (planet.planetType === PlanetType.RUINS) {
    return (
      <StyledPlanetThumb>
        <ColorIcon color={baseStr}>
          <ArtifactIcon />
        </ColorIcon>
      </StyledPlanetThumb>
    );
  } else if (planet.planetType === PlanetType.TRADING_POST) {
    return (
      <StyledPlanetThumb>
        <ColorIcon color={baseStr}>
          <WithdrawIcon />
        </ColorIcon>
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

function DexEntryProspectable({ planet }: { planet: Planet }) {
  return <span>{isProspectable(planet) ? <Green>yes</Green> : <Sub>no</Sub>}</span>;
}

function DexEntryProspectExpires({ planet }: { planet: Planet }) {
  const uiManager = useUIManager();
  const currentBlockNumber = useEmitterValue(uiManager.getEthConnection().blockNumber$, undefined);

  if (
    planet.prospectedBlockNumber === undefined ||
    currentBlockNumber === undefined ||
    !isFindable(planet, currentBlockNumber)
  ) {
    return <Sub>n/a</Sub>;
  }

  return (
    <span>{blocksLeftToProspectExpiration(currentBlockNumber, planet.prospectedBlockNumber)}</span>
  );
}

function boolToNum(b: boolean) {
  return b ? 1 : 0;
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
        selected is centered.
      </p>
    </div>
  );
}

export function PlanetDexPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const currentBlockNumber = useEmitterValue(uiManager.getEthConnection().blockNumber$, undefined);
  const [visible, _setVisible] = hook;
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
  }, [uiManager]);

  const headers = ['', 'Planet Name', 'Level', 'Energy', 'Silver', 'Artifacts', 'Prospect', 'Find'];
  const alignments: Array<'r' | 'c' | 'l'> = ['r', 'l', 'r', 'r', 'r', 'r', 'r', 'r'];

  const columns = [
    (planet: Planet) => <PlanetThumb planet={planet} />,
    (planet: Planet) => (
      <PlanetLink planet={planet}>
        <PlanetName>{ProcgenUtils.getPlanetName(planet)}</PlanetName>
      </PlanetLink>
    ),
    (planet: Planet) => <Sub>{planet.planetLevel}</Sub>,
    (planet: Planet) => <Sub>{formatNumber(planet.energy)}</Sub>,
    (planet: Planet) => <Sub>{formatNumber(planet.silver)}</Sub>,
    (planet: Planet) => <Sub>{formatNumber(planet.heldArtifactIds.length)}</Sub>,
    (planet: Planet) => <DexEntryProspectable planet={planet} />,
    (planet: Planet) => <DexEntryProspectExpires planet={planet} />,
  ];

  const sortingFunctions = [
    // thumb
    (_a: Planet, _b: Planet): number => 0,
    // name
    (a: Planet, b: Planet): number => {
      const [nameA, nameB] = [ProcgenUtils.getPlanetName(a), ProcgenUtils.getPlanetName(b)];
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
    // prospectable
    (a: Planet, b: Planet): number => {
      return boolToNum(isProspectable(b)) - boolToNum(isProspectable(a));
    },
    // findable
    (a: Planet, b: Planet): number => {
      if (currentBlockNumber === undefined) return 0;
      return (
        blocksLeftToProspectExpiration(currentBlockNumber, b.prospectedBlockNumber) -
        blocksLeftToProspectExpiration(currentBlockNumber, a.prospectedBlockNumber)
      );
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
      hook={hook}
      title='Planet Dex'
      name={ModalName.PlanetDex}
      width='unset'
      helpContent={HelpContent}
    >
      <Padded>{content}</Padded>
    </ModalPane>
  );
}
