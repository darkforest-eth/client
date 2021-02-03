import {
  BiomeArgs,
  ContractCallArgs,
  InitializePlayerArgs,
  MoveSnarkArgs,
} from '../_types/darkforest/api/ContractsAPITypes';
import {
  SnarkJSProof,
  SnarkJSProofAndSignals,
} from '../_types/global/GlobalTypes';
import { BigInteger } from 'big-integer';
import mimcHash, { modPBigInt, modPBigIntNative } from '../miner/mimc';
import * as bigInt from 'big-integer';
import { fakeHash } from '../miner/permutation';
import TerminalEmitter, { TerminalTextStyle } from '../utils/TerminalEmitter';
import perlin from '../miner/perlin';
import FastQueue from 'fastq';

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
  type: 'mem';
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

class SnarkProverQueue {
  private taskQueue: FastQueue.queue;
  private taskCount: number;

  constructor() {
    this.taskQueue = FastQueue(this.execute, 1);
    this.taskCount = 0;
  }

  public doProof(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    input: any,
    /* eslint-enable @typescript-eslint/no-explicit-any */
    circuit: string | SnarkJSBin,
    zkey: string | SnarkJSBin
  ): Promise<SnarkJSProofAndSignals> {
    const taskId = this.taskCount++;
    const task = {
      input,
      circuit,
      zkey,
      taskId,
    };

    return new Promise<SnarkJSProofAndSignals>((resolve, reject) => {
      this.taskQueue.push(task, function (err, result) {
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
      const res = await window.snarkjs.groth16.fullProve(
        task.input,
        task.circuit,
        task.zkey
      );
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
        'INIT: calculating witness and proof',
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
        : await this.snarkProverQueue.doProof(
            input,
            '/public/circuits/init/circuit.wasm?id=6',
            '/public/init.zkey?id=5'
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
  ): Promise<MoveSnarkArgs> {
    try {
      const terminalEmitter = TerminalEmitter.getInstance();

      const start = Date.now();
      terminalEmitter.println(
        'MOVE: calculating witness and proof',
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
      const circuitRaw = await fetch('/public/circuits/move/circuit.wasm?id=5')
        .then((res) => res.arrayBuffer())
        .then((ab) => new Uint8Array(ab));
      const zkeyRaw = await fetch('/public/move.zkey?id=5')
        .then((res) => res.arrayBuffer())
        .then((ab) => new Uint8Array(ab));
      const circuitData: SnarkJSBin = {
        type: 'mem',
        data: circuitRaw,
      };
      const zkeyData: SnarkJSBin = {
        type: 'mem',
        data: zkeyRaw,
      };

      const snarkProof: SnarkJSProofAndSignals = this.useMockHash
        ? SnarkArgsHelper.fakeProof()
        : await this.snarkProverQueue.doProof(input, circuitData, zkeyData);
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
      return proofArgs as MoveSnarkArgs;
    } catch (e) {
      throw e;
    }
  }

  async getFindArtifactArgs(x: number, y: number): Promise<BiomeArgs> {
    try {
      const terminalEmitter = TerminalEmitter.getInstance();

      const start = Date.now();
      terminalEmitter.println(
        'ARTIFACT: calculating witness and proof',
        TerminalTextStyle.Sub
      );
      const input: FindArtifactInfo = {
        x: modPBigInt(x).toString(),
        y: modPBigInt(y).toString(),
      };
      const snarkProof: SnarkJSProofAndSignals = this.useMockHash
        ? SnarkArgsHelper.fakeProof()
        : await this.snarkProverQueue.doProof(
            input,
            '/public/circuits/biomebase/circuit.wasm?id=5',
            '/public/biomebase.zkey?id=5'
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
        pi_a: ['0', '0', '0'],
        pi_b: [
          ['0', '0'],
          ['0', '0'],
          ['0', '0'],
        ],
        pi_c: ['0', '0', '0'],
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
