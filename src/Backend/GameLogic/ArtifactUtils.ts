import {
  Artifact,
  ArtifactId,
  ArtifactRarity,
  ArtifactRarityNames,
  ArtifactType,
  ArtifactTypeNames,
  Biome,
  BiomeNames,
  Planet,
  PlanetLevel,
} from '@darkforest_eth/types';
import { ProcgenUtils } from '../Procedural/ProcgenUtils';

export const RelicsList: ArtifactType[] = [
  ArtifactType.Wormhole,
  ArtifactType.PlanetaryShield,
  ArtifactType.PhotoidCannon,
  ArtifactType.BloomFilter,
  ArtifactType.BlackDomain,
];

// relics are the forgotten technologies / the artifacts that you can talk to
export function isRelic(type: ArtifactType): boolean {
  return ArtifactType.Wormhole <= type && type <= ArtifactType.BlackDomain;
}

export function isBasic(type: ArtifactType): boolean {
  return ArtifactType.Monolith <= type && type <= ArtifactType.Pyramid;
}

/** Convert an `artifactId` to an int in [0, 255] */
export function artifactRoll(id: ArtifactId): number {
  return ProcgenUtils.hashToInt(id) % 256;
}

const artifactIsAncientMap: Map<ArtifactId, boolean> = new Map();

export interface RenderedArtifact extends Partial<Artifact> {
  artifactType: ArtifactType;
  planetBiome: Biome;
  rarity: ArtifactRarity;
  id: ArtifactId; // for rolls
}

let forceAncient: boolean | undefined = undefined;

export function isAncient(artifact: RenderedArtifact): boolean {
  if (forceAncient !== undefined) return forceAncient;

  const { id, planetBiome: biome } = artifact;

  if (artifactIsAncientMap.has(id)) {
    return artifactIsAncientMap.get(id) || false;
  }

  let ancient = false;
  const roll = artifactRoll(id);

  if (biome === Biome.CORRUPTED) ancient = roll % 2 === 0;
  else ancient = roll % 16 === 0;

  artifactIsAncientMap.set(id, ancient);

  return ancient;
}

/** Really, really shitty workaround to add a `return true` or `return false` to the above `isAncient`. Used in `GifRenderer.ts` */
export function setForceAncient(force: boolean): void {
  forceAncient = force;
}

const artifactCooldownHoursMap = {
  [ArtifactType.Unknown]: 24,
  [ArtifactType.Monolith]: 24,
  [ArtifactType.Colossus]: 24,
  [ArtifactType.Spaceship]: 24,
  [ArtifactType.Pyramid]: 24,
  [ArtifactType.Wormhole]: 48,
  [ArtifactType.PlanetaryShield]: 24,
  [ArtifactType.PhotoidCannon]: 24,
  [ArtifactType.BloomFilter]: 24,
  [ArtifactType.BlackDomain]: 24,
} as const;

export function artifactAvailableTimestamp(artifact: Artifact) {
  if (artifact.lastDeactivated === 0) {
    return Date.now();
  }

  const availableAtTimestampMs =
    artifact.lastDeactivated * 1000 +
    artifactCooldownHoursMap[artifact.artifactType] * 60 * 60 * 1000;

  return availableAtTimestampMs;
}

export function isActivated(artifact: Artifact | undefined) {
  if (artifact === undefined) {
    return false;
  }

  return artifact.lastActivated > artifact.lastDeactivated;
}

export function getActivatedArtifact(artifacts: Artifact[]): Artifact | undefined {
  return artifacts.find(isActivated);
}

export function getArtifactDebugName(a?: Artifact): string {
  if (!a) {
    return 'unknown artifact';
  }

  return a.id.substring(0, 8);
}

export const hasUnconfirmedArtifactTx = (p: Planet | undefined): boolean =>
  !!(
    p?.unconfirmedDepositArtifact ||
    p?.unconfirmedWithdrawArtifact ||
    p?.unconfirmedFindArtifact ||
    p?.unconfirmedProspectPlanet
  );

export const biomeName = (biome: Biome): string => BiomeNames[biome];

export const rarityName = (rarity: ArtifactRarity): string => ArtifactRarityNames[rarity];

export const rarityNameFromArtifact = (a: Artifact): string => rarityName(a.rarity);

export function artifactBiomeName(artifact: Artifact): string {
  if (isAncient(artifact)) return 'Ancient';
  else return biomeName(artifact.planetBiome);
}

export const levelFromRarity = (rarity: ArtifactRarity): PlanetLevel => {
  if (rarity === ArtifactRarity.Mythic) return PlanetLevel.NINE;
  else if (rarity === ArtifactRarity.Legendary) return PlanetLevel.SEVEN;
  else if (rarity === ArtifactRarity.Epic) return PlanetLevel.FIVE;
  else if (rarity === ArtifactRarity.Rare) return PlanetLevel.THREE;
  else return PlanetLevel.ONE;
};

const artifactFileNamesById: Map<ArtifactId, string> = new Map();

export const enum ArtifactFileColor {
  BLUE,
  APP_BACKGROUND,
}

export function artifactFileName(
  videoMode: boolean,
  thumb: boolean,
  artifact: RenderedArtifact,
  color: ArtifactFileColor,
  // used in GifRenderer.ts to generate filenames from mock artifacts
  debugProps: { forceAncient: boolean; skipCaching: boolean } | undefined = undefined
): string {
  const { artifactType: type, rarity, planetBiome: biome, id } = artifact;

  const size = thumb ? '16' : '64';
  const ext = videoMode ? 'webm' : 'png';

  let fileName = '';

  if (!debugProps?.skipCaching && artifactFileNamesById.has(id)) {
    fileName = artifactFileNamesById.get(id) || '';
  } else {
    const typeStr = ArtifactTypeNames[type];
    const rarityStr = ArtifactRarityNames[rarity];
    let nameStr = '';
    if (debugProps) {
      if (debugProps.forceAncient) {
        nameStr = 'ancient';
      } else {
        nameStr = biome + BiomeNames[biome];
      }
    } else {
      if (isAncient(artifact)) {
        nameStr = 'ancient';
      } else {
        nameStr = biome + BiomeNames[biome];
      }
    }
    fileName = `${typeStr}-${rarityStr}-${nameStr}`;
  }

  if (!debugProps?.skipCaching) artifactFileNamesById.set(id, fileName);

  let colorStr = '';
  if (color === ArtifactFileColor.APP_BACKGROUND) colorStr = '-bg';

  return `${size}-${fileName}${colorStr}.${ext}`;
}

export function getActiveBlackDomain(artifacts: Artifact[]): Artifact | undefined {
  for (const artifact of artifacts) {
    if (artifact.artifactType === ArtifactType.BlackDomain && isActivated(artifact))
      return artifact;
  }
  return undefined;
}
