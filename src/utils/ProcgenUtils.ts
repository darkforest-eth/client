import {
  Planet,
  EthAddress,
  LocationId,
  isLocatable,
  Biome,
  ArtifactId,
  UpgradeBranchName,
} from '../_types/global/GlobalTypes';
import * as bigInt from 'big-integer';
import { PlanetCosmeticInfo } from '../_types/darkforest/app/board/utils/UtilsTypes';
import { getPlanetRank, seededRandom, titleCase } from './Utils';
import _ from 'lodash';
import Noise from './Noise';
import {
  planetNameWords,
  planetTagAdj,
  planetTagNoun,
  blurb2grammar,
  blurbGrammar,
} from './ProcgenConsts';

import tracery from './tracery';
import { baseEngModifiers } from './tracery-modifiers';
import { hatTypeFromHash, HatType } from './Hats';
import { CheckedTypeUtils } from './CheckedTypeUtils';
import { HSLVec, RGBAVec, RGBVec } from '../app/renderer/utils/EngineTypes';

export type PixelCoords = {
  x: number;
  y: number;
};

export type QuoteData = {
  quote: string;
  author: string;
};

export class ProcgenUtils {
  private static blurbsById = new Map<LocationId, string>();
  private static blurbs2ById = new Map<LocationId, string>();
  private static cosmeticByLocId = new Map<LocationId, PlanetCosmeticInfo>();
  private static baseByBiome: HSLVec[] = [
    [0, 0, 0], // UNKNOWN
    [213, 100, 50], // OCEAN
    [135, 96, 63], // FOREST
    [82, 80, 76], // GRASSLAND
    [339, 95, 70], // TUNDRA
    [44, 81, 33], // SWAMP
    [51, 78, 60], // DESERT
    [198, 78, 77], // ICE
    [0, 0, 18], // WASTELAND
    [19, 100, 50], // LAVA
  ];
  private static oceanByBiome: HSLVec[] = [
    [0, 0, 0], // UNKNOWN
    [213, 89, 35], // OCEAN
    [193, 96, 43], // FOREST
    [185, 78, 70], // GRASSLAND
    [201, 95, 70], // TUNDRA
    [285, 81, 33], // SWAMP
    [27, 78, 60], // DESERT
    [198, 90, 85], // ICE
    [0, 98, 42], // WASTELAND
    [12, 92, 39], // LAVA
  ];
  public static grayColors: PlanetCosmeticInfo = {
    baseHue: 0,
    baseStr: '#888',
    bgStr: '#888',
    baseColor: [120, 120, 120],
    baseColor2: [120, 120, 120],
    baseColor3: [120, 120, 120],
    mtnColor: [120, 120, 120],
    mtnColor2: [120, 120, 120],
    mtnColor3: [120, 120, 120],
    backgroundColor: [120, 120, 120],
    previewColor: [120, 120, 120],
    landRgb: [0, 0, 0],
    oceanRgb: [0, 0, 0],
    beachRgb: [0, 0, 0],
    asteroidHsl: [0, 0, 0],
    seed: 0,
    // ultra ultra hacky, but we're doing this since it's cached in the renderer
    hatType: HatType.GraduationCap,
  };
  private static namesById = new Map<LocationId, string>();
  private static taglinesById = new Map<LocationId, string>();
  private static huesByHash = new Map<string, number>();
  private static rgbsByHash = new Map<string, RGBAVec>();

  /* fixes long strings to be maxLen long as in 0xabc...123 */
  static ellipsisStr(str: string, maxLen: number): string {
    if (str.length <= maxLen) return str;
    return (
      str.substr(0, maxLen - 6) + '...' + str.substr(str.length - 3, str.length)
    );
  }

  /* fixes long strings to be maxLen long as in 0xabc123... */
  static ellipsStrEnd(str: string, maxLen: number): string {
    if (str.length <= maxLen) return str;
    return str.substr(0, maxLen - 3) + '...';
  }

  static hslStr(h: number, s: number, l: number): string {
    return `hsl(${h % 360},${s}%,${l}%)`;
  }

  static rgbStr(rgb: RGBVec): string {
    const [r, g, b] = rgb;
    return `rgb(${r}, ${g}, ${b})`;
  }

  // prettier-ignore
  static hslToRgb([h, s, l]: HSLVec): RGBVec {
    s = Math.max(Math.min(s, 100), 0);
    l = Math.max(Math.min(l, 100), 0);

    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
  }

