import { vertexShaderSource, fragShaderSource, createShader, createProgram } from "./shaders";

const main = () => {

  //--------------------------BEGIN INIT CODE (PAGE LOAD CODE)---------------------------------

  // initialize the rendering context allowing us to change the graphics.
  const canvas = document.querySelector('#canvas');
  
  const gl = canvas.getContext('webgl');

  // Exit the program after displaying a message if webgl is not supported
  if (context === null) {
    alert('WebGL is not supported in your current browser. Please switch to another browser to play this game.');
    return;
  }

  // Step 3: Create the shaders from the shader creator and source code we already made.
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);

  // Step 4: Link the shaders into a single program.
  const program = createProgram(gl, vertexShader, fragmentShader);

  // 5. Look up the location of the attribute we created (a_position)
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // 6. Attributes are supplied data from a buffer (the buffer runs on the GPU)
  const positionBuffer = gl.createBuffer();
  
  // 7. WebGL provides bind points under the gl interface that act as containers for whatever resource you want to store and then access globally through the gl object.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 8. Now that the bindpoint contains the buffer we can actually put data into it by referencing the bind point.
  const positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  //----------------------------END INIT CODE----------------------------------

  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // 9. Tell WebGL that the clip space with 1 and -1 as its extreme boundary maps to the height and the width of the canvas.
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
  // Clear the canvas
  gl.clearColor(1, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // tell gl which shader program to execute
  gl.useProgram(program);

  // enable the attribute in the vertex shader
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Tell the position Attribute how to get data out of the ARRAY_BUFFER.
  const size = 2;           // 2 components per iteration
  const type = gl.FLOAT;    // the data is 32 bit floating point numbers
  const normalize = false;  // don't normalize the data
  const stride = 0;         // number of bits in each iteration (32 bits times 2 numbers)
  const offset = 0;         // starting index
  // implicitly binds the buffer that ARRAY_BUFFER points to to the given attribute, and 'a_position' will continue to use positionBuffer. Now ARRAY_BUFFER is free to be used for another buffer.
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
  // NOTE the attribute is vec4, meaning it is a vector made of 4 floating point numbers. It is initialized to vec4(0, 0, 0, 1). Since it is pulling 2 components at a time from the buffer, it will fill its first 2 float values.
  // ------ Example: position = {x: 0, y: 0, z: 0, w: 1} ----> pull 2 values -----> position = {x: 3, y: 4; z: 0, w: 1}


  // Finally we can ask WebGL to execute our program.
  // NOTE count is the number of times to run the vertex shader in order to iterate through the buffer.
  // NOTE sice the primitive type is triangle, WebGL will draw a triangle with every three points the shader produces.
  const primitiveType = gl.TRIANGLES;
  const count = 3;
  gl.drawArrays(primitiveType, offset, count);

}

main();