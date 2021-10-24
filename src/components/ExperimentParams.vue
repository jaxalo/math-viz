<template>
  <div>
    <div class="t-row-center">
      <div class="form-group t-margin-right">
        <label>Strip width</label>
        <input type="number" name="stripWidth" class="form-control" v-model="stripWidth">
      </div>
      <div class="form-group t-margin-right">
        <label>Needle length</label>
        <input type="number" name="needleLength" class="form-control" v-model="needleLength">
      </div>
      <div class="form-group">
        <label>Nb iterations</label>
        <input type="number" name="nbIterations"  class="form-control" v-model="nbIterations">
      </div>
    </div>
    <div class="t-col-center">
      <div>
        <button class="t-submit-btn btn btn-primary t-margin-right" @click="sendParams">Submit</button>
        <button class="t-submit-btn btn btn-light" @click="reset">Reset</button>
      </div>
      <p class="text-danger t-margin-top" v-if="!validParameter">Invalid Parameter</p>
      <a class="t-margin-top" href="https://en.wikipedia.org/wiki/Buffon%27s_needle_problem">Explanation of the Buffon Needle Experiment</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExperimentParams",
  data() {
    return {
      stripWidth: 10,
      needleLength: 5,
      nbIterations: 1000,
      validParameter: true,
    };
  },
  methods: {
    sendParams() {
      const newExperiment = {
        stripWidth: +this.stripWidth,
        needleLength: +this.needleLength,
        nbIterations: +this.nbIterations,
      };
      this.setValidateParams(newExperiment);
      if(this.validParameter) {
        this.$emit('experiment-params', newExperiment);
      }
    },
    setValidateParams(newExperiment) {
      const {stripWidth, needleLength, nbIterations} = newExperiment;
      this.validParameter = stripWidth > 0 && needleLength > 0 && needleLength <= stripWidth && nbIterations > 0;
    },
    reset() {
      location.reload();
    }
  }
}
</script>

<style scoped>
.t-submit-btn {
  margin-top: 12px;
}

.t-row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: stretch;
  justify-content: center;
}

.t-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: stretch;
  justify-content: center;
}

.t-margin-right {
  margin-right: 18px;
}

.t-margin-top {
  margin-top: 18px;
}

</style>
