import { CORE_CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { IDBPDatabase, openDB } from 'idb';
import stringify from 'json-stable-stringify';
import _ from 'lodash';
import { MAX_CHUNK_SIZE } from '../../Frontend/Utils/constants';
import { ChunkStore, LSMChunkData } from '../../_types/darkforest/api/ChunkStoreTypes';
import { ExploredChunkData, Rectangle } from '../../_types/global/GlobalTypes';
import {
  toLSMChunk,
  toExploredChunk,
  getChunkOfSideLength,
  getChunkKey,
  addToChunkMap,
} from '../Miner/ChunkUtils';
import { SerializedPlugin } from '../Plugins/SerializedPlugin';
import {
  EthAddress,
  LocationId,
  SubmittedTx,
  WorldLocation,
  RevealedCoords,
} from '@darkforest_eth/types';

enum ObjectStore {
  DEFAULT = 'default',
  BOARD = 'knownBoard',
  UNCONFIRMED_ETH_TXS = 'unminedEthTxs',
  PLUGINS = 'plugins',
}

enum DBActionType {
  UPDATE,
  DELETE,
}

interface DBAction {
  type: DBActionType;
  dbKey: string;
  dbValue?: ExploredChunkData;
}

type DBTx = DBAction[];

interface DebouncedFunc<T extends () => void> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
}

class PersistentChunkStore implements ChunkStore {
  private db: IDBPDatabase;
  private cached: DBTx[];
  private throttledSaveChunkCacheToDisk: DebouncedFunc<() => Promise<void>>;
  private nUpdatesLastTwoMins = 0; // we save every 5s, unless this goes above 50
  private chunkMap: Map<string, ExploredChunkData>;
  private confirmedTxHashes: Set<string>;
  private account: EthAddress;

  constructor(db: IDBPDatabase, account: EthAddress) {
    this.db = db;
    this.cached = [];
    this.confirmedTxHashes = new Set<string>();
    this.throttledSaveChunkCacheToDisk = _.throttle(
      this.saveChunkCacheToDisk,
      2000 // TODO
    );
    this.chunkMap = new Map<string, ExploredChunkData>();
    this.account = account;
  }

  destroy(): void {
    // no-op; we don't actually destroy the instance, we leave the db connection open in case we need it in the future
  }

  static async create(account: EthAddress): Promise<PersistentChunkStore> {
    const db = await openDB(`darkforest-${CORE_CONTRACT_ADDRESS}-${account}`, 1, {
      upgrade(db) {
        db.createObjectStore(ObjectStore.DEFAULT);
        db.createObjectStore(ObjectStore.BOARD);
        db.createObjectStore(ObjectStore.UNCONFIRMED_ETH_TXS);
        db.createObjectStore(ObjectStore.PLUGINS);
      },
    });

    const localStorageManager = new PersistentChunkStore(db, account);

    await localStorageManager.loadIntoMemory();

    return localStorageManager;
  }

  private async getKey(
    key: string,
    objStore: ObjectStore = ObjectStore.DEFAULT
  ): Promise<string | undefined> {
    return await this.db.get(objStore, `${CORE_CONTRACT_ADDRESS}-${this.account}-${key}`);
  }

  private async setKey(
    key: string,
    value: string,
    objStore: ObjectStore = ObjectStore.DEFAULT
  ): Promise<void> {
    await this.db.put(objStore, value, `${CORE_CONTRACT_ADDRESS}-${this.account}-${key}`);
  }

  private async removeKey(key: string, objStore: ObjectStore = ObjectStore.DEFAULT): Promise<void> {
    await this.db.delete(objStore, `${CORE_CONTRACT_ADDRESS}-${this.account}-${key}`);
  }

  private async bulkSetKeyInCollection(
    updateChunkTxs: DBTx[],
    collection: ObjectStore
  ): Promise<void> {
    const tx = this.db.transaction(collection, 'readwrite');
    updateChunkTxs.forEach((updateChunkTx) => {
      updateChunkTx.forEach(({ type, dbKey: key, dbValue: value }) => {
        if (type === DBActionType.UPDATE) {
          tx.store.put(toLSMChunk(value as ExploredChunkData), key);
        } else if (type === DBActionType.DELETE) {
          tx.store.delete(key);
        }
      });
    });
    await tx.done;
  }

