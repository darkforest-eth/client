import { EthAddress, GraphArena, GraphPlanet, WorldCoords } from '@darkforest_eth/types';
import { BigNumber } from 'ethers';
import _ from 'lodash';
import { LobbyPlanet } from '../../Frontend/Panes/Lobby/LobbiesUtils';
import { LobbyInitializers } from '../../Frontend/Panes/Lobby/Reducer';
import { apiUrl, CONFIG_CONSTANTS } from '../../Frontend/Utils/constants';
import { PlanetTypeWeights } from '../../_types/darkforest/api/ContractsAPITypes';
import { getGraphQLData } from './GraphApi';

function toNum(num: BigNumber): number {
  return BigNumber.from(num).toNumber();
}

export async function loadConfigFromHash(config: string): Promise<
  | {
      config: LobbyInitializers;
      address: string;
    }
  | undefined
> {
  const query = `
query {
    arenas(first:5, where: {configHash: "${config}"}) {
        lobbyAddress,
        configHash,
        gameOver,
        startTime,
        ${CONFIG_CONSTANTS}
      }
}
`;
  const rawData = await getGraphQLData(query, apiUrl);
  // @ts-expect-error
  const hasPlanets = rawData.data.arenas.filter(a => a.planets.length > 0);
  const res = convertGraphConfig(hasPlanets[0]);
  return res;
}

export async function loadConfigFromAddress(address: EthAddress): Promise<{
  config: LobbyInitializers;
  address: string;
}> {
  const query = `
  query {
    arena(id: "${address}") {
      lobbyAddress,
        configHash,
        gameOver,
        startTime,
        ${CONFIG_CONSTANTS}
    }
  }
`;
  try {
    const rawData: GraphArena = (await getGraphQLData(query, apiUrl)).data.arena;
    const configData = convertGraphConfig(rawData);
    return configData;
  } catch (e) {
    console.log(e);
    throw new Error('could not fetch config data from the graph');
  }
}

const GraphPlanetType = ['PLANET', 'ASTEROID', 'FOUNDRY', 'SPACETIME_RIP', 'QUASAR'];

