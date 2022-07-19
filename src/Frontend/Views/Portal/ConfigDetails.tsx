import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import dfstyles from '../../Styles/dfstyles';
import { Table } from '../Table';

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function configItemName(config: LobbyInitializers, name: string) {
  // return capitalizeFirstLetter(name.toLowerCase().split("_").join(" "));
  const prettyName = capitalizeFirstLetter(name.toLowerCase().split("_").join(" "));
  // console.log(prettyName, name, prettyName.length);
  if (name == 'START_PAUSED') return 'Start Paused';

  // return prettyName.slice(0,5);
  if (name == 'START_PAUSED') return 'Start Paused';
  if (name == 'WORLD_RADIUS_LOCKED') return 'Locked world radius';
  if (name == 'WORLD_RADIUS_MIN') return 'Min world radius';
  if (name == 'DISABLE_ZK_CHECKS') return 'Disable ZK';
  if (name == 'PLANETHASH_KEY') return 'Planet Seed';
  if (name == 'SPACETYPE_KEY') return 'Spacetype Seed';
  if (name == 'BIOMEBASE_KEY') return 'Biome Seed';
  if (name == 'PERLIN_MIRROR_X') return 'Mirror X';
  if (name == 'PERLIN_MIRROR_Y') return 'Mirror Y';
  if (name == 'MAX_NATURAL_PLANET_LEVEL') return 'Max Planet Level';
  if (name == 'TIME_FACTOR_HUNDREDTHS') return 'Time Factor';
  if (name == 'PERLIN_THRESHOLD_1') return 'Perlin Threshold 1';
  if (name == 'PERLIN_THRESHOLD_2') return 'Perlin Threshold 2';
  if (name == 'PERLIN_THRESHOLD_3') return 'Perlin Threshold 3';
  if (name == 'BIOME_THRESHOLD_1') return 'Biome Threshold 1';
  if (name == 'BIOME_THRESHOLD_2') return 'Biome Threshold 2';
  if (name == 'PLANET_LEVEL_THRESHOLDS') return 'Planet Rarity (by level)';
  if (name == 'PLANET_RARITY') return 'Overall Planet Rarity';
  if (name == 'PHOTOID_ACTIVATION_DELAY') return 'Photoid Delay';
  if (name == 'LOCATION_REVEAL_COOLDOWN') return 'Location Reveal Cooldown';
  if (name == 'CLAIM_PLANET_COOLDOWN') return 'Claim Planet Cooldown';
  if (name == 'SILVER_SCORE_VALUE') return 'Silver Value';
  if (name == 'ARTIFACT_POINT_VALUES') return 'Artifact Values';
  if (name == 'SPACE_JUNK_ENABLED') return 'Junk Enabled';
  if (name == 'SPACE_JUNK_LIMIT') return 'Junk Limit';
  if (name == 'PLANET_LEVEL_JUNK') return 'Junk Per Planet';
  if (name == 'ABANDON_SPEED_CHANGE_PERCENT') return 'Abandon Speed Change';
  if (name == 'ABANDON_RANGE_CHANGE_PERCENT') return 'Abandon Range Change';
  if (name == 'CAPTURE_ZONES_ENABLED') return 'Capture Zones Enabled';
  if (name == 'CAPTURE_ZONE_COUNT') return 'Capture Zone Count';
  if (name == 'CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL') return 'Capture Zone Change Frequency';
  if (name == 'CAPTURE_ZONE_RADIUS') return 'Capture Zone Radius';
  if (name == 'CAPTURE_ZONE_PLANET_LEVEL_SCORE') return 'Capture Zone Value';
  if (name == 'CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED') return 'Capture Zone Hold Blocks';
  if (name == 'CAPTURE_ZONES_PER_5000_WORLD_RADIUS') return 'Capture Zone Rarity';
  if (name == 'MANUAL_SPAWN') return 'Manual Spawn';
  if (name == 'TARGET_PLANETS') return 'Target Planets';
  if (name == 'CLAIM_VICTORY_ENERGY_PERCENT') return 'Claim Victory %';
  if (name == 'MODIFIERS') return 'World Modifiers';
  if (name == 'SPACESHIPS') return 'Spaceships';
  if (name == 'RANDOM_ARTIFACTS') return 'Random Artifacts';
  if (name == 'NO_ADMIN') return 'Admin Disabled';
  return undefined;
}

const itemColumns = [(item: any, i: number) => i, (item: any) => item.toString()];
function Tableify(item: any[]) {
  return (
    <Table
      paginated={false}
      rows={item}
      headers={[]}
      columns={itemColumns}
      alignments={['l', 'r']}
    ></Table>
  );
}

export function ConfigDetails({ config }: { config: LobbyInitializers | undefined }) {
  if (!config) return <>loading...</>;

  const columns = [
    (item: any) => <Cell style = {{fontWeight: 'bold'}}>{configItemName(config, item[0].toString())}</Cell>,
    (item: any) => (typeof item[1] == 'object' ? Tableify(item[1]) : item[1].toString()
    ),
  ];
  return (
    <DetailsContainer>
      <Table
        paginated={false}
        rows={Object.entries(config).filter((item) => !!configItemName(config, item[0].toString()))}
        headers={[]}
        columns={columns}
        alignments={['l', 'r']}
      ></Table>
    </DetailsContainer>
  );
}

const DetailsContainer = styled.div`
  display: inline-block;
  border-radius: 2px 2px 0 0px;
  border-bottom: none;
  padding: 16px;
  overflow: auto;
`;

const Cell = styled.div`
  padding: 4px 8px;
  color: ${dfstyles.colors.text};
  background: transparent;
  // font-size: 1.25em;
  height: 100%;
  display: flex;
  justify-content: flex-start;
`;