  public static hashToHue(hash: string): number {
    if (ProcgenUtils.huesByHash.has(hash)) {
      return ProcgenUtils.huesByHash.get(hash) || 0;
    }
    let seed = bigInt(hash, 16).and(0xffffff).toString(16);
    seed = '0x' + '0'.repeat(6 - seed.length) + seed;

    const baseHue = parseInt(seed) % 360;
    ProcgenUtils.huesByHash.set(hash, baseHue);
    return baseHue;
  }

  public static getPlayerColor(player: EthAddress): string {
    return ProcgenUtils.hslStr(
      ProcgenUtils.hashToHue(player.slice(2)),
      100,
      70
    ); // remove 0x
  }

  public static getPlayerColorVec(player: EthAddress): RGBAVec {
    if (!this.rgbsByHash.has(player)) {
      const noAlpha = ProcgenUtils.hslToRgb([
        ProcgenUtils.hashToHue(player.slice(2)),
        100,
        70,
      ]);

      const withAlpha = [...noAlpha, 1] as RGBAVec;
      this.rgbsByHash.set(player, withAlpha);
    }

    return this.rgbsByHash.get(player) as RGBAVec;
  }

  public static getOwnerColorVec(planet: Planet): RGBAVec {
    if (planet.owner === CheckedTypeUtils.EMPTY_ADDRESS)
      return [153, 153, 102, 255];
    return ProcgenUtils.getPlayerColorVec(planet.owner);
  }

  public static getOwnerColor(planet: Planet): string {
    if (planet.owner === CheckedTypeUtils.EMPTY_ADDRESS) return '#996666';
    return ProcgenUtils.getPlayerColor(planet.owner);
  }

  public static getPlanetClass(planet: Planet): UpgradeBranchName {
    const upgrade = planet.upgradeState;
    let maxIdx = 0;
    let maxVal = -1;
    for (let i = 0; i < upgrade.length; i++) {
      if (upgrade[i] > maxVal) {
        maxIdx = i;
        maxVal = upgrade[i];
      }
    }

    return maxIdx;
  }

  // returns a deterministic seeded perlin (-1, 1) for a given planet loc
  public static planetPerlin(loc: LocationId) {
    const realHash = loc.substring(4, loc.length);

    const noise = Noise.getInstance();
    const offset = parseInt('0x' + realHash.substring(0, 10));
    const t = (num: number): number => num / 100 + offset;

    return (coords: PixelCoords) => {
      const ret = noise.simplex2(t(coords.x), t(coords.y));
      return ret;
    };
  }

  // returns a deterministic seeded random fn for a given planet loc
  // TODO memoize this guy
  public static planetRandom(loc: LocationId) {
    // shouldn't need to clone since loc is primitive but just to be safe
    const realHash = loc.substring(4, loc.length);

    let count = 0;
    const countOffset = parseInt('0x' + realHash.substring(0, 10));

    return () => {
      count++;
      const ret = seededRandom(count + countOffset);
      return ret;
    };
  }

  public static planetRandomInt(loc: LocationId) {
    const rand = ProcgenUtils.planetRandom(loc);
    return () => Math.floor(rand() * 2 ** 24);
  }

  public static artifactRandom(loc: ArtifactId) {
    // shouldn't need to clone since loc is primitive but just to be safe
    const realHash = loc.substring(4, loc.length);

    let count = 0;
    const countOffset = parseInt('0x' + realHash.substring(0, 10));

    return () => {
      count++;
      const ret = seededRandom(count + countOffset);
      return ret;
    };
  }

  public static artifactRandomInt(loc: ArtifactId) {
    const rand = ProcgenUtils.artifactRandom(loc);
    return () => Math.floor(rand() * 2 ** 24);
  }

