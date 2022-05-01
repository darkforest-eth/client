import _ from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { LobbyAdminTools } from '../../../Backend/Utils/LobbyAdminTools';
import { Btn } from '../../Components/Btn';
import { Spacer, Title } from '../../Components/CoreUI';
import { Minimap } from '../../Components/Minimap';
import { Row } from '../../Components/Row';
import { Smaller, Sub } from '../../Components/Text';
import { stockConfig } from '../../Utils/StockConfigs';
import { MinimapConfig } from './MinimapUtils';
import {
  LobbyAction, lobbyConfigInit, LobbyInitializers
} from './Reducer';

const jcFlexEnd = { justifyContent: 'flex-end' } as CSSStyleDeclaration & React.CSSProperties;

const ButtonRow = styled(Row)`
  gap: 8px;

  .button {
    flex: 1 1 50%;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

const mapSize = '125px';
export function MapSelectPane({
  startingConfig,
  updateConfig,
  lobbyAdminTools,
  createDisabled,
  lobbyContent,
  root
}: {
  startingConfig: LobbyInitializers;
  updateConfig: React.Dispatch<LobbyAction>;
  lobbyAdminTools: LobbyAdminTools | undefined;
  createDisabled : boolean;
  lobbyContent: JSX.Element;
  root : string
}) {

  const history = useHistory();

  function pickMap(initializers: LobbyInitializers, active: number) {
    updateConfig({ type: 'RESET', value: lobbyConfigInit(initializers) });
  }

  function generateMinimapConfig(config: LobbyInitializers): MinimapConfig {
    return {
      worldRadius: config.WORLD_RADIUS_MIN,
      key: config.SPACETYPE_KEY,
      scale: config.PERLIN_LENGTH_SCALE,
      mirrorX: config.PERLIN_MIRROR_X,
      mirrorY: config.PERLIN_MIRROR_Y,
      perlinThreshold1: config.PERLIN_THRESHOLD_1,
      perlinThreshold2: config.PERLIN_THRESHOLD_2,
      perlinThreshold3: config.PERLIN_THRESHOLD_3,
      stagedPlanets: config.ADMIN_PLANETS || [],
      createdPlanets: lobbyAdminTools?.planets || [],
      dot: 10,
    } as MinimapConfig;
  }

  interface map {
    title: string;
    initializers: LobbyInitializers;
    description: string;
  }

  const maps: map[] = [
    {
      title: '(1P) Solo Mission',
      initializers: stockConfig.onePlayerRace,
      description: 'Race across the universe!',
    },
    {
      title: '(4P) Battle for the Center',
      initializers: stockConfig.fourPlayerBattle,
      description: 'Win the planet in the center!',
    },
    {
      title: '(2P) Race',
      initializers: stockConfig.sprint,
      description: 'Sprint for the target!',
    },
    {
      title: 'Custom',
      initializers: startingConfig,
      description: 'Design your own game',
    },
  ];

  const Maps = _.chunk(maps, 2).map((items, idx) => (
    <ButtonRow key={`map-row-${idx}`}>
      {items.map((item, j) => (
        <Btn
          disabled = {createDisabled}
          key={`map-item-${j}`}
          className='button'
          size={'stretch'}
          onClick={() => pickMap(item.initializers, idx + j)}
        >
          <div style={{ flexDirection: 'column' }}>
            <Minimap
              style={{ height: mapSize, width: mapSize }}
              minimapConfig={generateMinimapConfig(item.initializers)}
            />
            <div>{item.title}</div>
            <Smaller>{item.description}</Smaller>
            <br />
            <Smaller>
              <Sub>radius: {item.initializers.WORLD_RADIUS_MIN}</Sub>
            </Smaller>
          </div>
        </Btn>
      ))}
    </ButtonRow>
  ));

  const content = (
      <>
        <Title slot='title'>Select Map</Title>
        <div>
          Welcome to Dark Forest Arena! First, choose your map. Then, either customize or create your world!
        </div>
        <div>
          Once your world is created, you will create your custom planets and enter the universe!
        </div>
        <Spacer height={20} />

        {Maps}
        <Spacer height={20} />

        <Row style={jcFlexEnd}>
          <Btn onClick = {() => history.push(`${root}/settings`)}>Customize World →</Btn>
        </Row>
        {lobbyContent}
      </>
    );

  return content;
}
