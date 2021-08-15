<template>
  <canvas id="canvas"></canvas>
</template>

<script>
let kmax = 50;
let canvas;
let ctx;
let height;
let width;

export default {
  name: 'Mandelbrot',
  mounted() {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    const grd = ctx.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, "yellow");
    grd.addColorStop(1, "blue");
    resetSize();
    computeMandelbrot();
  }
}

function resetSize() {
  height = window.innerHeight;
  width = window.innerWidth;
  canvas.height = height;
  canvas.width = width;
}

function absModule({x, y}) {
  return x * x + y * y;
}

function pickHex(color1, color2, weight) {
  var w1 = weight;
  var w2 = 1 - w1;
  var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}

function squareComplexe({x, y}) {
  return {
    x: x * x - y * y,
    y: 2 * x * y
  }
}

function getMandelbrotSet(c) {
  let z = {x: 0, y: 0};
  let z_square = {x: 0, y: 0};
  let k;
  for (k = 0; k < kmax && absModule(z) <= 4; k++) {
    z_square = squareComplexe(z);
    z = {x: c.x + z_square.x, y: c.y + z_square.y};
  }
  return {drawIt: absModule(z) <= 4, weight: k / kmax};
}

function computeMandelbrot() {
  const posMin = {x: -2, y: -1};
  const posMax = {x: 1, y: 1};
  // postion of julia island for zooming in
  //const posMin = {x: -0.74364388709, y: 0.13182590415};
  //const posMax = {x: -0.74364388699, y: 0.13182590425};
  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      let curPoint = {
        x: posMin.x + i * ((posMax.x - posMin.x) / width),
        y: posMin.y + j * ((posMax.y - posMin.y) / height)
      };
      const {drawIt, weight} = getMandelbrotSet(curPoint);
      if (drawIt) {
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(i, j, 1, 1);
      } else {
        const color = pickHex([0, 0, 255], [255, 255, 0], weight);
        ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
  ctx.stroke();
}


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#canvas {
  border: 2px solid black;
}
</style>
