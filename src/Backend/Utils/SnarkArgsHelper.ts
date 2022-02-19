import { fakeHash, mimcHash, modPBigInt, modPBigIntNative, perlin } from '@darkforest_eth/hashing';
import {
  BiomebaseSnarkContractCallArgs,
  BiomebaseSnarkInput,
  buildContractCallArgs,
  fakeProof,
  InitSnarkContractCallArgs,
  InitSnarkInput,
  MoveSnarkContractCallArgs,
  MoveSnarkInput,
  RevealSnarkContractCallArgs,
  RevealSnarkInput,
  SnarkJSProofAndSignals,
} from '@darkforest_eth/snarks';
import biomebaseCircuitPath from '@darkforest_eth/snarks/biomebase.wasm';
import biomebaseZkeyPath from '@darkforest_eth/snarks/biomebase.zkey';
import initCircuitPath from '@darkforest_eth/snarks/init.wasm';
import initZkeyPath from '@darkforest_eth/snarks/init.zkey';
import moveCircuitPath from '@darkforest_eth/snarks/move.wasm';
import moveZkeyPath from '@darkforest_eth/snarks/move.zkey';
import revealCircuitPath from '@darkforest_eth/snarks/reveal.wasm';
import revealZkeyPath from '@darkforest_eth/snarks/reveal.zkey';
import { PerlinConfig } from '@darkforest_eth/types';
import * as bigInt from 'big-integer';
import { BigInteger } from 'big-integer';
import FastQueue from 'fastq';
import { LRUMap } from 'mnemonist';
import { TerminalTextStyle } from '../../Frontend/Utils/TerminalTypes';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import { HashConfig } from '../../_types/global/GlobalTypes';

type ZKPTask = {
  taskId: number;
  input: unknown;
  circuit: string; // path
  zkey: string; // path

  onSuccess: (proof: SnarkJSProofAndSignals) => void;
  onError: (e: Error) => void;
};

type SnarkInput = RevealSnarkInput | InitSnarkInput | MoveSnarkInput | BiomebaseSnarkInput;

class SnarkProverQueue {
  private taskQueue: FastQueue.queue;
  private taskCount: number;

  constructor() {
    this.taskQueue = FastQueue(this.execute.bind(this), 1);
    this.taskCount = 0;
  }

