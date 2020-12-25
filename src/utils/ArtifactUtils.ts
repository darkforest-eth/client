import {
  Artifact,
  ArtifactId,
  ArtifactNames,
  ArtifactRarity,
  ArtifactType,
  Biome,
  BiomeNames,
  LocationId,
  Planet,
  PlanetLevel,
  RarityNames,
} from '../_types/global/GlobalTypes';
import { emptyLocationId, emptyAddress } from './CheckedTypeUtils';
import { artifactRandom, artifactRandomInt } from './ProcgenUtils';
import tracery from './tracery';
import { randomHex, titleCase } from './Utils';

export const hasUnconfirmedArtifactTx = (p: Planet | null): boolean =>
  !!(
    p?.unconfirmedDepositArtifact ||
    p?.unconfirmedWithdrawArtifact ||
    p?.unconfirmedFindArtifact
  );

export const biomeName = (biome: Biome): string => BiomeNames[biome];

export const rarityName = (rarity: ArtifactRarity): string =>
  RarityNames[rarity];

export const rarityFromArtifact = (artifact: Artifact): ArtifactRarity => {
  const l = artifact.planetLevel;
  if (l <= 2) return ArtifactRarity.Common;
  else if (l <= 4) return ArtifactRarity.Rare;
  else if (l <= 6) return ArtifactRarity.Epic;
  else return ArtifactRarity.Legendary;
};

export const rarityNameFromArtifact = (a: Artifact): string =>
  rarityName(rarityFromArtifact(a));

export const levelFromRarity = (rarity: ArtifactRarity): PlanetLevel => {
  if (rarity === ArtifactRarity.Legendary) return 7;
  else if (rarity === ArtifactRarity.Epic) return 5;
  else if (rarity === ArtifactRarity.Rare) return 3;
  else return 0;
};

export const artifactTitle = (artifact: Artifact | null): string => {
  if (!artifact) return '';
  return `${BiomeNames[artifact.planetBiome]} ${
    ArtifactNames[artifact.artifactType]
  }`;
};

export const dateMintedAt = (artifact: Artifact | null): string => {
  if (!artifact) return '00/00/0000';
  return new Date(artifact.mintedAtTimestamp * 1000).toDateString();
};

const godGrammar = {
  god1: ["c'", 'za', "ry'", "ab'", "bak'", "dt'", "ek'", "fah'", "q'"],
  god2: ['thun', 'tchalla', 'thovo', 'saron', 'zoth', 'sharrj', 'thulu'],
  god: [
    'steve',
    'jesus',
    'pip',
    'waddles',
    'vitalik',
    'BGu',
    ...Array(10).fill('#god1##god2#'),
  ],
};

/*
const coolNameGrammar = {
  coolName1: ['tesser', 'giz', 'tiber'],
  coolName2: ['acta', 'ecto', 'essa'],
  coolName: ['#coolName1##coolName2#'],
};
*/

const monolithName = (id: ArtifactId): string => {
  const randInt = artifactRandomInt(id);
  if (randInt() % 1024 === 0) {
    return 'The Great Clown Tower';
  }
  tracery.setRng(artifactRandom(id));

  const grammar = {
    ...godGrammar,
    pillar: ['obelisk', 'pillar', 'veil'],
    origin: ['#pillar# of #god#'],
  };

  return titleCase(tracery.createGrammar(grammar).flatten('#origin#'));
};

