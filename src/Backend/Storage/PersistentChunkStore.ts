import {
  Chunk,
  ClaimedCoords,
  DiagnosticUpdater,
  EthAddress,
  LocationId,
  ModalId,
  ModalPosition,
  PersistedTransaction,
  Rectangle,
  RevealedCoords,
  Transaction,
  WorldLocation,
} from '@darkforest_eth/types';
import { IDBPDatabase, openDB } from 'idb';
import stringify from 'json-stable-stringify';
import _ from 'lodash';
import { MAX_CHUNK_SIZE } from '../../Frontend/Utils/constants';
import { ChunkId, ChunkStore, PersistedChunk } from '../../_types/darkforest/api/ChunkStoreTypes';
import {
  addToChunkMap,
  getChunkKey,
  getChunkOfSideLengthContainingPoint,
  toExploredChunk,
  toPersistedChunk,
} from '../Miner/ChunkUtils';
import { SerializedPlugin } from '../Plugins/SerializedPlugin';

const enum ObjectStore {
  DEFAULT = 'default',
  BOARD = 'knownBoard',
  UNCONFIRMED_ETH_TXS = 'unminedEthTxs',
  PLUGINS = 'plugins',
  /**
   * Store modal positions so that we can keep modal panes open across sessions.
   */
  MODAL_POS = 'modalPositions',
}

const enum DBActionType {
  UPDATE,
  DELETE,
}

interface DBAction<T extends string> {
  type: DBActionType;
  dbKey: T;
  dbValue?: Chunk;
}

type DBTx = DBAction<ChunkId | string>[];

interface DebouncedFunc<T extends () => void> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
}

interface PersistentChunkStoreConfig {
  db: IDBPDatabase;
  contractAddress: EthAddress;
  account: EthAddress;
}

export const MODAL_POSITIONS_KEY = 'modal_positions';

class PersistentChunkStore implements ChunkStore {
  private diagnosticUpdater?: DiagnosticUpdater;
  private db: IDBPDatabase;
  private queuedChunkWrites: DBTx[];
  private throttledSaveChunkCacheToDisk: DebouncedFunc<() => Promise<void>>;
  private nUpdatesLastTwoMins = 0; // we save every 5s, unless this goes above 50
  private chunkMap: Map<ChunkId, Chunk>;
  private confirmedTxHashes: Set<string>;
  private account: EthAddress;
  private contractAddress: EthAddress;

  constructor({ db, account, contractAddress }: PersistentChunkStoreConfig) {
    this.db = db;
    this.queuedChunkWrites = [];
    this.confirmedTxHashes = new Set<string>();
    this.throttledSaveChunkCacheToDisk = _.throttle(
      this.persistQueuedChunks,
      2000 // TODO
    );
    this.chunkMap = new Map();
    this.account = account;
    this.contractAddress = contractAddress;
  }

  destroy(): void {
    // no-op; we don't actually destroy the instance, we leave the db connection open in case we need it in the future
  }

  /**
   * NOTE! if you're creating a new object store, it will not be *added* to existing dark forest
   * accounts. This creation code runs once per account. Therefore, if you're adding a new object
   * store, and need to test it out, you must either clear the indexed db databse for this account,
   * or create a brand new account.
   */
  static async create({
    account,
    contractAddress,
  }: Omit<PersistentChunkStoreConfig, 'db'>): Promise<PersistentChunkStore> {
    const db = await openDB(`darkforest-${contractAddress}-${account}`, 1, {
      upgrade(db) {
        db.createObjectStore(ObjectStore.DEFAULT);
        db.createObjectStore(ObjectStore.BOARD);
        db.createObjectStore(ObjectStore.UNCONFIRMED_ETH_TXS);
        db.createObjectStore(ObjectStore.PLUGINS);
        db.createObjectStore(ObjectStore.MODAL_POS);
      },
    });

    const localStorageManager = new PersistentChunkStore({ db, account, contractAddress });

    await localStorageManager.loadChunks();

    return localStorageManager;
  }

  public setDiagnosticUpdater(diagnosticUpdater?: DiagnosticUpdater) {
    this.diagnosticUpdater = diagnosticUpdater;
  }

  /**
   * Important! This sets the key in indexed db per account and per contract. This means the same
   * client can connect to multiple different dark forest contracts, with multiple different
   * accounts, and the persistent storage will not overwrite data that is not relevant for the
   * current configuration of the client.
   */
  private async getKey(
    key: string,
    objStore: ObjectStore = ObjectStore.DEFAULT
  ): Promise<string | undefined> {
    return await this.db.get(objStore, `${this.contractAddress}-${this.account}-${key}`);
  }

  /**
   * Important! This sets the key in indexed db per account and per contract. This means the same
   * client can connect to multiple different dark forest contracts, with multiple different
   * accounts, and the persistent storage will not overwrite data that is not relevant for the
   * current configuration of the client.
   */
  private async setKey(
    key: string,
    value: string,
    objStore: ObjectStore = ObjectStore.DEFAULT
  ): Promise<void> {
    await this.db.put(objStore, value, `${this.contractAddress}-${this.account}-${key}`);
  }

