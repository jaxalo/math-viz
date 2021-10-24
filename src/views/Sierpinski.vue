<template>
  <div class="t-column t-margin">
    <p>Press up arrow key</p>
    <canvas class="t-size-draw" id="canvas"></canvas>
  </div>
</template>
<script>


export default {
  name: "Sierpinski",
  mounted() {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    canvas.height = 600;
    canvas.width = 600;
    const [p1, p2, p3] = getStartingPointTriangle();
    drawTriangle([p1, p2, p3], [0, 0, 0]);
    nbIteration = 5;
    curTriangles = [[p1, p2, p3]];
  }
}
let canvas;
let ctx;
let curTriangles = [];
let nbIteration;
let oldTime = 0;
let delta = 2000;

function getStartingPointTriangle() {
  const width = 500;
  const height = 500;
  const offsetX = 50;
  const p1 = {x: width / 2 + offsetX, y: height - (Math.sqrt(3) * width) / 2};
  const p2 = {x: offsetX, y: height};
  const p3 = {x: width + offsetX, y: height};
  return [p1, p2, p3];
}

function drawTriangle([p1, p2, p3], color) {
  ctx = canvas.getContext('2d');
  const path = new Path2D();
  path.moveTo(p1.x, p1.y);
  path.lineTo(p2.x, p2.y);
  path.lineTo(p3.x, p3.y);
  ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  ctx.fill(path);
}

function getMid(p1, p2) {
  return {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2};
}

function getCoordinateOfTriangleAndHole(triangle) {
  const [a, b, c] = triangle;

  const midAB = getMid(a, b);
  const midAC = getMid(a, c);
  const midBC = getMid(b, c);

  const newTriangle1 = [a, midAB, midAC];
  const newTriangle2 = [b, midBC, midAB];
  const newTriangle3 = [c, midAC, midBC];

  return {triangles: [newTriangle1, newTriangle2, newTriangle3], hole: [midAB, midAC, midBC]};
}

function draw() {
  let trianglesAndHoles;
  trianglesAndHoles = curTriangles.map((triangle) => getCoordinateOfTriangleAndHole(triangle));
  curTriangles = [];
  for (const {triangles, hole} of trianglesAndHoles) {
    curTriangles = curTriangles.concat(triangles);
    drawTriangle(hole, [255, 255, 255]);
  }
  ctx.stroke();
}

function loop(currentTime) {
  if (oldTime === 0) {
    oldTime = currentTime;
  }

  if ((currentTime - oldTime) >= delta && nbIteration !== 0) {
    draw();
    oldTime = currentTime;
    nbIteration--;
  }
  requestAnimationFrame(loop);
}

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case "ArrowUp":
      requestAnimationFrame(loop);
      break;
    default:
      return;
  }
  event.preventDefault();
}, true);

</script>

<style scoped>
#canvas {
  border: 2px solid black;
}

.t-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: stretch;
  justify-content: center;
}



.t-margin {
  margin-top: 30px;
}

.t-size-draw {
  width: 500px;
  height: 500px;
}

</style>
