// adds line numbers to a string. useful for debugging shaders
const withLineNums = (shader: string): string =>
  shader.split('\n').reduce((acc, curr, i) => acc + `[${i}] ` + curr + '\n', '');

export default class ProgramUtils {
  public static createShader(
    gl: WebGL2RenderingContext,
    type: number,
    source: string
  ): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) {
      console.error('error creating shader');
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;

    // log errors
    console.error('error compiling shader');
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  public static createProgram(
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragShader: WebGLShader
  ): WebGLProgram | null {
    const program = gl.createProgram();
    if (!program) {
      console.error('error creating program');
      return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;

    // log errors
    console.error('error creating program!');
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  public static programFromSources(
    gl: WebGL2RenderingContext,
    vertexShaderSource: string,
    fragShaderSource: string
  ): WebGLProgram | null {
    const { createShader, createProgram } = ProgramUtils;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);

    if (!vertexShader || !fragShader) {
      console.error('shader compile error: ', !!vertexShader, !!fragShader);
      console.log('vertex', withLineNums(vertexShaderSource));
      console.log('fragment', withLineNums(fragShaderSource));
      return null;
    }

    const program = createProgram(gl, vertexShader, fragShader);
    if (!program) console.error('error creating program');

    return program;
  }
}
