<template>
  <div>
    <div class="t-horizontal">
      <LacedGround @get-collision="getCollision"></LacedGround>
      <Graph></Graph>
    </div>

    <div class="t-horizontal">
      <ExperimentParams @experiment-params="getExperimentParams"></ExperimentParams>
    </div>
  </div>
</template>

<script>
import LacedGround from "@/components/LacedGround";
import Graph from "@/components/Graph";
import ExperimentParams from "@/components/ExperimentParams";

export default {
  name: "BuffonMonteCarlo",
  components: {ExperimentParams, Graph, LacedGround},
  data() {
    return {
      expParameter: null,
    };
  },
  methods: {
    getExperimentParams(experimentParams) {
      this.assign(experimentParams);
    },
    assign(newExpParameter) {
      this.expParameter = newExpParameter;
      this.$emit('start-experiment', this.expParameter);
    },
    getCollision({iteration, collide}) {
      this.$emit('get-collision', {iteration, collide});
    }
  }
}

</script>

<style scoped>
.t-horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: stretch;
  justify-content: center;
}

</style>
