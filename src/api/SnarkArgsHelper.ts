import {
  BiomeArgs,
  ContractCallArgs,
  InitializePlayerArgs,
  MoveSnarkArgs,
} from "../_types/darkforest/api/ContractsAPITypes";
import {
  SnarkJSProof,
  SnarkJSProofAndSignals,
  SnarkLogData,
} from "../_types/global/GlobalTypes";
import { BigInteger } from "big-integer";
import mimcHash, { modPBigInt, modPBigIntNative } from "../miner/mimc";
import * as bigInt from "big-integer";
import { fakeHash } from "../miner/permutation";
import TerminalEmitter, { TerminalTextStyle } from "../utils/TerminalEmitter";
import perlin from "../miner/perlin";
import * as CRC32 from "crc-32";

type ZKSnarkTaskId = {
  id: number;
};

type InitInfo = {
  x: string;
  y: string;
  r: string;
};

type MoveInfo = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  r: string;
  distMax: string;
};

type FindArtifactInfo = {
  x: string;
  y: string;
};

type SnarkJSBin = {
  type: "mem";
  data: Uint8Array;
};

type ZKPTask = {
  taskId: number;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  input: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  circuit: string | SnarkJSBin; // path or uint8array
  zkey: string | SnarkJSBin; // path or uint8array

  onSuccess: (proof: SnarkJSProofAndSignals) => void;
  onError: (e: Error) => void;
};

/**
 * WET; we have an async task execution queue in ContractsAPI also
 * if we have to write a third one then i'll abstract it
 */

// * Needed to separate doProof from execute while still passing back a Promise associated with the task. 
// To do this we're going to generate the promise to insert into the taskQueue as well as into the ZKSnarkPromiseCache
// Instead of directly returning the promise we'll return the id that can be used to get the promise from the PromiseCache
// We can than call executeBatch which copies the taskQueue, reset the queue's contents, and then "reduces" through chain.
// The corresponding Promise in the cache will resolve when the task is completed in executeBatch
// WeakMap will garbage collect the promises once there is no reference to them outside of the WeakMap which should prevent the map from growing too large

class SnarkProverQueue {
  private taskQueue: ZKPTask[];
  private currentlyExecuting: boolean;
  private nextBatchQueued: boolean;
  private executionPromise: Promise<any>;
  private taskCount: number;
  public ZKSnarkPromiseCache: WeakMap<ZKSnarkTaskId, Promise<any>>;
  constructor() {
    this.taskQueue = [];
    this.currentlyExecuting = false;
    this.nextBatchQueued = false;
    this.executionPromise = Promise.resolve();
    this.taskCount = 0;
    this.ZKSnarkPromiseCache = new WeakMap();
  }

  public insertTask(
    input: any,
    /* eslint-enable @typescript-eslint/no-explicit-any */
    circuit: string | SnarkJSBin,
    zkey: string | SnarkJSBin
  ): ZKSnarkTaskId {
    const taskId = this.taskCount++;
    const TasksPromise = new Promise<SnarkJSProofAndSignals>(
      (resolve, reject) => {
        this.taskQueue.push({
          input,
          circuit,
          zkey,
          taskId,
          onSuccess: resolve,
          onError: reject,
        });
      }
    );
    const t: ZKSnarkTaskId = { id: taskId };
    this.ZKSnarkPromiseCache.set(t, TasksPromise);
    this.executeBatch();
    return t;
  }

  public async executeBatch() {
    if (this.nextBatchQueued) {
      //If the next batch is already queued prevent multiple empty batches from building up
      return;
    }
    if (this.currentlyExecuting) {
      this.nextBatchQueued = true;
      await this.executionPromise;
      //Will be unset after execution chain has resolved
      this.currentlyExecuting = true;
      this.nextBatchQueued = false;
      //Executing this batch, next execute call should be 'nextBatch'
    }
    //Grab Batch and empty task queue
    const batch = [...this.taskQueue];
    this.taskQueue = [];
    // Reducing here rather than recursing should prevent OOM
    // We want grab the actual promise here not await it.
    this.executionPromise = batch.reduce((chain, task) => {
      return chain.then((_) => this.execute(task));
    }, Promise.resolve());
    // await the task chain to be finished.
    await this.executionPromise;
    // set currently executing to false so next batch can start
    this.currentlyExecuting = false;
    // retun this.exectionPromise so downstream can take async action on
    return this.executionPromise;
  }

