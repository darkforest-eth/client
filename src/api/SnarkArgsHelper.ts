import {
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

interface InitInfo {
  x: string;
  y: string;
  p: string;
  r: string;
}

interface MoveInfo {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  p2: string;
  r: string;
  distMax: string;
}

class SnarkArgsHelper {
  private readonly useMockHash: boolean;

  private constructor(useMockHash: boolean) {
    this.useMockHash = useMockHash;
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
    p: number,
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
        p: modPBigInt(p).toString(),
        r: r.toString(),
      };

      const hash = this.useMockHash ? fakeHash(x, y) : mimcHash(x, y);
      const publicSignals: BigInteger[] = [hash, bigInt(p), bigInt(r)];

      const snarkProof: SnarkJSProofAndSignals = await window.snarkjs.groth16.fullProve(
        input,
        '/public/circuits/init/circuit.wasm',
        '/public/init.zkey'
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
      throw new Error('error calculating zkSNARK.');
    }
  }

  async getMoveArgs(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    p2: number,
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
        p2: modPBigInt(p2).toString(),
        r: r.toString(),
        distMax: distMax.toString(),
      };
      const snarkProof: SnarkJSProofAndSignals = await window.snarkjs.groth16.fullProve(
        input,
        'public/circuits/move/circuit.wasm',
        '/public/move.zkey'
      );
      const hash1 = this.useMockHash ? fakeHash(x1, y1) : mimcHash(x1, y1);
      const hash2 = this.useMockHash ? fakeHash(x2, y2) : mimcHash(x2, y2);
      const publicSignals: BigInteger[] = [
        hash1,
        hash2,
        bigInt(p2),
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
      throw new Error('error calculating zkSNARK.');
    }
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
      [snarkProof.pi_b[0].reverse(), snarkProof.pi_b[1].reverse()], // pi_b
      snarkProof.pi_c.slice(0, 2), // pi_c
      publicSignals.map((signal) => signal.toString(10)), // input
    ];
  }
}

export default SnarkArgsHelper;
