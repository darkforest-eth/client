import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { Planet, PlanetType } from '@darkforest_eth/types';
import { reduce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Btn } from '../Components/Btn';
import styled from 'styled-components';
import {
  blocksLeftToProspectExpiration,
  isFindable,
  isProspectable,
} from '../../Backend/GameLogic/ArrivalUtils';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { formatNumber, getPlanetRank } from '../../Backend/Utils/Utils';
import { CenterBackgroundSubtext, Padded, Spacer } from '../Components/CoreUI';
import { Icon, IconType } from '../Components/Icons';
import { Green, Sub, Text, Smaller } from '../Components/Text';
import { engineConsts } from '../Renderers/GameRenderer/EngineConsts';
import { RGBVec } from '../Renderers/GameRenderer/EngineTypes';
import { useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';
import { PlanetLink } from '../Views/PlanetLink';
import { SortableTable } from '../Views/SortableTable';
import { Table } from '../Views/Table';

const StyledPlanetThumb = styled.div<{ iconColor?: string }>`
  width: 20px;
  height: 20px;
  position: relative;
  line-height: 0;
  z-index: -1;

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

const WeaponElement = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  max-height: 300px;
  height: 300px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  min-width: 450px;
`;

const PlanetName = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;

const TableContainer = styled.div`
  max-height: 300px;
  height: 300px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
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
      <p>Each round, you get one use of a Special Weapon.</p>
      <Spacer height={8} />
      <p>
        Choose the secret weapon you want to use and choose a target planet. Press submit and the
        special weapon will take effect.
      </p>
    </div>
  );
}

export function SpecialsPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const currentBlockNumber = useEmitterValue(uiManager.getEthConnection().blockNumber$, undefined);
  const [visible, _setVisible] = hook;
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [currentWeapon, setCurrentWeapon] = useState<number | undefined>();
  const [currentPlanet, setCurrentPlanet] = useState<Planet | undefined>();
  // update planet list on open / close
  useEffect(() => {
    if (!uiManager) return;
    const myAddr = uiManager.getAccount();
    if (!myAddr) return;
    const ownedPlanets = uiManager.getAllOwnedPlanets().filter((planet) => planet.owner === myAddr);
    setPlanets(ownedPlanets);
    // setCurrentPlanet(uiManager.getMouseDownPlanet());
    window.addEventListener('mousedown', e => {
      setCurrentPlanet(uiManager.getMouseDownPlanet());
    });

    return () => window.removeEventListener('mousedown', e => {
      setCurrentPlanet(uiManager.getMouseDownPlanet())});
  }, [visible, uiManager]); 

  // const handleClick = (this: Window, e : React.MouseEvent) => {
  //   e.preventDefault();
  //   setCurrentPlanet(uiManager.getSelectedPlanet());
  // }
  const handleChoice = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setCurrentWeapon(index);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("handle submit")
    if(!currentPlanet) return;
    if(currentWeapon == undefined) return;
    let planetId = currentPlanet.locationId;
    uiManager.useSpecial(planetId, currentWeapon)    
  }

  interface weapon {
    title: string;
    description: string;
    key: number;
  }

  const weapons: weapon[] = [
    {
      title: 'Hijack',
      description: 'Instantly take over any planet',
      key: 0,
    },
    {
      title: 'Destroy',
      description: 'Blow up any planet',
      key: 1,
    },
    {
      title: 'Strike Gold',
      description: 'Max out energy and silver on any planet',
      key: 2,
    },
  ];
  const headers = ['Weapon', '  ', 'Description', ''];
  const alignments: Array<'l' | 'c' | 'r'> = ['l', 'l', 'l', 'r'];

  const columns = [
    (weapon: weapon) => <Sub>{weapon.title}</Sub>,
    () => <Sub>  </Sub>,
    (weapon: weapon) => <Smaller>{weapon.description}</Smaller>,
    (weapon: weapon) => (
      <Btn
        onClick={(e) => handleChoice(e, weapon.key)}
        style={currentWeapon == weapon.key ? { color: 'red' } : undefined}
      >
        Select
      </Btn>
    ),
  ];

  const planetHeaders = ['', 'Target Planet', 'Level', 'Energy', 'Silver'];
  const planetAlignments: Array<'r' | 'c' | 'l'> = ['r', 'l', 'r', 'r', 'r'];
  const planetColumns = [
    (planet: Planet) => <PlanetThumb planet={planet} />,
    (planet: Planet) => (
      <PlanetLink planet={planet}>
        <PlanetName>{ProcgenUtils.getPlanetName(planet)}</PlanetName>
      </PlanetLink>
    ),
    (planet: Planet) => <Sub>{planet.planetLevel}</Sub>,
    (planet: Planet) => <Sub>{formatNumber(planet.energy)}</Sub>,
    (planet: Planet) => <Sub>{formatNumber(planet.silver)}</Sub>,
  ];


  let content;

  content = (
    <Container>
      <TableContainer>
        <Table
          rows={weapons}
          headers={headers}
          columns={columns}
          // sortFunctions={sortingFunctions}
          alignments={alignments}
        />
      </TableContainer>
      <br/>
      <hr/>
      {currentPlanet ? 
        <TableContainer>
          <Table
            rows={[currentPlanet]}
            headers={planetHeaders}
            columns={planetColumns}
            alignments={planetAlignments}
          />
      </TableContainer> :
        <Text>No Planet Selected</Text>}
      <Btn disabled = {currentWeapon == undefined || !currentPlanet} onClick = {e => handleSubmit(e)}>Confirm Special Attack</Btn>
    </Container>
    // <Container>

    //     {weapons.map(w => weapon(w.title, w.key, w.description))}

    // </Container>
  );
  // if (planets.length === 0) {
  //   content = (
  //     <CenterBackgroundSubtext width={RECOMMENDED_MODAL_WIDTH} height='100px'>
  //       Loading Your Home Planet...
  //     </CenterBackgroundSubtext>
  //   );
  // } else {
  //   content = (
  //     <TableContainer>
  //       <SortableTable
  //         rows={planets}
  //         headers={headers}
  //         columns={columns}
  //         sortFunctions={sortingFunctions}
  //         alignments={alignments}
  //       />
  //     </TableContainer>
  //   );
  // }

  return (
    <ModalPane
      hook={hook}
      title='Special Weapons'
      name={ModalName.PlanetDex}
      width='unset'
      helpContent={HelpContent}
    >
      <Padded>{content}</Padded>
    </ModalPane>
  );
}
