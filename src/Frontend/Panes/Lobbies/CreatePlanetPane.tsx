import React, { useState } from 'react';
import {
  Checkbox,
  DarkForestCheckbox,
  DarkForestNumberInput,
  NumberInput,
} from '../../Components/Input';
import { Row } from '../../Components/Row';
import { Green, Red, Sub, Subber } from '../../Components/Text';
import { Btn } from '../../Components/Btn';
import { Table } from '../../Views/Table';

import { LobbiesPaneProps, Warning } from './LobbiesUtils';
import styled from 'styled-components';
import { AdminPlanet } from '@darkforest_eth/types';
import _ from 'lodash';

const rowChunkSize = 4;
const rowStyle = { gap: '8px' } as CSSStyleDeclaration & React.CSSProperties;
// Handling the non-input lvl 0 by calculating the items in the row
const itemStyle = { flex: `1 1 ${Math.floor(100 / rowChunkSize)}%` };

const TableContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
`;

function formatBool(bool: boolean) {
  return bool ? <Green>Y</Green> : <Red>N</Red>;
}

const defaultPlanet: AdminPlanet = {
  x: 0,
  y: 0,
  level: 0,
  planetType: 0,
  requireValidLocationId: false,
  revealLocation: true,
  isTargetPlanet: false,
  isSpawnPlanet: false,
};

export function CreatePlanetPane({ config: config, onUpdate: onUpdate }: LobbiesPaneProps) {
  const [planet, setPlanet] = useState<AdminPlanet>(defaultPlanet);

  const headers = ['Coords', 'Level', 'Type', 'Require Valid', 'Reveal', 'Target', 'Spawn', ''];
  const alignments: Array<'r' | 'c' | 'l'> = ['c', 'c', 'c', 'c', 'l', 'l', 'l', 'l'];
  const columns = [
    (planet: AdminPlanet) => (
      <Sub>
        ({planet.x}, {planet.y})
      </Sub>
    ),
    (planet: AdminPlanet) => <Sub>{planet.level}</Sub>,
    (planet: AdminPlanet) => <Sub>{planet.planetType}</Sub>,
    (planet: AdminPlanet) => formatBool(planet.requireValidLocationId),
    (planet: AdminPlanet) => formatBool(planet.revealLocation),
    (planet: AdminPlanet) => formatBool(planet.isTargetPlanet),
    (planet: AdminPlanet) => formatBool(planet.isSpawnPlanet),
    (planet: AdminPlanet, i: number) => (
      <Btn onClick={() => onUpdate({ type: 'ADMIN_PLANETS', value: planet, index: i })}>X</Btn>
    ),
  ];

  function AdminPlanets({ config }: LobbiesPaneProps) {
    const adminPlanets = config.ADMIN_PLANETS.currentValue;
    return adminPlanets && adminPlanets.length > 0 ? (
      <TableContainer>
        <Table
          paginated={true}
          rows={adminPlanets || []}
          headers={headers}
          columns={columns}
          alignments={alignments}
        />
      </TableContainer>
    ) : (
      <Sub>No planets created</Sub>
    );
  }

  function Tips() {
    return (
      <>
        <Row>
          <span>Tips about planet creation</span>
        </Row>
        <Subber>
          <Row>
            Planet types: 0-Planet, 1-Asteroid, 2-Foundry, 3-Spacetime Rip, 4-Phasar
          </Row>
        </Subber>
        <Row>
          <Subber>
            If you want to play with spawn planets activated, you must create at least one revealed Spawn
            Planet
          </Subber>
        </Row>
      </>
    );
  }

  function CreateAdminPlanet(value: string, index: number) {
    // The level 0 value can never change
    return (
      <div style={itemStyle} key={index}>
        <span>{value}</span>
        {value == 'x' || value == 'y' || value == 'level' || value == 'planetType' ? (
          <NumberInput
            format='integer'
            value={planet[value]}
            onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
              setPlanet({ ...planet, [value]: e.target.value });
            }}
          />
        ) : (
          <Checkbox
            checked={(planet as any)[value]}
            onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
              setPlanet({ ...planet, [value]: e.target.checked });
            }}
          />
        )}
      </div>
    );
  }

  let adminPlanetElems;
  if (config.ADMIN_CAN_ADD_PLANETS.displayValue) {
    adminPlanetElems = _.chunk(Object.keys(planet), rowChunkSize).map((items, rowIdx) => {
      return (
        <Row key={`admin-planet-elem-${rowIdx}`} style={rowStyle}>
          {items.map((value, idx) => CreateAdminPlanet(value, rowIdx * rowChunkSize + idx))}
        </Row>
      );
    });
  }
  return (
    <>
      <Row>
        <span>Create Custom Planets</span>
        <Btn
          onClick={() => {
            onUpdate({
              type: 'ADMIN_PLANETS',
              value: planet,
              index: config.ADMIN_PLANETS.displayValue?.length || 0,
            });
            setPlanet(defaultPlanet);
          }}
        >
          Add Planet
        </Btn>
      </Row>
      {adminPlanetElems}
      <Row>
        <Warning>{config.ADMIN_PLANETS.warning}</Warning>
      </Row>
      <br />
      <Row>
        <span>Created Planets</span>
      </Row>
      <Row>
        <AdminPlanets config={config} onUpdate={onUpdate} />
      </Row>
      <hr />
      <Tips />
    </>
  );
}