  private async loadIntoMemory(): Promise<void> {
    // we can't bulk get all chunks, since idb will crash/hang
    // we also can't assign random non-primary keys and query on ranges
    // so we append a random alphanumeric character to the front of keys
    // and then bulk query for keys starting with 0, then 1, then 2, etc.
    const borders = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ~';
    for (let idx = 0; idx < borders.length - 1; idx += 1) {
      (
        await this.db.getAll(
          ObjectStore.BOARD,
          IDBKeyRange.bound(borders[idx], borders[idx + 1], false, true)
        )
      ).forEach((chunk: LSMChunkData) => {
        this.updateChunk(toExploredChunk(chunk), true);
      });
    }
  }

  private async saveChunkCacheToDisk() {
    const toSave = [...this.cached]; // make a copy
    this.cached = [];
    await this.bulkSetKeyInCollection(toSave, ObjectStore.BOARD);
  }

  /**
   * we keep a list rather than a single location, since client/contract can
   * often go out of sync on initialization - if client thinks that init
   * failed but is wrong, it will prompt user to initialize with new home coords,
   * which bricks the user's account.
   */
  public async getHomeLocations(): Promise<WorldLocation[]> {
    const homeLocations = await this.getKey('homeLocations');
    let parsed: WorldLocation[] = [];
    if (homeLocations) {
      parsed = JSON.parse(homeLocations) as WorldLocation[];
    }

    return parsed;
  }

  public async addHomeLocation(location: WorldLocation): Promise<void> {
    let locationList = await this.getHomeLocations();
    if (locationList) {
      locationList.push(location);
    } else {
      locationList = [location];
    }
    locationList = Array.from(new Set(locationList));
    await this.setKey('homeLocations', stringify(locationList));
  }

  public async confirmHomeLocation(location: WorldLocation): Promise<void> {
    await this.setKey('homeLocations', stringify([location]));
  }

  public async getSavedTouchedPlanetIds(): Promise<LocationId[]> {
    const touchedPlanetIds = await this.getKey('touchedPlanetIds');

    if (touchedPlanetIds) {
      const parsed = JSON.parse(touchedPlanetIds) as LocationId[];
      return parsed;
    }

    return [];
  }

  public async getSavedRevealedCoords(): Promise<RevealedCoords[]> {
    const revealedPlanetIds = await this.getKey('revealedPlanetIds');

    if (revealedPlanetIds) {
      const parsed = JSON.parse(revealedPlanetIds);
      // changed the type on 6/1/21 to include revealer field
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (parsed.length === 0 || !(parsed[0] as any).revealer) {
        return [];
      }
      return parsed as RevealedCoords[];
    }

    return [];
  }

  public async saveTouchedPlanetIds(ids: LocationId[]) {
    await this.setKey('touchedPlanetIds', stringify(ids));
  }

  public async saveRevealedCoords(revealedCoordTups: RevealedCoords[]) {
    await this.setKey('revealedPlanetIds', stringify(revealedCoordTups));
  }

  public getChunkByFootprint(chunkLoc: Rectangle): ExploredChunkData | undefined {
    let sideLength = chunkLoc.sideLength;

    while (sideLength <= MAX_CHUNK_SIZE) {
      const testChunkLoc = getChunkOfSideLength(chunkLoc.bottomLeft, sideLength);
      const chunk = this.getChunkById(getChunkKey(testChunkLoc));
      if (chunk) {
        return chunk;
      }
      sideLength *= 2;
    }

    return undefined;
  }

  public hasMinedChunk(chunkLoc: Rectangle): boolean {
    return !!this.getChunkByFootprint(chunkLoc);
  }

  private getChunkById(chunkId: string): ExploredChunkData | undefined {
    return this.chunkMap.get(chunkId);
  }