  private async removeKey(key: string, objStore: ObjectStore = ObjectStore.DEFAULT): Promise<void> {
    await this.db.delete(objStore, `${this.contractAddress}-${this.account}-${key}`);
  }

  private async bulkSetKeyInCollection(
    updateChunkTxs: DBTx[],
    collection: ObjectStore
  ): Promise<void> {
    const tx = this.db.transaction(collection, 'readwrite');
    updateChunkTxs.forEach((updateChunkTx) => {
      updateChunkTx.forEach(({ type, dbKey: key, dbValue: value }) => {
        if (type === DBActionType.UPDATE) {
          tx.store.put(toPersistedChunk(value as Chunk), key);
        } else if (type === DBActionType.DELETE) {
          tx.store.delete(key);
        }
      });
    });
    await tx.done;
  }

  /**
   * This function loads all chunks persisted in the user's storage into the game.
   */
  private async loadChunks(): Promise<void> {
    // we can't bulk get all chunks, since idb will crash/hang
    // we also can't assign random non-primary keys and query on ranges
    // so we append a random alphanumeric character to the front of keys
    // and then bulk query for keys starting with 0, then 1, then 2, etc.
    // see the `getBucket` function in `ChunkUtils.ts` for more information.
    const borders = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ~';
    let chunkCount = 0;

    for (let idx = 0; idx < borders.length - 1; idx += 1) {
      const bucketOfChunks = await this.db.getAll(
        ObjectStore.BOARD,
        IDBKeyRange.bound(borders[idx], borders[idx + 1], false, true)
      );

      bucketOfChunks.forEach((chunk: PersistedChunk) => {
        this.addChunk(toExploredChunk(chunk), false);
      });

      chunkCount += bucketOfChunks.length;
    }

    console.log(`loaded ${chunkCount} chunks from local storage`);
  }