  public static getPlanetCosmetic(planet: Planet | null): PlanetCosmeticInfo {
    if (!planet) return ProcgenUtils.grayColors;
    if (ProcgenUtils.cosmeticByLocId.has(planet.locationId)) {
      return (
        ProcgenUtils.cosmeticByLocId.get(planet.locationId) ||
        ProcgenUtils.grayColors
      );
    }

    // biome-defined
    const baseColor = isLocatable(planet)
      ? ProcgenUtils.baseByBiome[planet.biome]
      : ([0, 0, 50] as HSLVec);
    const oceanColor = isLocatable(planet)
      ? ProcgenUtils.oceanByBiome[planet.biome]
      : ([0, 0, 20] as HSLVec);

    const baseHue = ProcgenUtils.hashToHue(planet.locationId);
    const seed = parseInt('0x' + planet.locationId.substring(0, 9));

    const bL = Math.min(baseColor[2] + 20, 92);
    const baseColor2 = [baseColor[0], baseColor[1], bL - 10] as HSLVec;
    const baseColor3 = [baseColor[0], baseColor[1], bL] as HSLVec;

    const sL = Math.max(0, baseColor[2] - 30);
    const sS = baseColor[1] - 10;
    const secondaryColor = [baseColor[0], sS, sL] as HSLVec;
    const secondaryColor2 = [baseColor[0], sS, sL + 10] as HSLVec;
    const secondaryColor3 = [baseColor[0], sS, sL + 20] as HSLVec;

    const beachColor = [
      baseColor[0] + 10,
      baseColor[1] - 30,
      Math.min(baseColor[2] + 23, 100),
    ] as HSLVec;

    const asteroidHsl = (isLocatable(planet) && planet.biome === Biome.WASTELAND
      ? [0, 0, 40]
      : baseColor) as HSLVec;

    const colors: PlanetCosmeticInfo = {
      baseStr: ProcgenUtils.hslStr(...baseColor),
      bgStr: ProcgenUtils.hslStr(
        oceanColor[0],
        Math.min(oceanColor[1] + 30, 100),
        80
      ),

      baseHue,
      baseColor: ProcgenUtils.hslToRgb(baseColor),
      baseColor2: ProcgenUtils.hslToRgb(baseColor2),
      baseColor3: ProcgenUtils.hslToRgb(baseColor3),
      mtnColor: ProcgenUtils.hslToRgb(secondaryColor),
      mtnColor2: ProcgenUtils.hslToRgb(secondaryColor2),
      mtnColor3: ProcgenUtils.hslToRgb(secondaryColor3),
      backgroundColor: ProcgenUtils.hslToRgb(oceanColor),
      previewColor: ProcgenUtils.hslToRgb(baseColor),

      landRgb: ProcgenUtils.hslToRgb(baseColor),
      oceanRgb: ProcgenUtils.hslToRgb(oceanColor),
      beachRgb: ProcgenUtils.hslToRgb(beachColor),

      asteroidHsl,

      seed,

      hatType: hatTypeFromHash(planet.locationId),
    };

    ProcgenUtils.cosmeticByLocId.set(planet.locationId, colors);

    return colors;
  }

  public static getPlanetTitle(planet: Planet | null) {
    if (!planet) return 'Unknown';

    const myRank = getPlanetRank(planet);

    let ret = 'Planet';

    if (myRank === 1) {
      ret = 'Settlement';
    } else if (myRank === 2) {
      ret = 'Colony';
    } else if (myRank === 3) {
      ret = 'Spaceport';
    } else if (myRank === 4) {
      ret = 'Stronghold';
    } else if (myRank === 5) {
      ret = 'Galactic Stronghold';
    }

    return ret;
  }

  public static getPlanetName(planet: Planet | null): string {
    if (!planet) return 'Unknown';
    return ProcgenUtils.getPlanetNameHash(planet.locationId);
  }

  public static getPlanetNameHash(locId: LocationId): string {
    const name = ProcgenUtils.namesById.get(locId);
    if (name) return name;

    let planetName = '';

    const randInt = ProcgenUtils.planetRandomInt(locId);
    if (randInt() % 1024 === 0) {
      planetName = 'Clown Town';
    } else {
      const word1 = planetNameWords[randInt() % planetNameWords.length];
      const word2 = planetNameWords[randInt() % planetNameWords.length];
      planetName = titleCase(`${word1} ${word2}`);
    }

    ProcgenUtils.namesById.set(locId, planetName);

    return planetName;
  }

  public static getPlanetTagline(planet: Planet | null): string {
    if (!planet) return 'The empty unknown';

    const tagline = ProcgenUtils.taglinesById.get(planet.locationId);
    if (tagline) return tagline;

    let myTagline = '';

    if (ProcgenUtils.getPlanetName(planet) === 'Clown Town') {
      myTagline = `A town of clowns`;
    } else {
      const randInt = ProcgenUtils.planetRandomInt(planet.locationId);
      const adj1 = planetTagAdj[randInt() % planetTagAdj.length];
      const adj2 = planetTagAdj[randInt() % planetTagAdj.length];
      const noun = planetTagNoun[randInt() % planetTagNoun.length];
      myTagline = `A ${adj1}, ${adj2} ${noun}`;
    }
    ProcgenUtils.taglinesById.set(planet.locationId, myTagline);

    return myTagline;
  }

