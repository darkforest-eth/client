import { AttribProps, GLArray } from '../utils/EngineTypes';
import { AttribArray } from './AttribArray';

/* responsible for queuing data about a webgl attribute and then writing to it. does this by maintaining a persistent 
   AttribArray and WebGLBuffer reference, and then calling bufferData on n vertices at a time */

export default class AttribManager {
  gl: WebGL2RenderingContext;
  props: AttribProps;

  loc: number;
  buffer: WebGLBuffer;

  attribArray: AttribArray;

  constructor(
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    props: AttribProps,
    enable = true
  ) {
    this.gl = gl;
    this.props = props;

    gl.useProgram(program); // should not be necessary, but just in case

    const loc = gl.getAttribLocation(program, props.name);
    const buffer = gl.createBuffer();
    if (!buffer) throw 'error creating buffer with name: ' + props.name;

    if (enable) gl.enableVertexAttribArray(loc);

    this.loc = loc;
    this.buffer = buffer;

    this.attribArray = new AttribArray(props.type);
  }

  // set starting from the # idx vertex
  setVertex(els: number[], idx: number): void {
    this.attribArray.set(els, idx * this.props.dim);
  }

  getArray(): GLArray {
    return this.attribArray.array;
  }

  // TODO add support for STATIC_DRAW (if we ever have those)
  // send vertices 0 through n to the buffer
  bufferData(n: number): void {
    const { gl, loc } = this;
    const { dim, type, normalize } = this.props;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.vertexAttribPointer(loc, dim, type, normalize, 0, 0);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      this.attribArray.array,
      gl.DYNAMIC_DRAW,
      0,
      n * dim
    );
  }
}