  public doProof(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    input: any,
    /* eslint-enable @typescript-eslint/no-explicit-any */
    circuit: string | SnarkJSBin,
    zkey: string | SnarkJSBin
  ): Promise<SnarkJSProofAndSignals> {
    return new Promise<SnarkJSProofAndSignals>((resolve, reject) => {
      const taskId = this.taskCount++;
      this.taskQueue.push({
        input,
        circuit,
        zkey,
        taskId,
        onSuccess: resolve,
        onError: reject,
      });
      if (!this.currentlyExecuting) {
        const toExec = this.taskQueue.shift();
        if (toExec) this.execute(toExec);
      }
    });
  }

  private async execute(task: ZKPTask) {
    this.currentlyExecuting = true;
    try {
      console.log(`proving ${task.taskId}`);
      const res = await window.snarkjs.groth16.fullProve(
        task.input,
        task.circuit,
        task.zkey
      );
      console.log(`proved ${task.taskId}`);
      task.onSuccess(res);
    } catch (e) {
      console.error("error while calculating SNARK proof:");
      console.error(e);
      task.onError(e);
    }
    this.currentlyExecuting = false;
  }
}

class SnarkArgsHelper {
  private readonly useMockHash: boolean;
  private readonly snarkProverQueue: SnarkProverQueue;

  private constructor(useMockHash: boolean) {
    this.useMockHash = useMockHash;
    this.snarkProverQueue = new SnarkProverQueue();
  }

  destroy(): void {
    // don't need to do anything
  }

  static create(fakeHash = false): SnarkArgsHelper {
    const snarkArgsHelper = new SnarkArgsHelper(fakeHash);

    return snarkArgsHelper;
  }

