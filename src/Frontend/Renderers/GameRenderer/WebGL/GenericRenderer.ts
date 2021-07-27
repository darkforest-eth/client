import { mat3, mat4 } from 'gl-matrix';
import {
  AttribProps,
  DrawMode,
  UniformJSType,
  UniformProps,
  UniformType,
  Vec3,
} from '../EngineTypes';
import AttribManager from './AttribManager';
import ProgramUtils from './ProgramUtils';
import { WebGLManager } from './WebGLManager';

type UniformData = {
  [key: string]: UniformProps;
};

type AttribData = {
  [key: string]: AttribProps;
};

/**
 * An object that describes all of the necessary data to create and manage
 * this program within the renderer.
 */
interface EngineProgramDefinition {
  uniforms: UniformData;
  attribs: AttribData;
  vertexShader: string;
  fragmentShader: string;
}

type UniformSetter = (el: UniformJSType) => void;

type UniformSetters<T extends EngineProgramDefinition> = {
  [k in keyof T['uniforms']]: UniformSetter;
};

type UniformLocs<T extends EngineProgramDefinition> = {
  [k in keyof T['uniforms']]: WebGLUniformLocation;
};

type AttribManagers<T extends EngineProgramDefinition> = {
  [k in keyof T['attribs']]: AttribManager;
};

/**
 * Create a setter which writes the given uniform specified by `props` to `loc`.
 * Note that this function does not call gl.useProgram().
 *
 * @param gl The WebGL rendering context this uniform is in.
 * @param loc The uniform location to write to.
 * @param props UniformProps for this uniform.
 */
function getUniformSetter(
  gl: WebGL2RenderingContext,
  loc: WebGLUniformLocation,
  props: UniformProps
): UniformSetter {
  const { name, type } = props;
  if (type === UniformType.Mat4) {
    return (el: mat4) => {
      gl.uniformMatrix4fv(loc, false, el);
    };
  } else if (type === UniformType.Mat3) {
    return (el: mat3) => {
      gl.uniformMatrix3fv(loc, false, el);
    };
  } else if (type === UniformType.Float) {
    return (el: number) => {
      gl.uniform1f(loc, el);
    };
  } else if (type === UniformType.UByte) {
    return (el: number) => {
      gl.uniform1i(loc, el);
    };
  } else if (type === UniformType.Texture) {
    return (el: number) => {
      gl.uniform1i(loc, el);
    };
  } else if (type === UniformType.Vec3) {
    return (el: Vec3) => {
      gl.uniform3fv(loc, el);
    };
  } else {
    throw `uniform type for ${name} not recognized`;
  }
}

/**
 * Takes in a gl context, program sources (frag and vert shader),
 * and data about attribs / uniforms and provides:
 * - attrib managers
 * - uniform setters
 * - skeleton code for rendering in our engine via `flush()`
 */
export class GenericRenderer<T extends EngineProgramDefinition> {
  /** The program corresponding to this renderer. */
  public program: WebGLProgram;

  /** A dictionary of uniform setters, keyed by uniform name. */
  public uniformSetters: UniformSetters<T>;

  /** A dictionary of attrib managers, keyed by attrib name. */
  public attribManagers: AttribManagers<T>;

  /**
   * Uniform data for this program. Typically not used after construction.
   * Kept for use in inherited classes.
   */
  public uniformData: UniformData;
  /**
   * Uniform data for this program. Typically not used after construction.
   * Kept for use in inherited classes.
   */
  public attribData: AttribData;

  /**
   * Uniform locs for this program. Typically not referenced directly,
   * but rather through generated uniformSetters. Kept for use in inherited classes.
   */
  public uniformLocs: UniformLocs<T>;

  /** WebGLManager corresponding to this program. */
  public manager: WebGLManager;

  /** The number of queued vertices so far. Used for batch rendering. */
  public verts: number; // TODO make private and use setter

  /**
   * Create a renderer from a WebGLManager and program data.
   * @param glManager WebGLManager which holds context for rendering this program.
   * @param programData ProgramData describing this program.
   */
  constructor(glManager: WebGLManager, programData: T) {
    this.verts = 0;

    this.manager = glManager;
    const { gl } = glManager;

    const { vertexShader: vert, fragmentShader: frag, uniforms, attribs } = programData;

    const program = ProgramUtils.programFromSources(gl, vert, frag);
    if (program === null) throw 'error compiling program';
    this.program = program;

    this.uniformData = uniforms;
    this.attribData = attribs;

    gl.useProgram(program); // may be superfluous

    // construct uniform setters
    const uniformLocs: Partial<UniformLocs<T>> = {};
    const uniformSetters: Partial<UniformSetters<T>> = {};
    for (const [key, props] of Object.entries(uniforms)) {
      const { name } = props;
      const k = key as keyof T['uniforms'];
      const loc = gl.getUniformLocation(program, name);
      if (!loc) throw `uniform ${name} doesn't exist!`;

      uniformLocs[k] = loc;
      uniformSetters[k] = getUniformSetter(gl, loc, props);
    }
    this.uniformLocs = uniformLocs as UniformLocs<T>;
    this.uniformSetters = uniformSetters as UniformSetters<T>;

    // construct attrib managers
    const attribManagers: Partial<AttribManagers<T>> = {};
    for (const [key, props] of Object.entries(attribs)) {
      const k = key as keyof T['attribs'];
      attribManagers[k] = new AttribManager(gl, program, props);
    }
    this.attribManagers = attribManagers as AttribManagers<T>;
  }

  /**
   * Run by flush(). Override this in child classes. Programs with uniformss
   * should always override this.
   */
  public setUniforms() {
    if (Object.keys(this.uniformData).length !== 0) console.error('did not override setUniforms!');
    return;
  }

  /**
   * Draw all buffered vertices to the screen.
   * @param drawMode The drawing mode for the buffered vertices. Default: Triangles.
   */
  public flush(drawMode: DrawMode = DrawMode.Triangles) {
    if (this.verts === 0) return;

    const { gl } = this.manager;
    gl.useProgram(this.program);

    this.setUniforms();

    for (const attrib in this.attribManagers) {
      this.attribManagers[attrib].bufferData(this.verts);
    }

    // draw
    gl.drawArrays(drawMode, 0, this.verts);

    this.verts = 0;
  }
}