  public doProof(
    input: SnarkInput,
    circuit: string,
    zkey: string
  ): Promise<SnarkJSProofAndSignals> {
    const taskId = this.taskCount++;
    const task = {
      input,
      circuit,
      zkey,
      taskId,
    };

    return new Promise<SnarkJSProofAndSignals>((resolve, reject) => {
      this.taskQueue.push(task, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  private async execute(
    task: ZKPTask,
    cb: (err: Error | null, result: SnarkJSProofAndSignals | null) => void
  ) {
    try {
      console.log(`proving ${task.taskId}`);
      const res = await window.snarkjs.groth16.fullProve(task.input, task.circuit, task.zkey);
      console.log(`proved ${task.taskId}`);
      cb(null, res);
    } catch (e) {
      console.error('error while calculating SNARK proof:');
      console.error(e);
      cb(e, null);
    }
  }
}

class SnarkArgsHelper {
  /**
   * How many snark results to keep in an LRU cache.
   */
  private static readonly DEFAULT_SNARK_CACHE_SIZE = 20;
  private readonly useMockHash: boolean;
  private readonly snarkProverQueue: SnarkProverQueue;
  private readonly terminal: React.MutableRefObject<TerminalHandle | undefined>;
  private readonly hashConfig: HashConfig;
  private readonly spaceTypePerlinOpts: PerlinConfig;
  private readonly biomebasePerlinOpts: PerlinConfig;
  private readonly planetHashMimc: (...inputs: number[]) => BigInteger;
  private moveSnarkCache: LRUMap<string, MoveSnarkContractCallArgs>;

  private constructor(
    hashConfig: HashConfig,
    terminal: React.MutableRefObject<TerminalHandle | undefined>,
    useMockHash: boolean
  ) {
    this.useMockHash = useMockHash;
    this.terminal = terminal;
    this.snarkProverQueue = new SnarkProverQueue();
    this.hashConfig = hashConfig;
    this.planetHashMimc = useMockHash
      ? fakeHash(hashConfig.planetRarity)
      : mimcHash(hashConfig.planetHashKey);
    this.spaceTypePerlinOpts = {
      key: hashConfig.spaceTypeKey,
      scale: hashConfig.perlinLengthScale,
      mirrorX: hashConfig.perlinMirrorX,
      mirrorY: hashConfig.perlinMirrorY,
      floor: true,
    };
    this.biomebasePerlinOpts = {
      key: hashConfig.biomebaseKey,
      scale: hashConfig.perlinLengthScale,
      mirrorX: hashConfig.perlinMirrorX,
      mirrorY: hashConfig.perlinMirrorY,
      floor: true,
    };
    this.moveSnarkCache = new LRUMap<string, MoveSnarkContractCallArgs>(
      SnarkArgsHelper.DEFAULT_SNARK_CACHE_SIZE
    );
  }

  static create(
    hashConfig: HashConfig,
    terminal: React.MutableRefObject<TerminalHandle | undefined>,
    fakeHash = false
  ): SnarkArgsHelper {
    const snarkArgsHelper = new SnarkArgsHelper(hashConfig, terminal, fakeHash);
    return snarkArgsHelper;
  }

  setSnarkCacheSize(size: number) {
    if (size <= 0) {
      throw new Error(`cache size has to be positive`);
    }

    const newCache = new LRUMap<string, MoveSnarkContractCallArgs>(size);
    const oldKeys = Array.from(this.moveSnarkCache.keys());

    for (let i = 0; i < newCache.capacity && i < this.moveSnarkCache.size; i++) {
      newCache.set(oldKeys[i], this.moveSnarkCache.get(oldKeys[i]) as MoveSnarkContractCallArgs);
    }

    this.moveSnarkCache.clear();
    this.moveSnarkCache = newCache;
  }

  async getRevealArgs(x: number, y: number): Promise<RevealSnarkContractCallArgs> {
    try {
      const start = Date.now();
      this.terminal.current?.println(
        'REVEAL: calculating witness and proof',
        TerminalTextStyle.Sub
      );
      const input: RevealSnarkInput = {
        x: modPBigInt(x).toString(),
        y: modPBigInt(y).toString(),
        PLANETHASH_KEY: this.hashConfig.planetHashKey.toString(),
        SPACETYPE_KEY: this.hashConfig.spaceTypeKey.toString(),
        SCALE: this.hashConfig.perlinLengthScale.toString(),
        xMirror: this.hashConfig.perlinMirrorX ? '1' : '0',
        yMirror: this.hashConfig.perlinMirrorY ? '1' : '0',
      };

      const { proof, publicSignals }: SnarkJSProofAndSignals = this.useMockHash
        ? this.fakeRevealProof(x, y)
        : await this.snarkProverQueue.doProof(input, revealCircuitPath, revealZkeyPath);
      const ret = buildContractCallArgs(proof, publicSignals) as RevealSnarkContractCallArgs;
      const end = Date.now();
      this.terminal.current?.println(
        `REVEAL: calculated witness and proof in ${end - start}ms`,
        TerminalTextStyle.Sub
      );

      return ret;
    } catch (e) {
      throw e;
    }
  }

  async getInitArgs(x: number, y: number, r: number): Promise<InitSnarkContractCallArgs> {
    try {
      const start = Date.now();
      this.terminal.current?.println('INIT: calculating witness and proof', TerminalTextStyle.Sub);
      const input: InitSnarkInput = {
        x: modPBigInt(x).toString(),
        y: modPBigInt(y).toString(),
        r: r.toString(),
        PLANETHASH_KEY: this.hashConfig.planetHashKey.toString(),
        SPACETYPE_KEY: this.hashConfig.spaceTypeKey.toString(),
        SCALE: this.hashConfig.perlinLengthScale.toString(),
        xMirror: this.hashConfig.perlinMirrorX ? '1' : '0',
        yMirror: this.hashConfig.perlinMirrorY ? '1' : '0',
      };

      const { proof, publicSignals }: SnarkJSProofAndSignals = this.useMockHash
        ? this.fakeInitProof(x, y, r)
        : await this.snarkProverQueue.doProof(input, initCircuitPath, initZkeyPath);
      const ret = buildContractCallArgs(proof, publicSignals) as InitSnarkContractCallArgs;
      const end = Date.now();
      this.terminal.current?.println(
        `INIT: calculated witness and proof in ${end - start}ms`,
        TerminalTextStyle.Sub
      );

      return ret;
    } catch (e) {
      throw e;
    }
  }

  async getMoveArgs(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    r: number,
    distMax: number
  ): Promise<MoveSnarkContractCallArgs> {
    const cacheKey = `${x1}-${y1}-${x2}-${y2}-${r}-${distMax}`;
    const cachedResult = this.moveSnarkCache.get(cacheKey);
    if (cachedResult) {
      console.log('MOVE: retrieved snark args from cache');
      return Promise.resolve(cachedResult);
    }

    try {
      const start = Date.now();
      this.terminal.current?.println('MOVE: calculating witness and proof', TerminalTextStyle.Sub);
      const input: MoveSnarkInput = {
        x1: modPBigInt(x1).toString(),
        y1: modPBigInt(y1).toString(),
        x2: modPBigInt(x2).toString(),
        y2: modPBigInt(y2).toString(),
        r: r.toString(),
        distMax: distMax.toString(),
        PLANETHASH_KEY: this.hashConfig.planetHashKey.toString(),
        SPACETYPE_KEY: this.hashConfig.spaceTypeKey.toString(),
        SCALE: this.hashConfig.perlinLengthScale.toString(),
        xMirror: this.hashConfig.perlinMirrorX ? '1' : '0',
        yMirror: this.hashConfig.perlinMirrorY ? '1' : '0',
      };

      const { proof, publicSignals }: SnarkJSProofAndSignals = this.useMockHash
        ? this.fakeMoveProof(x1, y1, x2, y2, r, distMax)
        : await this.snarkProverQueue.doProof(input, moveCircuitPath, moveZkeyPath);

      const proofArgs = buildContractCallArgs(proof, publicSignals) as MoveSnarkContractCallArgs;
      const end = Date.now();
      this.terminal.current?.println(
        `MOVE: calculated witness and proof in ${end - start}ms`,
        TerminalTextStyle.Sub
      );

      this.moveSnarkCache.set(cacheKey, proofArgs);
      return proofArgs;
    } catch (e) {
      throw e;
    }
  }

  async getFindArtifactArgs(x: number, y: number): Promise<BiomebaseSnarkContractCallArgs> {
    try {
      const start = Date.now();
      this.terminal.current?.println(
        'ARTIFACT: calculating witness and proof',
        TerminalTextStyle.Sub
      );
      const input: BiomebaseSnarkInput = {
        x: modPBigInt(x).toString(),
        y: modPBigInt(y).toString(),
        PLANETHASH_KEY: this.hashConfig.planetHashKey.toString(),
        BIOMEBASE_KEY: this.hashConfig.biomebaseKey.toString(),
        SCALE: this.hashConfig.perlinLengthScale.toString(),
        xMirror: this.hashConfig.perlinMirrorX ? '1' : '0',
        yMirror: this.hashConfig.perlinMirrorY ? '1' : '0',
      };

      const { proof, publicSignals }: SnarkJSProofAndSignals = this.useMockHash
        ? this.fakeBiomebaseProof(x, y)
        : await this.snarkProverQueue.doProof(input, biomebaseCircuitPath, biomebaseZkeyPath);

      const proofArgs = buildContractCallArgs(proof, publicSignals);
      const end = Date.now();
      this.terminal.current?.println(
        `ARTIFACT: calculated witness and proof in ${end - start}ms`,
        TerminalTextStyle.Sub
      );

      return proofArgs as BiomebaseSnarkContractCallArgs;
    } catch (e) {
      throw e;
    }
  }

  private fakeRevealProof(x: number, y: number) {
    const hash = this.planetHashMimc(x, y);
    const perl = perlin({ x, y }, this.spaceTypePerlinOpts);
    const publicSignals: BigInteger[] = [
      hash,
      bigInt(perl),
      bigInt(x),
      bigInt(y),
      bigInt(this.hashConfig.planetHashKey),
      bigInt(this.hashConfig.spaceTypeKey),
      bigInt(this.hashConfig.perlinLengthScale),
      bigInt(this.hashConfig.perlinMirrorX ? 1 : 0),
      bigInt(this.hashConfig.perlinMirrorY ? 1 : 0),
    ];
    return fakeProof(publicSignals.map((x) => modPBigIntNative(x).toString(10)));
  }

  private fakeInitProof(x: number, y: number, r: number) {
    const hash = this.planetHashMimc(x, y);
    const perl = perlin({ x, y }, this.spaceTypePerlinOpts);
    const publicSignals: BigInteger[] = [
      hash,
      bigInt(perl),
      bigInt(r),
      bigInt(this.hashConfig.planetHashKey),
      bigInt(this.hashConfig.spaceTypeKey),
      bigInt(this.hashConfig.perlinLengthScale),
      bigInt(this.hashConfig.perlinMirrorX ? 1 : 0),
      bigInt(this.hashConfig.perlinMirrorY ? 1 : 0),
    ];
    return fakeProof(publicSignals.map((x) => modPBigIntNative(x).toString(10)));
  }

  private fakeMoveProof(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    r: number,
    distMax: number
  ) {
    const hash1 = this.planetHashMimc(x1, y1);
    const hash2 = this.planetHashMimc(x2, y2);
    const perl2 = perlin({ x: x2, y: y2 }, this.spaceTypePerlinOpts);
    const publicSignals: BigInteger[] = [
      hash1,
      hash2,
      bigInt(perl2),
      bigInt(r),
      bigInt(distMax),
      bigInt(this.hashConfig.planetHashKey),
      bigInt(this.hashConfig.spaceTypeKey),
      bigInt(this.hashConfig.perlinLengthScale),
      bigInt(this.hashConfig.perlinMirrorX ? 1 : 0),
      bigInt(this.hashConfig.perlinMirrorY ? 1 : 0),
    ];
    return fakeProof(publicSignals.map((x) => modPBigIntNative(x).toString(10)));
  }

  private fakeBiomebaseProof(x: number, y: number) {
    const hash = this.planetHashMimc(x, y);
    const biomebase = bigInt(perlin({ x, y }, this.biomebasePerlinOpts));
    const publicSignals: BigInteger[] = [
      hash,
      biomebase,
      bigInt(this.hashConfig.planetHashKey),
      bigInt(this.hashConfig.biomebaseKey),
      bigInt(this.hashConfig.perlinLengthScale),
      bigInt(this.hashConfig.perlinMirrorX ? 1 : 0),
      bigInt(this.hashConfig.perlinMirrorY ? 1 : 0),
    ];
    return fakeProof(publicSignals.map((x) => modPBigIntNative(x).toString(10)));
  }
}

export default SnarkArgsHelper;