  // if the chunk was loaded from storage, then we don't need to recommit it
  // unless it can be promoted (which shouldn't ever happen, but we handle
  // just in case)
  public updateChunk(e: ExploredChunkData, loadedFromStorage = false): void {
    if (this.hasMinedChunk(e.chunkFootprint)) {
      return;
    }
    const tx: DBTx = [];

    // if this is a mega-chunk, delete all smaller chunks inside of it
    const minedSubChunks = this.getMinedSubChunks(e);
    for (const subChunk of minedSubChunks) {
      tx.push({
        type: DBActionType.DELETE,
        dbKey: getChunkKey(subChunk.chunkFootprint),
      });
    }

    addToChunkMap(
      this.chunkMap,
      e,
      true,
      (chunk) => {
        tx.push({
          type: DBActionType.UPDATE,
          dbKey: getChunkKey(chunk.chunkFootprint),
          dbValue: chunk,
        });
      },
      (chunk) => {
        tx.push({
          type: DBActionType.DELETE,
          dbKey: getChunkKey(chunk.chunkFootprint),
        });
      },
      MAX_CHUNK_SIZE
    );

    // modify in-memory store
    for (const action of tx) {
      if (action.type === DBActionType.UPDATE && action.dbValue) {
        this.chunkMap.set(action.dbKey, action.dbValue);
      } else if (action.type === DBActionType.DELETE) {
        this.chunkMap.delete(action.dbKey);
      }
    }

    // can stop here, if we're just loading into in-memory store from storage
    if (loadedFromStorage) {
      return;
    }

    this.cached.push(tx);

    // save chunks every 5s if we're just starting up, or 30s once we're moving
    this.recomputeSaveThrottleAfterUpdate();

    this.throttledSaveChunkCacheToDisk();
  }

  private getMinedSubChunks(e: ExploredChunkData): ExploredChunkData[] {
    // returns all the mined chunks with smaller sidelength strictly contained in e
    const ret: ExploredChunkData[] = [];
    for (
      let clearingSideLen = 16;
      clearingSideLen < e.chunkFootprint.sideLength;
      clearingSideLen *= 2
    ) {
      for (let x = 0; x < e.chunkFootprint.sideLength; x += clearingSideLen) {
        for (let y = 0; y < e.chunkFootprint.sideLength; y += clearingSideLen) {
          const queryChunk: Rectangle = {
            bottomLeft: {
              x: e.chunkFootprint.bottomLeft.x + x,
              y: e.chunkFootprint.bottomLeft.y + y,
            },
            sideLength: clearingSideLen,
          };
          const queryChunkKey = getChunkKey(queryChunk);
          const exploredChunk = this.getChunkById(queryChunkKey);
          if (exploredChunk) {
            ret.push(exploredChunk);
          }
        }
      }
    }
    return ret;
  }

  private recomputeSaveThrottleAfterUpdate() {
    this.nUpdatesLastTwoMins += 1;
    if (this.nUpdatesLastTwoMins === 50) {
      this.throttledSaveChunkCacheToDisk.cancel();
      this.throttledSaveChunkCacheToDisk = _.throttle(this.saveChunkCacheToDisk, 30000);
    }
    setTimeout(() => {
      this.nUpdatesLastTwoMins -= 1;
      if (this.nUpdatesLastTwoMins === 49) {
        this.throttledSaveChunkCacheToDisk.cancel();
        this.throttledSaveChunkCacheToDisk = _.throttle(this.saveChunkCacheToDisk, 5000);
      }
    }, 120000);
  }

  public allChunks(): Iterable<ExploredChunkData> {
    return this.chunkMap.values();
  }

  public async onEthTxSubmit(tx: SubmittedTx): Promise<void> {
    if (this.confirmedTxHashes.has(tx.txHash)) {
      // in case the tx was mined and saved already
      return Promise.resolve();
    }
    await this.db.put(ObjectStore.UNCONFIRMED_ETH_TXS, tx, tx.txHash);
  }

  public async onEthTxComplete(txHash: string): Promise<void> {
    this.confirmedTxHashes.add(txHash);
    await this.db.delete(ObjectStore.UNCONFIRMED_ETH_TXS, txHash);
  }

  public async getUnconfirmedSubmittedEthTxs(): Promise<SubmittedTx[]> {
    const ret: SubmittedTx[] = await this.db.getAll(ObjectStore.UNCONFIRMED_ETH_TXS);
    return ret;
  }

  public async loadPlugins(): Promise<SerializedPlugin[]> {
    const savedPlugins = await this.getKey('plugins', ObjectStore.PLUGINS);

    if (!savedPlugins) {
      return [];
    }

    return JSON.parse(savedPlugins) as SerializedPlugin[];
  }

  public async savePlugins(plugins: SerializedPlugin[]) {
    this.setKey('plugins', JSON.stringify(plugins), ObjectStore.PLUGINS);
  }
}

export default PersistentChunkStore;
