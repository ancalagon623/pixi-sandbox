// this source code will produce the code that will convert 3 dimensional point data into data that the GPU can render on the screen.

export const vertexShaderSource = `
  // attributes are used for storing converted buffer data
  attribute vec4 a_position;

  void main() {

    // gl_Position is a variable the shader is expected to set that will be used by the GPU
    gl_Position = a_position;
  }
`;

export const fragShaderSource = `
  precision mediump float;

  void main() {

    gl_FragColor = vec4(1, 0, 0.5, 1); // set reddish purple as the fragment color
  }
`;

// --------------- Some 3D libraries create these shaders dynamically. Keep this in mind when learning THREE.js

// Step 2. write a function that will create a shader, upload the source code, and compile it.

export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader;
}

// Step 3: write a function that will attach the shaders to a program and link that program to the GPU.
export function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS); 
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

