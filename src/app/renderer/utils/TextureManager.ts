import { ArtifactType, Biome } from '../../../_types/global/GlobalTypes';

const spriteBase = 'public/sprites/';

export const SPRITE_W = 64;

export const imgUri = (uri: string): string => spriteBase + uri;

export const glassSprite = 'glass.png';
export const artifacts = 'artifacts.png';
export const artifactThumbs = 'artifactthumbs.png';

const imageByName = new Map<string, HTMLImageElement>();

export async function loadSprite(name: string): Promise<HTMLImageElement> {
  const cachedImg = imageByName.get(name);
  // this won't fire if things are super fast, but might be a marginal speedup in some cases
  if (cachedImg) {
    return cachedImg;
  }

  const url = imgUri(name);
  const image = new Image();

  return new Promise((resolve) => {
    image.src = url;
    image.onload = () => {
      imageByName.set(name, image);
      resolve(image);
    };
  });
}

export async function loadArtifactAtlas(): Promise<HTMLImageElement> {
  return loadSprite(artifacts);
}

export async function loadArtifactThumbAtlas(): Promise<HTMLImageElement> {
  return loadSprite(artifactThumbs);
}

export const ATLAS_W = 16;

type SpriteInfo = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
type ArtifactInfo = {
  shiny: SpriteInfo;
  normal: SpriteInfo;
};
const emptyInfo: ArtifactInfo = {
  shiny: { x1: -1, y1: -1, x2: -1, y2: -1 },
  normal: { x1: -1, y1: -1, x2: -1, y2: -1 },
};

type BiomeInfo = Record<Biome, ArtifactInfo>;
export type AtlasInfo = Record<ArtifactType, BiomeInfo>;

// returns a texture atlas in texcoords
export const getSpriteInfo = (): AtlasInfo => {
  const atlas: Partial<AtlasInfo> = {};
  const interval = 1 / ATLAS_W;
  // const interval = 1;

  for (let type: ArtifactType = 0; type <= 4; type++) {
    let yIdx = (type - 1) * 2;
    let xIdx = 0;

    const biomeInfo: Partial<BiomeInfo> = {};
    const dataFromIdx = (xIdx: number, yIdx: number): SpriteInfo => {
      const x1 = xIdx * interval;
      const y1 = yIdx * interval;
      return {
        x1,
        y1,
        x2: x1 + interval,
        y2: y1 + interval,
      };
    };

    for (let biome: Biome = Biome.UNKNOWN; biome <= Biome.MAX; biome++) {
      if (type === ArtifactType.Unknown || biome === Biome.UNKNOWN) {
        biomeInfo[biome] = emptyInfo;
        continue;
      }

      biomeInfo[biome] = {
        shiny: dataFromIdx(xIdx, yIdx),
        normal: dataFromIdx(xIdx + 1, yIdx),
      };

      xIdx += 2;

      if (xIdx >= ATLAS_W) {
        xIdx = 0;
        yIdx++;
      }
    }

    atlas[type] = biomeInfo as BiomeInfo;
  }

  return atlas as AtlasInfo;
};