const colossusName = (id: ArtifactId): string => {
  const randInt = artifactRandomInt(id);
  if (randInt() % 1024 === 0) {
    return 'The Great Pip';
  } else if (randInt() % 1024 === 0) {
    return 'The Great Waddles';
  } else if (randInt() % 1024 === 0) {
    return 'The Great Clown';
  }

  tracery.setRng(artifactRandom(id));

  const grammar = {
    ...godGrammar,
    idol: ['idol', 'figure', 'statue'],
    origin: ['#idol# of #god#'],
  };

  return titleCase(tracery.createGrammar(grammar).flatten('#origin#'));
};
const pyramidName = (id: ArtifactId): string => {
  const randInt = artifactRandomInt(id);
  if (randInt() % 1024 === 0) {
    return 'The Big Top';
  }

  tracery.setRng(artifactRandom(id));

  const grammar = {
    ...godGrammar,
    tomb: ['tomb', 'crypt', 'vault', 'masoleum', 'tesseract', 'shrine'],
    origin: ['#tomb# of #god#'],
  };

  return titleCase(tracery.createGrammar(grammar).flatten('#origin#'));
};
const spaceshipName = (id: ArtifactId): string => {
  const randInt = artifactRandomInt(id);
  if (randInt() % 2048 === 0) {
    return 'Millennium Falcon';
  } else if (randInt() % 2048 === 1) {
    return 'Blue Space';
  } else if (randInt() % 2048 === 2) {
    return 'Vostok 1';
  } else if (randInt() % 2048 === 3) {
    return 'Apollo 11';
  } else if (randInt() % 2048 === 4) {
    return 'Voyager 2';
  } else if (randInt() % 2048 === 5) {
    return 'Curiosity';
  } else if (randInt() % 2048 === 6) {
    return 'TARDIS';
  } else if (randInt() % 2048 === 7) {
    return 'USS Enterprise';
  } else if (randInt() % 2048 === 8) {
    return 'UNSC Infinity';
  }

  tracery.setRng(artifactRandom(id));

  const grammar = {
    ...godGrammar,
    millennium: [
      'infinity',
      'century',
      'biennial',
      'hyperspace',
      'elysium',
      'battlestar',
    ],
    falcon: [
      'falcon',
      'sparrow',
      'viking',
      'cowboy',
      'bebop',
      'challenger',
      'enterprise',
      'serenity',
      'tranquility',
    ],
    steed: ['steed', 'craft', 'vessel', 'starship', 'machine'],
    origin: ['#millennium# #falcon#', "#god#'s #steed#"],
  };

  return titleCase(tracery.createGrammar(grammar).flatten('#origin#'));
};

const namesById = new Map<LocationId, string>();
export const artifactName = (artifact: Artifact | null): string => {
  if (!artifact) return 'Unknown';

  const myName = namesById.get(artifact.id);
  if (myName) return myName;

  let name = 'Unknown';
  if (artifact.artifactType === ArtifactType.Monolith)
    name = monolithName(artifact.id);
  else if (artifact.artifactType === ArtifactType.Colossus)
    name = colossusName(artifact.id);
  else if (artifact.artifactType === ArtifactType.Spaceship)
    name = spaceshipName(artifact.id);
  else if (artifact.artifactType === ArtifactType.Pyramid)
    name = pyramidName(artifact.id);

  namesById.set(artifact.id, name);
  return name;
};

export const mockLegendary = {
  planetLevel: 7,
  artifactType: ArtifactType.Spaceship,
  planetBiome: Biome.WASTELAND,
} as Artifact;

export const mockEpic = {
  planetLevel: 6,
  artifactType: ArtifactType.Spaceship,
  planetBiome: Biome.WASTELAND,
} as Artifact;

export const mockRare = {
  planetLevel: 4,
  artifactType: ArtifactType.Spaceship,
  planetBiome: Biome.WASTELAND,
} as Artifact;

export const mockCommon = {
  planetLevel: 2,
  artifactType: ArtifactType.Spaceship,
  planetBiome: Biome.WASTELAND,
} as Artifact;

const randomLevel = () => Math.floor(Math.random() * (PlanetLevel.MAX + 1));
const randomType = () => Math.floor(1 + Math.random() * 4);
const randomBiome = () =>
  Math.floor(Biome.MIN + Math.random() * (Biome.MAX - Biome.MIN + 1));

export const mockArtifact = (): Artifact =>
  ({
    id: randomHex(64) as ArtifactId,
    planetDiscoveredOn: emptyLocationId,
    planetLevel: randomLevel(),
    planetBiome: randomBiome(),
    mintedAtTimestamp: Date.now(),
    discoverer: emptyAddress,
    currentOwner: emptyAddress,
    artifactType: randomType(),
    upgrade: {
      energyCapMultiplier: 120,
      energyGroMultiplier: 100,
      rangeMultiplier: 100,
      speedMultiplier: 85,
      defMultiplier: 100,
    },
    onPlanetId: undefined,
  } as Artifact);
