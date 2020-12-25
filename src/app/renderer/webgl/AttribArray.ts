import autoBind from 'auto-bind';
import { AttribType, GLArray, GLArrayConstructor } from '../utils/EngineTypes';

/* helper class; essentially an implementation of ArrayList from java */

const getAttribTypeSize = (type: AttribType): number => {
  if (type === AttribType.Float) return 4;
  else if (type === AttribType.UByte) return 1;
  else {
    console.error('unrecognized attrib type');
    return 0;
  }
};

const getConstructor = (type: AttribType): GLArrayConstructor => {
  if (type === AttribType.Float) return Float32Array;
  else if (type === AttribType.UByte) return Uint8Array;
  else {
    console.error('unrecognized attrib type');
    return Float32Array;
  }
};

export class AttribArray {
  buffer: ArrayBuffer;
  array: GLArray;

  size: number;

  type: AttribType;

  constructor(type: AttribType, startSize = 4) {
    this.type = type;
    this.size = startSize;

    this.createArray();

    autoBind(this);
  }

  private createArray(): void {
    const typeSize = getAttribTypeSize(this.type);
    this.buffer = new ArrayBuffer(typeSize * this.size);
    this.array = new (getConstructor(this.type))(this.buffer);
  }

  private doubleLen(): void {
    this.size *= 2;
    const oldArr = this.array;
    this.createArray();
    this.array.set(oldArr, 0);
  }

  set(els: ArrayLike<number>, idx: number): void {
    while (idx + els.length > this.size) this.doubleLen();
    this.array.set(els, idx);
  }
}
