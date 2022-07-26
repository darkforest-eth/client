import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LobbyPlanet, PLANET_TYPE_NAMES, SelectMultipleFrom } from '../Panes/Lobby/LobbiesUtils';
import { SelectFrom } from './CoreUI';
import Select from 'react-select';
import { Checkbox, NumberInput, DarkForestCheckbox, DarkForestNumberInput } from './Input';
import styled from 'styled-components';
import { TooltipName, WorldCoords } from '@darkforest_eth/types';
import stringify from 'json-stable-stringify';
import dfstyles from '../Styles/dfstyles';
import { PortalTooltipTrigger, TooltipTrigger } from '../Panes/Tooltip';
import { Sub, White } from './Text';

export interface PlanetPropEditorProps {
  selectedPlanet: LobbyPlanet;
  canAddPlanets: boolean;
  targetPlanetsEnabled: boolean;
  spawnPlanetsEnabled: boolean;
  blockEnabled: boolean;
  stagedPlanets: LobbyPlanet[];
  root: string;
  excludePlanetTypes?: planetInputType[];
  onChange: (planet: LobbyPlanet) => void;
}

export type planetInputType =
  | 'x'
  | 'y'
  | 'level'
  | 'planetType'
  | 'isSpawnPlanet'
  | 'isTargetPlanet'
  | 'blockedPlanetLocs';

interface TitleInfo {
  title: string;
  description: JSX.Element;
}
const displayProperties: TitleInfo[] = [
  { title: 'x', description: <span>The position of the planet on the x-axis</span> },
  { title: 'y', description: <span>The position of the planet on the y-axis</span> },
  {
    title: 'Level',
    description:
    <span>Larger planets have more energy and can send resources farther. But they take more energy to capture.</span>,
  },
  {
    title: 'Type',
    description: (
      <div style ={{display: 'flex', flexDirection: 'column'}}>
        <Sub><White>Planets</White> are the most basic type of celestial body.</Sub>
        <Sub><White>Asteroid Fields</White> have half the defense of a planet, but produce silver.</Sub>
        <Sub><White>Foundries</White> contain artifacts that can be discovered by players.</Sub>
        <Sub><White>Spacetime Rips</White> withdraw and deposit artifacts and points.</Sub>
        <Sub><White>Quasars</White> have no energy regen but store lots of energy and silver.</Sub>
      </div>
    ),
  },
  { title: 'Target?', description: <span>If target planets are active, you must capture and fill a target planet with energy to win.</span> },
  { title: 'Spawn?', description: <span>If spawn planets are active, players can only spawn on admin-created Spawn planets.</span> },
  { title: 'Blocked Spawns', description: <span>The player who initializes on a blocked spawn planet cannot move to this planet.</span> },
];

