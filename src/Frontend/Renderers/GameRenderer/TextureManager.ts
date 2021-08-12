import { MAX_ARTIFACT_TYPE, MAX_BIOME, MIN_ARTIFACT_TYPE } from '@darkforest_eth/constants';
import { ArtifactId, ArtifactRarity, ArtifactType, Biome } from '@darkforest_eth/types';
import {
  isAncient,
  isBasic,
  isRelic,
  RenderedArtifact,
} from '../../../Backend/GameLogic/ArtifactUtils';

export const ARTIFACTS_URL = 'public/sprites/artifacts.png';
export const ARTIFACTS_THUMBS_URL = 'public/sprites/artifactthumbs.png';
export const GLASS_URL = 'public/sprites/glass.png';

const imageByUrl = new Map<string, HTMLImageElement>();

export async function loadSprite(imageUrl: string): Promise<HTMLImageElement> {
  const cachedImg = imageByUrl.get(imageUrl);
  // this won't fire if things are super fast, but might be a marginal speedup in some cases
  if (cachedImg) {
    return cachedImg;
  }

  const image = new Image();

  return new Promise((resolve) => {
    image.onload = () => {
      imageByUrl.set(imageUrl, image);
      resolve(image);
    };
    image.src = imageUrl;
  });
}

export async function loadArtifactAtlas(): Promise<HTMLImageElement> {
  return loadSprite(ARTIFACTS_URL);
}

export async function loadArtifactThumbAtlas(): Promise<HTMLImageElement> {
  return loadSprite(ARTIFACTS_THUMBS_URL);
}

export const SPRITES_HORIZONTALLY = 16;
export const SPRITES_VERTICALLY = 16;
export const SPRITESHEET_WIDTH_PX = SPRITES_HORIZONTALLY * 64;
export const SPRITESHEET_HEIGHT_PX = SPRITES_VERTICALLY * 64;

const SPRITE_INTERVAL_X = 1 / SPRITES_HORIZONTALLY;
const SPRITE_INTERVAL_Y = 1 / SPRITES_VERTICALLY;

export type SpriteRectangle = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

/**
 * Represents where in the sprite sheet an artifact lives.
 */
type SpriteSet = {
  shiny: SpriteRectangle;
  normal: SpriteRectangle;
};

/**
 * Represents a sprite that doesn't exist.
 */
export const EMPTY_SPRITE: SpriteRectangle = { x1: -1, y1: -1, x2: -1, y2: -1 };

export const EMPTY_SET: SpriteSet = { shiny: EMPTY_SPRITE, normal: EMPTY_SPRITE };

// we're gonna create one of these per artifact
type BiomeToSprite = { [Biome: number]: SpriteSet };

type BiomeSpriteLocations = { [ArtifactType: number]: BiomeToSprite };

function spriteRectangleFromIndex(xIdx: number, yIdx: number): SpriteRectangle {
  const x1 = xIdx * SPRITE_INTERVAL_X;
  const y1 = yIdx * SPRITE_INTERVAL_Y;
  return {
    x1,
    y1,
    x2: x1 + SPRITE_INTERVAL_X,
    y2: y1 + SPRITE_INTERVAL_Y,
  };
}

// returns a texture atlas in texcoords
const biomeSpriteInfo = (): BiomeSpriteLocations => {
  const result: Partial<BiomeSpriteLocations> = {};

  for (let type = MIN_ARTIFACT_TYPE; type <= MAX_ARTIFACT_TYPE; type++) {
    const biomeInfo: Partial<BiomeToSprite> = {};

    if (isBasic(type)) {
      let yIdx = (type - 1) * 2;
      let xIdx = 0;

      for (let biome: Biome = Biome.UNKNOWN; biome <= MAX_BIOME; biome++) {
        if (biome === Biome.UNKNOWN) {
          biomeInfo[biome] = EMPTY_SET;
          continue;
        }

        biomeInfo[biome] = {
          shiny: spriteRectangleFromIndex(xIdx, yIdx),
          normal: spriteRectangleFromIndex(xIdx + 1, yIdx),
        };

        xIdx += 2;

        if (xIdx >= SPRITES_HORIZONTALLY) {
          xIdx = 0;
          yIdx++;
        }
      }
    } else if (isRelic(type)) {
      const yIdx = 8;
      const relicNo = type - ArtifactType.Wormhole;
      const xIdx = relicNo * 2;

      for (let biome: Biome = Biome.UNKNOWN; biome <= MAX_BIOME; biome++) {
        biomeInfo[biome] = {
          shiny: spriteRectangleFromIndex(xIdx, yIdx),
          normal: spriteRectangleFromIndex(xIdx + 1, yIdx),
        };
      }
    }
    result[type] = biomeInfo as BiomeToSprite;
  }

  return result as BiomeSpriteLocations;
};

const biomeSpriteLocs = biomeSpriteInfo();

/* generate ancient sprite info */
type AncientSpriteLocations = { [ArtifactType: number]: SpriteSet };
function ancientSpriteInfo(): AncientSpriteLocations {
  const result: Partial<AncientSpriteLocations> = {};

  const normalY = 9;
  const shinyY = 10;

  for (let type = MIN_ARTIFACT_TYPE; type <= MAX_ARTIFACT_TYPE; type++) {
    const xIdx = type - 1;
    result[type] = {
      normal: spriteRectangleFromIndex(xIdx, normalY),
      shiny: spriteRectangleFromIndex(xIdx, shinyY),
    };
  }

  return result as AncientSpriteLocations;
}
const ancientSpriteLocs = ancientSpriteInfo();

const artifactSpriteMap: Map<ArtifactId, SpriteRectangle> = new Map();

export function isShiny(rarity: ArtifactRarity) {
  return rarity >= ArtifactRarity.Epic;
}

export function spriteFromArtifact(artifact: RenderedArtifact): SpriteRectangle {
  const { id, artifactType: type, planetBiome: biome, rarity } = artifact;

  if (artifactSpriteMap.has(id)) return artifactSpriteMap.get(id) || EMPTY_SPRITE;

  if (isAncient(artifact)) {
    const info = ancientSpriteLocs[type];

    return isShiny(rarity) ? info.shiny : info.normal;
  } else {
    const artifactSpriteInfo = biomeSpriteLocs[type];
    const info = artifactSpriteInfo ? artifactSpriteInfo[biome] : EMPTY_SET;

    return isShiny(rarity) ? info.shiny : info.normal;
  }
}