export function convertGraphConfig(arena: GraphArena): {
  config: LobbyInitializers;
  address: string;
} {
  if (!arena.config) throw new Error("Can't load arena config");
  const cf = arena.config;
  // const thresholds: number[] = arena.config.PLANET_LEVEL_THRESHOLDS;
  return {
    config: {
      ...arena.config,
      ABANDON_RANGE_CHANGE_PERCENT: toNum(cf.ABANDON_RANGE_CHANGE_PERCENT),
      ABANDON_SPEED_CHANGE_PERCENT: toNum(cf.ABANDON_SPEED_CHANGE_PERCENT),
      ARTIFACT_POINT_VALUES: [
        toNum(cf.ARTIFACT_POINT_VALUES[0]),
        toNum(cf.ARTIFACT_POINT_VALUES[1]),
        toNum(cf.ARTIFACT_POINT_VALUES[2]),
        toNum(cf.ARTIFACT_POINT_VALUES[3]),
        toNum(cf.ARTIFACT_POINT_VALUES[4]),
        toNum(cf.ARTIFACT_POINT_VALUES[5]),
      ],
      BIOME_THRESHOLD_1: toNum(cf.BIOME_THRESHOLD_1),
      BIOME_THRESHOLD_2: toNum(cf.BIOME_THRESHOLD_2),
      BIOMEBASE_KEY: toNum(cf.BIOMEBASE_KEY),
      CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL: toNum(cf.CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL),
      CAPTURE_ZONE_COUNT: toNum(cf.CAPTURE_ZONE_COUNT),
      CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED: toNum(cf.CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED),
      CAPTURE_ZONE_PLANET_LEVEL_SCORE: [
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[0]),
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[1]),
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[2]),
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[3]),
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[4]),
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[5]),
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[6]),
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[7]),
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[8]),
        toNum(cf.CAPTURE_ZONE_PLANET_LEVEL_SCORE[9]),
      ],
      CAPTURE_ZONE_RADIUS: toNum(cf.CAPTURE_ZONE_RADIUS),
      CAPTURE_ZONES_PER_5000_WORLD_RADIUS: toNum(cf.CAPTURE_ZONES_PER_5000_WORLD_RADIUS),
      CLAIM_VICTORY_ENERGY_PERCENT: toNum(cf.CLAIM_VICTORY_ENERGY_PERCENT),
      INIT_PERLIN_MAX: toNum(cf.INIT_PERLIN_MAX),
      INIT_PERLIN_MIN: toNum(cf.INIT_PERLIN_MIN),
      LOCATION_REVEAL_COOLDOWN: toNum(cf.LOCATION_REVEAL_COOLDOWN),
      MAX_NATURAL_PLANET_LEVEL: toNum(cf.MAX_NATURAL_PLANET_LEVEL),
      MODIFIERS: [
        toNum(cf.MODIFIERS[0]),
        toNum(cf.MODIFIERS[1]),
        toNum(cf.MODIFIERS[2]),
        toNum(cf.MODIFIERS[3]),
        toNum(cf.MODIFIERS[4]),
        toNum(cf.MODIFIERS[5]),
        toNum(cf.MODIFIERS[6]),
        toNum(cf.MODIFIERS[7]),
      ],
      NUM_TEAMS: toNum(cf.NUM_TEAMS),
      PERLIN_LENGTH_SCALE: toNum(cf.PERLIN_LENGTH_SCALE),
      PERLIN_THRESHOLD_1: toNum(cf.PERLIN_THRESHOLD_1),
      PERLIN_THRESHOLD_2: toNum(cf.PERLIN_THRESHOLD_2),
      PERLIN_THRESHOLD_3: toNum(cf.PERLIN_THRESHOLD_3),
      PHOTOID_ACTIVATION_DELAY: toNum(cf.PHOTOID_ACTIVATION_DELAY),
      PLANET_LEVEL_JUNK: [
        toNum(cf.PLANET_LEVEL_JUNK[0]),
        toNum(cf.PLANET_LEVEL_JUNK[1]),
        toNum(cf.PLANET_LEVEL_JUNK[2]),
        toNum(cf.PLANET_LEVEL_JUNK[3]),
        toNum(cf.PLANET_LEVEL_JUNK[4]),
        toNum(cf.PLANET_LEVEL_JUNK[5]),
        toNum(cf.PLANET_LEVEL_JUNK[6]),
        toNum(cf.PLANET_LEVEL_JUNK[7]),
        toNum(cf.PLANET_LEVEL_JUNK[8]),
        toNum(cf.PLANET_LEVEL_JUNK[9]),
      ],
      PLANET_LEVEL_THRESHOLDS: [
        toNum(cf.PLANET_LEVEL_THRESHOLDS[0]),
        toNum(cf.PLANET_LEVEL_THRESHOLDS[1]),
        toNum(cf.PLANET_LEVEL_THRESHOLDS[2]),
        toNum(cf.PLANET_LEVEL_THRESHOLDS[3]),
        toNum(cf.PLANET_LEVEL_THRESHOLDS[4]),
        toNum(cf.PLANET_LEVEL_THRESHOLDS[5]),
        toNum(cf.PLANET_LEVEL_THRESHOLDS[6]),
        toNum(cf.PLANET_LEVEL_THRESHOLDS[7]),
        toNum(cf.PLANET_LEVEL_THRESHOLDS[8]),
        toNum(cf.PLANET_LEVEL_THRESHOLDS[9]),
      ],
      PLANET_RARITY: toNum(cf.PLANET_RARITY),
      PLANETHASH_KEY: toNum(cf.PLANETHASH_KEY),
      SILVER_SCORE_VALUE: toNum(cf.SILVER_SCORE_VALUE),
      SPACE_JUNK_LIMIT: toNum(cf.SPACE_JUNK_LIMIT),
      SPACETYPE_KEY: toNum(cf.SPACETYPE_KEY),
      SPAWN_RIM_AREA: toNum(cf.SPAWN_RIM_AREA),
      TARGETS_REQUIRED_FOR_VICTORY: toNum(cf.TARGETS_REQUIRED_FOR_VICTORY),
      TIME_FACTOR_HUNDREDTHS: toNum(cf.TIME_FACTOR_HUNDREDTHS),
      TOKEN_MINT_END_TIMESTAMP: toNum(cf.TOKEN_MINT_END_TIMESTAMP),
      WORLD_RADIUS_MIN: toNum(cf.WORLD_RADIUS_MIN),
      // CLAIM_PLANET_COOLDOWN: 0,
      PLANET_TYPE_WEIGHTS: _.chunk(arena.config.PLANET_TYPE_WEIGHTS, 50).map((block) =>
        _.chunk(block, 5)
      ) as any,
      WHITELIST: [],
      ADMIN_PLANETS: arena.planets.map((planet: GraphPlanet) => {
        return {
          ...planet,
          planetType: GraphPlanetType.indexOf(planet.planetType),
          x: Number(planet.x),
          y: Number(planet.y),
          perlin: toNum(planet.perlin),
          level: toNum(planet.level),
          location: planet.locationDec,
          isTargetPlanet: planet.targetPlanet,
          isSpawnPlanet: planet.spawnPlanet,
          blockedPlanetLocs: planet.blockedPlanetIds.map((i) => {
            return {
              x: i.x,
              y: i.y,
            } as WorldCoords;
          }),
        } as LobbyPlanet;
      }),
      INIT_PLANETS: [],
    },
    address: arena.lobbyAddress,
  };
}