  /**
   * Rather than saving a chunk immediately after it's mined, we queue up new chunks, and
   * periodically save them. This function gets all of the queued new chunks, and persists them to
   * indexed db.
   */
  private async persistQueuedChunks() {
    const toSave = [...this.queuedChunkWrites]; // make a copy
    this.queuedChunkWrites = [];
    this.diagnosticUpdater &&
      this.diagnosticUpdater.updateDiagnostics((d) => {
        d.chunkUpdates = 0;
      });
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
  public async getSavedClaimedCoords(): Promise<ClaimedCoords[]> {
    const claimedPlanetIds = await this.getKey('claimedPlanetIds');

    if (claimedPlanetIds) {
      const parsed = JSON.parse(claimedPlanetIds);
      // changed the type on 6/1/21 to include revealer field
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (parsed.length === 0 || !(parsed[0] as any).revealer) {
        return [];
      }
      return parsed as ClaimedCoords[];
    }

    return [];
  }

  public async saveTouchedPlanetIds(ids: LocationId[]) {
    await this.setKey('touchedPlanetIds', stringify(ids));
  }

  public async saveRevealedCoords(revealedCoordTups: RevealedCoords[]) {
    await this.setKey('revealedPlanetIds', stringify(revealedCoordTups));
  }

  public async saveClaimedCoords(claimedCoordTupps: ClaimedCoords[]) {
    await this.setKey('claimedPlanetIds', stringify(claimedCoordTupps));
  }

  /**
   * Returns the explored chunk data for the given rectangle if that chunk has been mined. If this
   * chunk is entirely contained within another bigger chunk that has been mined, return that chunk.
   * `chunkLoc` is an aligned square, as defined in ChunkUtils.ts in the `getSiblingLocations`
   * function.
   */
  public getChunkByFootprint(chunkLoc: Rectangle): Chunk | undefined {
    let sideLength = chunkLoc.sideLength;

    while (sideLength <= MAX_CHUNK_SIZE) {
      const testChunkLoc = getChunkOfSideLengthContainingPoint(chunkLoc.bottomLeft, sideLength);
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

  private getChunkById(chunkId: ChunkId): Chunk | undefined {
    return this.chunkMap.get(chunkId);
  }

  /**
   * When a chunk is mined, or a chunk is imported via map import, or a chunk is loaded from
   * persistent storage for the first time, we need to add this chunk to the game. This function
   * allows you to add a new chunk to the game, and optionally persist that chunk. The reason you
   * might not want to persist the chunk is if you are sure that you got it from persistent storage.
   * i.e. it already exists in persistent storage.
   */
  public addChunk(chunk: Chunk, persistChunk = true): void {
    if (this.hasMinedChunk(chunk.chunkFootprint)) {
      return;
    }

    const tx: DBAction<ChunkId>[] = [];

    if (persistChunk) {
      const minedSubChunks = this.getMinedSubChunks(chunk);
      for (const subChunk of minedSubChunks) {
        tx.push({
          type: DBActionType.DELETE,
          dbKey: getChunkKey(subChunk.chunkFootprint),
        });
      }
    }

    addToChunkMap(
      this.chunkMap,
      chunk,
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

    this.diagnosticUpdater?.updateDiagnostics((d) => {
      d.totalChunks = this.chunkMap.size;
    });

    // can stop here, if we're just loading into in-memory store from storage
    if (!persistChunk) {
      return;
    }

    this.queuedChunkWrites.push(tx);

    this.diagnosticUpdater &&
      this.diagnosticUpdater.updateDiagnostics((d) => {
        d.chunkUpdates = this.queuedChunkWrites.length;
      });

    // save chunks every 5s if we're just starting up, or 30s once we're moving
    this.recomputeSaveThrottleAfterUpdate();
    this.throttledSaveChunkCacheToDisk();
  }

  /**
   * Returns all the mined chunks with smaller sidelength strictly contained in the chunk.
   *
   * TODO: move this into ChunkUtils, and also make use of it, the way that it is currently used, in
   * the function named `addToChunkMap`.
   */
  private getMinedSubChunks(chunk: Chunk): Chunk[] {
    const ret: Chunk[] = [];
    for (
      let clearingSideLen = 16;
      clearingSideLen < chunk.chunkFootprint.sideLength;
      clearingSideLen *= 2
    ) {
      for (let x = 0; x < chunk.chunkFootprint.sideLength; x += clearingSideLen) {
        for (let y = 0; y < chunk.chunkFootprint.sideLength; y += clearingSideLen) {
          const queryChunk: Rectangle = {
            bottomLeft: {
              x: chunk.chunkFootprint.bottomLeft.x + x,
              y: chunk.chunkFootprint.bottomLeft.y + y,
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
      this.throttledSaveChunkCacheToDisk = _.throttle(this.persistQueuedChunks, 30000);
    }
    setTimeout(() => {
      this.nUpdatesLastTwoMins -= 1;
      if (this.nUpdatesLastTwoMins === 49) {
        this.throttledSaveChunkCacheToDisk.cancel();
        this.throttledSaveChunkCacheToDisk = _.throttle(this.persistQueuedChunks, 5000);
      }
    }, 120000);
  }

  public allChunks(): Iterable<Chunk> {
    return this.chunkMap.values();
  }

  /**
   * Whenever a transaction is submitted, it is persisted. When the transaction either fails or
   * succeeds, it is un-persisted. The reason we persist submitted transactions is to be able to
   * wait for them upon a fresh start of the game if you close the game before a transaction
   * confirms.
   */
  public async onEthTxSubmit(tx: Transaction): Promise<void> {
    // in case the tx was mined and saved already
    if (!tx.hash || this.confirmedTxHashes.has(tx.hash)) return;
    const ser: PersistedTransaction = { hash: tx.hash, intent: tx.intent };
    await this.db.put(ObjectStore.UNCONFIRMED_ETH_TXS, JSON.parse(JSON.stringify(ser)), tx.hash);
  }

  /**
   * Partner function to {@link PersistentChunkStore#onEthTxSubmit}
   */
  public async onEthTxComplete(txHash: string): Promise<void> {
    this.confirmedTxHashes.add(txHash);
    await this.db.delete(ObjectStore.UNCONFIRMED_ETH_TXS, txHash);
  }

  public async getUnconfirmedSubmittedEthTxs(): Promise<PersistedTransaction[]> {
    const ret: PersistedTransaction[] = await this.db.getAll(ObjectStore.UNCONFIRMED_ETH_TXS);
    return ret;
  }

  public async loadPlugins(): Promise<SerializedPlugin[]> {
    const savedPlugins = await this.getKey('plugins', ObjectStore.PLUGINS);

    if (!savedPlugins) {
      return [];
    }

    return JSON.parse(savedPlugins) as SerializedPlugin[];
  }

  public async savePlugins(plugins: SerializedPlugin[]): Promise<void> {
    await this.setKey('plugins', JSON.stringify(plugins), ObjectStore.PLUGINS);
  }

  public async saveModalPositions(modalPositions: Map<ModalId, ModalPosition>): Promise<void> {
    if (!this.db.objectStoreNames.contains(ObjectStore.MODAL_POS)) return;
    const serialized = JSON.stringify(Array.from(modalPositions.entries()));
    await this.setKey(MODAL_POSITIONS_KEY, serialized, ObjectStore.MODAL_POS);
  }

  public async loadModalPositions(): Promise<Map<ModalId, ModalPosition>> {
    if (!this.db.objectStoreNames.contains(ObjectStore.MODAL_POS)) return new Map();
    const winPos = await this.getKey(MODAL_POSITIONS_KEY, ObjectStore.MODAL_POS);
    return new Map(winPos ? JSON.parse(winPos) : null);
  }
}

export default PersistentChunkStore;