export const PlanetPropEditor: React.FC<PlanetPropEditorProps> = ({
  selectedPlanet,
  canAddPlanets,
  targetPlanetsEnabled,
  spawnPlanetsEnabled,
  blockEnabled,
  stagedPlanets,
  excludePlanetTypes,
  root,
  onChange,
}) => {
  const history = useHistory();

  function planetInput(value: planetInputType, index: number) {
    let content = null;
    if (value == 'x' || value == 'y') {
      content = (
        <NumberInput
          format='integer'
          value={selectedPlanet[value]}
          onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
            onChange({ ...selectedPlanet, [value]: e.target.value });
          }}
        />
      );
    } else if (value == 'level') {
      content = (
        // if we use a Select instead of an Input, we can enforce a max + min level value client-side
        <SelectFrom
          wide={false}
          style={{ padding: '5px' }}
          values={[...Array(10).keys()].map((i) => i.toString())}
          labels={[...Array(10).keys()].map((i) => i.toString())}
          value={selectedPlanet.level.toString()}
          setValue={(value) => onChange({ ...selectedPlanet, level: parseInt(value) })}
        />
      );
    } else if (value == 'planetType') {
      content = (
        <SelectFrom
          wide={false}
          style={{ padding: '5px' }}
          values={PLANET_TYPE_NAMES}
          labels={PLANET_TYPE_NAMES}
          value={PLANET_TYPE_NAMES[selectedPlanet.planetType]}
          setValue={(value) =>
            onChange({ ...selectedPlanet, planetType: PLANET_TYPE_NAMES.indexOf(value) })
          }
        />
      );
    } else if (value == 'isTargetPlanet') {
      {
        targetPlanetsEnabled
          ? (content = (
              <Checkbox
                checked={selectedPlanet.isTargetPlanet}
                onChange={() => {
                  onChange({
                    ...selectedPlanet,
                    isTargetPlanet: !selectedPlanet.isTargetPlanet,
                  });
                }}
              />
            ))
          : (content = (
              <Hoverable onClick={() => history.push(`${root}/settings/arena`)}>Enable</Hoverable>
            ));
      }
    } else if (value == 'isSpawnPlanet') {
      {
        spawnPlanetsEnabled
          ? (content = (
              <Checkbox
                checked={selectedPlanet.isSpawnPlanet}
                onChange={() => {
                  onChange({
                    ...selectedPlanet,
                    isSpawnPlanet: !selectedPlanet.isSpawnPlanet,
                  });
                }}
              />
            ))
          : (content = (
              <Hoverable onClick={() => history.push(`${root}/settings/spawn`)}>Enable</Hoverable>
            ));
      }
    } else if (value == 'blockedPlanetLocs') {
      const options = stagedPlanets.reduce(
        (total, curr) =>
          curr.isSpawnPlanet ? [...total, { label: `(${curr.x},${curr.y})`, value: curr }] : total,
        []
      );
      const value = selectedPlanet.blockedPlanetLocs.map((loc) => ({
        label: `(${loc.x},${loc.y})`,
        value: loc,
      }));

      {
        blockEnabled
          ? (content = (
              <Select
                styles={{
                  container: (provided, state) => ({ ...provided, width: '100%' }),
                  control: (provided, state) => ({
                    ...provided,
                    background: `${dfstyles.colors.background}`,
                    color: `${dfstyles.colors.subtext}`,
                    borderRadius: '4px',
                    border: `1px solid ${dfstyles.colors.border}`,
                    padding: '2px 6px',
                    cursor: 'pointer',
                  }),
                  input: (provided, state) => ({
                    ...provided,
                    color: `${dfstyles.colors.subtext}`,
                  }),
                  valueContainer: (provided, state) => ({ ...provided, padding: '0px ' }),
                  indicatorSeparator: (provided, state) => ({ ...provided, display: 'none' }),
                  indicatorsContainer: (provided, state) => ({ padding: 'none' }),
                  menu: (provided, state) => ({
                    ...provided,
                    color: `${dfstyles.colors.subtext}`,
                  }),
                  menuList: (provided, state) => ({
                    ...provided,
                    color: `${dfstyles.colors.text}`,
                    background:
                      options.length > 0 ? `${dfstyles.colors.backgroundlight}` : `#5B1522`,
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    background: !state.isFocused
                      ? `${dfstyles.colors.backgroundlight}`
                      : `${dfstyles.colors.backgroundlighter}`,
                  }),
                  multiValue: (provided, state) => ({
                    ...provided,
                    color: `${dfstyles.colors.text}`,
                    background: `${dfstyles.colors.backgroundlighter}`,
                  }),
                  multiValueLabel: (provided, state) => ({
                    ...provided,
                    background: `${dfstyles.colors.backgroundlight}`,
                    color: `${dfstyles.colors.text}`,
                  }),
                }}
                name='Blocked Spawns'
                options={options}
                isMulti
                value={value}
                onChange={(selected: any) =>
                  onChange({
                    ...selectedPlanet,
                    blockedPlanetLocs: selected.map(
                      (block: { label: string; value: LobbyPlanet }) => block.value
                    ),
                  })
                }
              />
            ))
          : (content = (
              <Hoverable onClick={() => history.push(`${root}/settings/game`)}>Enable</Hoverable>
            ));
      }
    } else {
      content = (
        <Checkbox
          checked={(selectedPlanet as any)[value]}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) => {
            onChange({ ...selectedPlanet, [value]: e.target.checked });
          }}
        />
      );
    }

    return (
      <InputRow
        key={`input-row-${index}`}
        style={value == 'blockedPlanetLocs' && blockEnabled ? { flexDirection: 'column' } : {}}
      >
        {
          displayProperties[index] ?
            <PortalTooltipTrigger
            name={TooltipName.Empty}
            extraContent={displayProperties[index].description}
            style={{ width: '100%' }}
          >
            <LabeledInput>{displayProperties[index].title}</LabeledInput>
          </PortalTooltipTrigger>
          :
          null
        }
        {content}
      </InputRow>
    );
  }

  if (!canAddPlanets) return <></>;

  return (
    <>
      {Object.keys(selectedPlanet).map(
        (value: planetInputType, index: number) =>
          !(excludePlanetTypes && excludePlanetTypes.includes(value)) && planetInput(value, index)
      )}
    </>
  );
};

export const InputRow = styled.div`
  display: flex;
  align-items: center;
`;

export const LabeledInput = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Hoverable = styled.div`
  cursor: pointer;
  background: transparent;
  padding: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.07);
  }
`;
