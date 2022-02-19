import { monomitter, Monomitter } from '@darkforest_eth/events';
import { CaptureZone, Chunk, LocationId } from '@darkforest_eth/types';
import bigInt from 'big-integer';
import { utils } from 'ethers';
import GameManager, { GameManagerEvent } from './GameManager';

export type CaptureZonesGeneratedEvent = {
  changeBlock: number;
  nextChangeBlock: number;
  zones: CaptureZone[];
};

/**
 * Given a game start block and a zone change block interval, decide when to generate new Capture Zones.
 */
export class CaptureZoneGenerator {
  private gameManager: GameManager;

  private zones: Set<CaptureZone>;
  private capturablePlanets: Set<LocationId>;

  private lastChangeBlock: number;
  private nextChangeBlock: number;
  private changeInterval: number;

  public readonly generated$: Monomitter<CaptureZonesGeneratedEvent>;

  constructor(gameManager: GameManager, gameStartBlock: number, changeInterval: number) {
    this.gameManager = gameManager;
    this.changeInterval = changeInterval;
    this.nextChangeBlock = gameStartBlock;
    this.generated$ = monomitter();
    this.capturablePlanets = new Set();
    this.zones = new Set();

    gameManager.on(GameManagerEvent.DiscoveredNewChunk, this.onNewChunk.bind(this));
  }

  /**
   * Call when a new block is received to check if generation is needed.
   * @param blockNumber Current block number.
   */
  async generate(blockNumber: number) {
    this.setNextGenerationBlock(blockNumber);

    const newZones = await this._generate(this.nextChangeBlock - this.changeInterval);
    this.zones = newZones;
    this.updateCapturablePlanets();
    this.generated$.publish({
      changeBlock: this.lastChangeBlock,
      nextChangeBlock: this.nextChangeBlock,
      zones: Array.from(this.zones),
    });
  }

  private setNextGenerationBlock(blockNumber: number) {
    const totalGameBlocks = blockNumber - this.gameManager.getContractConstants().GAME_START_BLOCK;
    const numPastIntervals = Math.floor(totalGameBlocks / this.changeInterval);
    this.nextChangeBlock =
      this.gameManager.getContractConstants().GAME_START_BLOCK +
      (numPastIntervals + 1) * this.changeInterval;
  }

  private async _generate(blockNumber: number) {
    const block = await this.gameManager.getEthConnection().getProvider().getBlock(blockNumber);
    const worldRadius = await this.gameManager.getContractAPI().getWorldRadius();

    const captureZones = new Set<CaptureZone>();
    const ringSize = 5000;
    const ringCount = Math.floor(worldRadius / ringSize);
    const zonesPerRing =
      this.gameManager.getContractConstants().CAPTURE_ZONES_PER_5000_WORLD_RADIUS;

    for (let ring = 0; ring < ringCount; ring++) {
      const nonceBase = ring * zonesPerRing;

      for (let j = 0; j < zonesPerRing; j++) {
        const nonce = nonceBase + j;
        const blockAndNonceHash = utils.solidityKeccak256(
          ['bytes32', 'uint256'],
          [block.hash, nonce]
        );
        // Chop off 0x and convert to BigInt
        const seed = bigInt(blockAndNonceHash.substring(2, blockAndNonceHash.length), 16);
        // Last 3 hex characters
        const angleSeed = seed.mod(0xfff);
        // Max value of 0xfff is 4095
        // 4095 / 651 is max radians in circle
        // Mult by 1e18 to convert to big number math
        const angleRads = angleSeed.multiply(1e18).divide(651);

        // Next 6 hex characters
        const distanceSeed = seed.minus(angleSeed).divide(4096).mod(0xffffff);
        // 16777215 is value of FFFFFF
        // Clamp distance within ring radius
        const divisor = Math.floor(16777215 / ringSize);
        // Add in distance from origin point
        const distance = distanceSeed.divide(divisor).add(ring * ringSize);

        // Bring it back down to number
        const angleNumber = Number(angleRads) / 1e18;
        const distanceNumber = Number(distance);

        const coords = {
          x: Math.floor(distanceNumber * Math.cos(angleNumber)),
          y: Math.floor(distanceNumber * Math.sin(angleNumber)),
        };

        captureZones.add({
          coords,
          radius: this.gameManager.getContractConstants().CAPTURE_ZONE_RADIUS,
        });
      }
    }

    this.lastChangeBlock = blockNumber;

    return captureZones;
  }

  private updateCapturablePlanets() {
    this.capturablePlanets = new Set<LocationId>();

    for (const zone of this.getZones()) {
      const planetsInZone = this.gameObjects.getPlanetsInWorldCircle(zone.coords, zone.radius);
      for (const planet of planetsInZone) {
        this.capturablePlanets.add(planet.locationId);
      }
    }
  }

  private get gameObjects() {
    return this.gameManager.getGameObjects();
  }

  private onNewChunk(chunk: Chunk) {
    for (const worldLocation of chunk.planetLocations) {
      for (const zone of this.getZones()) {
        const { x: planetX, y: planetY } = worldLocation.coords;
        const { x: zoneX, y: zoneY } = zone.coords;

        const distance = Math.sqrt((planetX - zoneX) ** 2 + (planetY - zoneY) ** 2);
        if (distance <= zone.radius) {
          this.capturablePlanets.add(worldLocation.hash);
        }
      }
    }
  }

  /**
   * Is the given planet inside of a Capture Zone.
   */
  public isInZone(locationId: LocationId) {
    return this.capturablePlanets.has(locationId);
  }

  /**
   * The next block that will trigger a Capture Zone generation.
   */
  public getNextChangeBlock() {
    return this.nextChangeBlock;
  }

  public getZones() {
    return this.zones;
  }
}
