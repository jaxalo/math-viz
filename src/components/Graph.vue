<template>
  <div id="root" class="t-border">
  </div>
</template>

<script>
import functionPlot from "function-plot";

export default {
  name: "Graph",
  data() {
    return {
      expParameter: null,
      collisions: [],
      nbCollision: 0,
      started: false,
      startPlotting: []
    };
  },
  mounted: function () {
    this.$parent.$on('start-experiment', this.startExperiment);
    this.$parent.$on('get-collision', this.getCollision);
  },
  watch: {
    startPlotting: function () {
      const loadedExperiment = this.startPlotting.findIndex((e) => e === 'exp');
      const loadedCollisions = this.startPlotting.findIndex((e) => e === 'col');
      if (loadedExperiment !== -1 && loadedCollisions !== -1 && this.collisions.length === this.expParameter.nbIterations) {
        this.plotFunction();
      }
    }
  },
  methods: {
    startExperiment(expParameter) {
      this.expParameter = expParameter;
      this.startPlotting.push('exp');
    },
    getCollision({collide}) {
      if (this.collisions.length === 0) {
        this.startPlotting.push('col');
      }
      this.nbCollision += collide;
      this.collisions.push(this.nbCollision);
    },
    piApproximator(index) {
      const numerator = 2 * this.expParameter.needleLength * this.expParameter.nbIterations;
      const denominator = this.expParameter.stripWidth * this.collisions[index];
      if (denominator === 0) return 0;
      return Math.abs(numerator / denominator - Math.PI);
    },
    plotFunction() {
      let contentsBounds = document.getElementById('root').getBoundingClientRect();
      let width = 500;
      let height = 500;
      let ratio = contentsBounds.width / width;
      width *= ratio;
      height *= ratio;
      const points = Array.from(Array(this.expParameter.nbIterations).keys())
          .map((index) => [index, this.piApproximator(index)]);

      let getLast =  (arr = null, n = null) => {
        if (arr == null) return void 0;
        if (n === null) return arr[arr.length - 1];
        return arr.slice(Math.max(arr.length - n, 0));
      }

      console.log('lastPoints',getLast(points, 10));
      functionPlot({
        target: "#root",
        width,
        height,
        yAxis: {domain: [0, 1], label: 'diff with pi'},
        xAxis: {domain: [0, this.collisions.length], label: 'iteration'},
        grid: true,
        data: [{
          points,
          fnType: 'points',
          graphType: 'polyline'
        }],
      });
    }
  },
}
</script>

<style scoped>
.t-border {
  width: 500px;
  height: 500px;
  border: 1px solid black;
  margin: 20px;
}
</style>
