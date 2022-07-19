import { BLOCK_EXPLORER_URL } from '@darkforest_eth/constants';
import _, { chunk } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { CreatedPlanet, LobbyAdminTools } from '../../../Backend/Utils/LobbyAdminTools';
import { Link, Spacer } from '../../Components/CoreUI';
import { Row } from '../../Components/Row';
import { Sub } from '../../Components/Text';
import {
  CloseButton,
  CloseButtonStyle,
  LobbiesPaneProps,
  LobbyPlanet,
  mirrorX,
  mirrorY,
} from './LobbiesUtils';
import { InvalidConfigError, LobbyConfigAction, LobbyConfigState, toInitializers } from './Reducer';

const PLANET_TYPE_NAMES = ['Planet', 'Asteroid Field', 'Foundry', 'Spacetime Rip', 'Quasar'];
export function PlanetListPane({
  config,
  onUpdate,
  onPlanetSelect: onPlanetSelect,
  lobbyAdminTools,
  maxPlanetsPerPage = 5,
  selectedIndex,
}: {
  config: LobbyConfigState;
  onUpdate: (change: LobbyConfigAction) => void;
  onPlanetSelect: (index: number) => void;
  lobbyAdminTools: LobbyAdminTools | undefined;
  maxPlanetsPerPage?: number;
  selectedIndex?: number;
}) {
  const [createdPlanets, setCreatedPlanets] = useState<CreatedPlanet[] | undefined>();

  useEffect(() => {
    setCreatedPlanets(lobbyAdminTools?.planets);
  }, [lobbyAdminTools]);

  // <div style={{ ...jcFlexEnd, ...rowStyle }}>
  //       <Btn disabled={!lobbyAdminTools} onClick={async () => await createAndRevealPlanet(i)}>
  //         ✓
  //       </Btn>
  //     </div>

  const StagedPlanetItem: React.FC<{ planet: LobbyPlanet; index: number }> = ({
    planet,
    index,
  }) => {
    const [hoveringPlanet, setHoveringPlanet] = useState<boolean>(false);
    return (
      <StagedPlanetListItem
        onMouseEnter={() => {
          setHoveringPlanet(true);
        }}
        onMouseOver={() => setHoveringPlanet(true)}
        onMouseLeave={() => {
          setHoveringPlanet(false);
        }}
        onClick={() => {
          onPlanetSelect(index);
        }}
        isSelected={index === selectedIndex}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StagedPlanetIcon>
            {PLANET_TYPE_NAMES[planet.planetType] &&
              PLANET_TYPE_NAMES[planet.planetType].charAt(0).toUpperCase()}
          </StagedPlanetIcon>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  color: '#fff',
                }}
              >
                ({planet.x},{planet.y})
              </span>
              {planet.blockedPlanetLocs.length > 0 && (
                <span>
                  🚫 {planet.blockedPlanetLocs.length} planet
                  {planet.blockedPlanetLocs.length > 1 && 's'}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#bbb' }}>Level {planet.level}</span>
              {planet.isSpawnPlanet && (
                <span style={{ color: '#F4BF00', letterSpacing: '0.06em' }}>SPAWN</span>
              )}
              {planet.isTargetPlanet && (
                <span style={{ color: '#FF4163', letterSpacing: '0.06em' }}>TARGET</span>
              )}
            </div>
          </div>
        </div>
        <div>
          {hoveringPlanet && (
            <CloseButton
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                onUpdate({ type: 'ADMIN_PLANETS', value: undefined, index: index });
              }}
            />
          )}
        </div>
      </StagedPlanetListItem>
    );
  };

  function StagedPlanets({ config }: LobbiesPaneProps) {
    const LobbyPlanets = useMemo(() => {
      return config.ADMIN_PLANETS.currentValue ?? [];
    }, [config.ADMIN_PLANETS]);

    const [currentPage, setCurrentPage] = useState<number>(0);

    const visiblePlanets = useMemo(() => {
      const planets = LobbyPlanets.slice(
        currentPage * maxPlanetsPerPage,
        currentPage * maxPlanetsPerPage + maxPlanetsPerPage
      );
      return planets;
    }, [currentPage, LobbyPlanets]);

    return LobbyPlanets.length > 0 ? (
      <>
        <Row>
          <span>Staged Planets</span>
        </Row>

        <Row>
          <List>
            {visiblePlanets.map((planet, j) => (
              <StagedPlanetItem
                key={`${currentPage}-${j}`}
                planet={planet}
                index={currentPage * maxPlanetsPerPage + j}
              />
            ))}
            {LobbyPlanets.length > maxPlanetsPerPage && (
              <PaginationContainer>
                <PaginationArrowContainer
                  style={{ transform: 'rotate(180deg)' }}
                  onClick={() => {
                    setCurrentPage(Math.max(currentPage - 1, 0));
                  }}
                  disabled={currentPage === 0}
                >
                  <IconArrowRight />
                </PaginationArrowContainer>
                <span>
                  Page {currentPage + 1} of{' '}
                  {Math.floor(LobbyPlanets.length / maxPlanetsPerPage) + 1}
                </span>
                <PaginationArrowContainer
                  onClick={() => {
                    setCurrentPage(
                      Math.min(currentPage + 1, Math.floor(LobbyPlanets.length / maxPlanetsPerPage))
                    );
                  }}
                  disabled={currentPage === Math.floor(LobbyPlanets.length / maxPlanetsPerPage)}
                >
                  <IconArrowRight />
                </PaginationArrowContainer>
              </PaginationContainer>
            )}
          </List>
        </Row>
      </>
    ) : (
      <Row>
        <Sub>No planets staged. Edit the map to add some.</Sub>
      </Row>
    );
  }

  const CreatedPlanetListItem: React.FC<{ planet: CreatedPlanet; index: number }> = ({
    planet,
    index,
  }) => {
    const [hoveringPlanet, setHoveringPlanet] = useState<boolean>(false);
    return (
      <StagedPlanetListItem
        onMouseEnter={() => {
          setHoveringPlanet(true);
        }}
        onMouseLeave={() => {
          setHoveringPlanet(false);
        }}
        isSelected={index === selectedIndex}
      >
        {hoveringPlanet && (
          <HoverWrapper>
            {planet.createTx && (
              <Link to={`${BLOCK_EXPLORER_URL}/${planet.createTx}`} style={{ margin: 'auto' }}>
                <u>Create Tx</u>
              </Link>
            )}
            {planet.revealTx && (
              <Link to={`${BLOCK_EXPLORER_URL}/${planet.revealTx}`} style={{ margin: 'auto' }}>
                <u>Reveal Tx</u>
              </Link>
            )}
          </HoverWrapper>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StagedPlanetIcon>
            {PLANET_TYPE_NAMES[planet.planetType].charAt(0).toUpperCase()}
          </StagedPlanetIcon>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  color: '#fff',
                }}
              >
                ({planet.x},{planet.y})
              </span>
              {planet.blockedPlanetLocs.length > 0 && (
                <span>
                  🚫 {planet.blockedPlanetLocs.length} planet
                  {planet.blockedPlanetLocs.length > 1 && 's'}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#bbb' }}>Level {planet.level}</span>
              {planet.isSpawnPlanet && (
                <span style={{ color: '#F4BF00', letterSpacing: '0.06em' }}>SPAWN</span>
              )}
              {planet.isTargetPlanet && (
                <span style={{ color: '#FF4163', letterSpacing: '0.06em' }}>TARGET</span>
              )}
            </div>
          </div>
        </div>
      </StagedPlanetListItem>
    );
  };

  function CreatedPlanets({ planets }: { planets: CreatedPlanet[] | undefined }) {
    return planets && planets.length > 0 ? (
      <>
        <Row>
          <span>Created Planets</span>
        </Row>

        <Row>
          <List>
            {planets.map((planet, i) => (
              <CreatedPlanetListItem key={i} planet={planet} index={i} />
            ))}
          </List>
        </Row>
      </>
    ) : (
      <Row>
        <Sub>
          {lobbyAdminTools
            ? 'No planets created '
            : "Planets won't be created on-chain until world is created"}
        </Sub>
      </Row>
    );
  }

  return (
    <>
      {config.ADMIN_CAN_ADD_PLANETS.displayValue ? (
        <>
          {config.NO_ADMIN.displayValue && lobbyAdminTools && (
            <Sub>You cannot stage planets after universe creation if admin disabled.</Sub>
          )}
          <StagedPlanets config={config} onUpdate={onUpdate} />
          <Spacer height={24} />
          <CreatedPlanets planets={createdPlanets} />
        </>
      ) : (
        <Sub>Enable admin planets (in admin permissions) to continue</Sub>
      )}
    </>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const StagedPlanetListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  position: relative;
  justify-content: space-between;
  background: ${({ isSelected }) => (isSelected ? '#252525' : 'transparent')};
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #252525;
  }
`;

const StagedPlanetIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #313131;
  width: 24px;
  height: 24px;
  color: #fff;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
`;

const PaginationArrowContainer = styled(CloseButtonStyle)<{ disabled: boolean }>`
  background: transparent;
  color: ${({ disabled }) => (disabled ? '#bbb' : '#fff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background: ${({ disabled }) => (disabled ? 'transparent' : '#505050')};
  }
`;

const HoverWrapper = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const IconArrowRight = () => {
  return (
    <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};
