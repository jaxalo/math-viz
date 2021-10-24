<template>
  <canvas id="canvas" class="t-border"></canvas>
</template>

<script>
let canvas;
let ctx;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default {
  name: "LacedGround",
  data() {
    return {
      expParameter: null
    };
  },
  mounted() {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    this.$parent.$on('start-experiment', this.startExperiment);
  },
  methods: {
    startExperiment(expParameter) {
      this.expParameter = expParameter;
      this.drawStripes();
      this.drawNeedles();
    },
    drawStripes() {
      ctx.fillStyle = 'black';
      const {width, height} = canvas.getBoundingClientRect();
      ctx.height = height;
      ctx.width = width;
      const stripWidth = this.expParameter.stripWidth;
      for (let i = 0; i <= height / stripWidth; ++i) {
        ctx.fillRect(0, i * stripWidth, width, 1);
      }
      ctx.stroke();
    },
    drawNeedles() {
      const r = this.expParameter.needleLength;

      for (let i = 0; i < this.expParameter.nbIterations; ++i) {
        const x1 = randomIntFromInterval(0, 300);
        const y1 = randomIntFromInterval(0, 150);
        const theta = Math.random() * Math.PI * 2;
        const x2 = x1 + r * Math.cos(theta);
        const y2 = y1 + r * Math.sin(theta);
        const collide = Math.abs(Math.floor(y2 / this.expParameter.stripWidth) - Math.floor(y1 / this.expParameter.stripWidth));

        ctx.beginPath();
        ctx.strokeStyle = (collide === 1) ? 'green' : 'red';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        this.$emit('get-collision', { iteration: i, collide });
      }
    }
  },

}


</script>

<style scoped>
.t-border {
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
</style>
