import autoBind from 'auto-bind';
import { AttribType } from '../EngineTypes';

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

export type GLArray = Float32Array | Uint8Array;

type GLArrayConstructor = Float32ArrayConstructor | Uint8ArrayConstructor;

/**
 * Helper class - essentially an implementation of ArrayList from Java, but using
 * typed JS Arrays so that we can efficiently write our WebGL data without converting.
 */
export class AttribArray {
  /**
   * A typed array, representing the data in this array.
   */
  public array: GLArray;

  /**
   * The number of bytes per data entry in this array.
   */
  private size: number;

  /**
   * The WebGL data type that this array represents.
   */
  private type: AttribType;

  constructor(type: AttribType, startSize = 4) {
    this.type = type;
    this.size = startSize;

    this.createArray();

    autoBind(this);
  }

  /**
   * Initialize a new blank array of size this.size.
   */
  private createArray(): void {
    const typeSize = getAttribTypeSize(this.type);
    const buffer = new ArrayBuffer(typeSize * this.size);
    this.array = new (getConstructor(this.type))(buffer);
  }

  /**
   * Initialize a new array of 2x the length, and copy in the old data.
   */
  private doubleLen(): void {
    this.size *= 2;
    const oldArr = this.array;
    this.createArray();
    this.array.set(oldArr, 0);
  }

  /**
   * Copy in an array of data starting at an index. Writing past the maximum
   * array length will trigger doubleLen().
   *
   * @param els - The array of data to copy.
   * @param idx - The array index to start at.
   */
  public set(els: ArrayLike<number>, idx: number): void {
    while (idx + els.length > this.size) this.doubleLen();
    this.array.set(els, idx);
  }
}