  async getInitArgs(
    x: number,
    y: number,
    r: number
  ): Promise<InitializePlayerArgs> {
    try {
      const start = Date.now();
      const terminalEmitter = TerminalEmitter.getInstance();
      terminalEmitter.println(
        "INIT: calculating witness and proof",
        TerminalTextStyle.Sub
      );
      const input: InitInfo = {
        x: modPBigInt(x).toString(),
        y: modPBigInt(y).toString(),
        r: r.toString(),
      };

      const hash = this.useMockHash ? fakeHash(x, y) : mimcHash(x, y);
      const perl = perlin({ x, y });
      const publicSignals: BigInteger[] = [hash, bigInt(perl), bigInt(r)];

      const snarkProof: SnarkJSProofAndSignals = this.useMockHash
        ? SnarkArgsHelper.fakeProof()
        : await this.snarkProverQueue.ZKSnarkPromiseCache.get(
            this.snarkProverQueue.insertTask(
              input,
              "/public/circuits/init/circuit.wasm?id=6",
              "/public/init.zkey?id=5"
            )
          );
      const ret = this.callArgsFromProofAndSignals(
        snarkProof.proof,
        publicSignals.map((x) => modPBigIntNative(x))
      ) as InitializePlayerArgs;
      const end = Date.now();
      terminalEmitter.println(
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
  ): Promise<[MoveSnarkArgs, SnarkLogData]> {
    try {
      const terminalEmitter = TerminalEmitter.getInstance();
      const start = Date.now();
      terminalEmitter.println(
        "MOVE: calculating witness and proof",
        TerminalTextStyle.Sub
      );
      const input: MoveInfo = {
        x1: modPBigInt(x1).toString(),
        y1: modPBigInt(y1).toString(),
        x2: modPBigInt(x2).toString(),
        y2: modPBigInt(y2).toString(),
        r: r.toString(),
        distMax: distMax.toString(),
      };
      const circuitRaw = await fetch("/public/circuits/move/circuit.wasm?id=5")
        .then((res) => res.arrayBuffer())
        .then((ab) => new Uint8Array(ab));
      const zkeyRaw = await fetch("/public/move.zkey?id=5")
        .then((res) => res.arrayBuffer())
        .then((ab) => new Uint8Array(ab));
      const snarkjsRaw = await fetch("/public/snarkjs.min.js")
        .then((res) => res.arrayBuffer())
        .then((ab) => new Uint8Array(ab));
      const circuitData: SnarkJSBin = {
        type: "mem",
        data: circuitRaw,
      };
      const zkeyData: SnarkJSBin = {
        type: "mem",
        data: zkeyRaw,
      };

      const snarkProof: SnarkJSProofAndSignals = this.useMockHash
        ? SnarkArgsHelper.fakeProof()
        : await this.snarkProverQueue.ZKSnarkPromiseCache.get(
            this.snarkProverQueue.insertTask(input, circuitData, zkeyData)
          );

      const hash1 = this.useMockHash ? fakeHash(x1, y1) : mimcHash(x1, y1);
      const hash2 = this.useMockHash ? fakeHash(x2, y2) : mimcHash(x2, y2);
      const perl2 = perlin({ x: x2, y: y2 });
      const publicSignals: BigInteger[] = [
        hash1,
        hash2,
        bigInt(perl2),
        bigInt(r),
        bigInt(distMax),
      ];
      const end = Date.now();
      terminalEmitter.println(
        `MOVE: calculated witness and proof in ${end - start}ms`,
        TerminalTextStyle.Sub
      );
      const proofArgs = this.callArgsFromProofAndSignals(
        snarkProof.proof,
        publicSignals.map((x) => modPBigIntNative(x))
      );
      const vkey = await fetch("public/move_vkey.json").then((res) =>
        res.json()
      );
      const localVerified = await window.snarkjs.groth16.verify(
        vkey,
        snarkProof.publicSignals,
        snarkProof.proof,
        console
      );
      const snarkLogs: SnarkLogData = {
        expectedSignals: snarkProof.publicSignals,
        actualSignals: publicSignals.map((x) => x.toString()),
        proofVerified: localVerified,
        circuitCRC: CRC32.buf(circuitRaw),
        zkeyCRC: CRC32.buf(zkeyRaw),
        snarkjsCRC: CRC32.buf(snarkjsRaw),
      };
      return [proofArgs as MoveSnarkArgs, snarkLogs];
    } catch (e) {
      throw e;
    }
  }

  async getFindArtifactArgs(x: number, y: number): Promise<BiomeArgs> {
    try {
      const terminalEmitter = TerminalEmitter.getInstance();

      const start = Date.now();
      terminalEmitter.println(
        "ARTIFACT: calculating witness and proof",
        TerminalTextStyle.Sub
      );
      const input: FindArtifactInfo = {
        x: modPBigInt(x).toString(),
        y: modPBigInt(y).toString(),
      };
      const snarkProof: SnarkJSProofAndSignals = this.useMockHash
        ? SnarkArgsHelper.fakeProof()
        : await this.snarkProverQueue.ZKSnarkPromiseCache.get(
            this.snarkProverQueue.insertTask(
              input,
              "/public/circuits/biomebase/circuit.wasm?id=5",
              "/public/biomebase.zkey?id=5"
            )
          );

      const hash = this.useMockHash ? fakeHash(x, y) : mimcHash(x, y);
      const biomebase = bigInt(perlin({ x, y }, true, true));
      const publicSignals: BigInteger[] = [hash, biomebase];
      const end = Date.now();
      terminalEmitter.println(
        `ARTIFACT: calculated witness and proof in ${end - start}ms`,
        TerminalTextStyle.Sub
      );
      const proofArgs = this.callArgsFromProofAndSignals(
        snarkProof.proof,
        publicSignals.map((x) => modPBigIntNative(x))
      );

      return proofArgs as BiomeArgs;
    } catch (e) {
      throw e;
    }
  }

  // if we're using a mock hash and ZK proofs are disabled, just give an empty proof
  private static fakeProof(): SnarkJSProofAndSignals {
    return {
      proof: {
        pi_a: ["0", "0", "0"],
        pi_b: [
          ["0", "0"],
          ["0", "0"],
          ["0", "0"],
        ],
        pi_c: ["0", "0", "0"],
      },
      publicSignals: [],
    };
  }

  private callArgsFromProofAndSignals(
    snarkProof: SnarkJSProof,
    publicSignals: BigInteger[]
  ): ContractCallArgs {
    // the object returned by genZKSnarkProof needs to be massaged into a set of parameters the verifying contract
    // will accept
    return [
      snarkProof.pi_a.slice(0, 2), // pi_a
      // genZKSnarkProof reverses values in the inner arrays of pi_b
      [
        snarkProof.pi_b[0].slice(0).reverse(),
        snarkProof.pi_b[1].slice(0).reverse(),
      ], // pi_b
      snarkProof.pi_c.slice(0, 2), // pi_c
      publicSignals.map((signal) => signal.toString(10)), // input
    ];
  }
}

export default SnarkArgsHelper;