  // this one doesn't mention the name
  public static getPlanetBlurb(planet: Planet | null): string {
    if (!planet)
      return 'The vast, empty unknown of space contains worlds of infinite possibilities. Select a planet to learn more...';

    const myBlurb = ProcgenUtils.blurbsById.get(planet.locationId);
    if (myBlurb) return myBlurb;

    let append = '';
    if (ProcgenUtils.getPlanetName(planet) === 'Clown Town') {
      append = `Founded in 1998 by Brian Gu, who remains the CEO of Clown Town to this day. `;
    }

    tracery.setRng(ProcgenUtils.planetRandom(planet.locationId));
    const myGrammar = {
      // geography, atmosphere, fauna, flora, fun fact
      story: [
        `#geography.capitalize# #populates#. ` +
          `The #air# is #descair#. ` +
          `#myflora.capitalize# #bloom# #colors#. ` +
          `#many.capitalize# species of #species# #populate# the #habitat#. ` +
          `#funfact.capitalize#\.`,
      ],
      origin: ['#[myflora:#flora#]story#'],
    };
    const grammar = tracery.createGrammar({ ...blurbGrammar, ...myGrammar });

    grammar.addModifiers(baseEngModifiers);

    const blurb = append + grammar.flatten('#origin#');
    ProcgenUtils.blurbsById.set(planet.locationId, blurb);
    return blurb;
  }

  // this one mentions the name
  public static getPlanetBlurb2(planet: Planet | null): string {
    if (!planet) return '';

    const myBlurb = ProcgenUtils.blurbs2ById.get(planet.locationId);
    if (myBlurb) return myBlurb;

    const name = ProcgenUtils.getPlanetName(planet);
    const tagline = ProcgenUtils.getPlanetTagline(planet);
    const myGrammar = {
      story: [
        `The people of ${name} have #learned# to #live# in a ${tagline}. ${name}'s #mysun# #sends# an #flock# of #bads# #sometimes#. Over the #years#, they've #removed# the #mysun# by #throwing# #warbears#. In doing so, they've learned that #lesson#\.`,
      ],
      origin: [`#[mysun:#sun#]story#`],
    };
    tracery.setRng(ProcgenUtils.planetRandom(planet.locationId));
    const grammar = tracery.createGrammar({ ...blurb2grammar, ...myGrammar });

    grammar.addModifiers(baseEngModifiers);
    const blurb = grammar.flatten('#origin#');

    ProcgenUtils.blurbs2ById.set(planet.locationId, blurb);
    return blurb;
  }

  public static getPlanetQuote(planet: Planet | null): QuoteData {
    if (!planet)
      return {
        quote: "What can I say? I just don't know.",
        author: 'Everyone, probably',
      };

    const myRank = getPlanetRank(planet);

    if (myRank === 0) {
      return {
        quote:
          'A beginning is the time for taking the most delicate care that the balances are correct.',
        author: 'Frank Herbert',
      };
    } else if (myRank === 1) {
      return {
        quote: 'All civilizations become either spacefaring or extinct.',
        author: 'Carl Sagan',
      };
    } else if (myRank === 2) {
      return {
        quote:
          'Weakness and ignorance are not barriers to survival, but arrogance is.',
        author: 'Liu Cixin',
      };
    } else if (myRank === 3) {
      return {
        quote: "Nature can't evolve a species that hasn't the will to survive.",
        author: 'Orson Scott Card',
      };
    } else if (myRank === 4) {
      return {
        quote:
          'Man cannot discover new oceans unless he has the courage to lose sight of the shore.',
        author: 'Andre Gide',
      };
    } else if (myRank === 5) {
      return {
        quote:
          'Each moment and everywhere, civilizations rise and fall, much as the stars are born and die. Time devours all.',
        author: 'Ken Liu',
      };
    }

    return {
      quote: '99% of quotes on the internet are made up on the spot.',
      author: 'Abraham Lincoln',
    };
  }
}
