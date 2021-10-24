<template>
  <div>
    <div class="form-group">
      <label>Strip width</label>
      <input type="number" name="stripWidth" class="form-control" v-model="stripWidth">
    </div>
    <div class="form-group">
      <label>Needle length</label>
      <input type="number" name="needleLength" class="form-control" v-model="needleLength">
    </div>
    <div class="form-group">
      <label>Nb iterations</label>
      <input type="number" name="nbIterations"  class="form-control" v-model="nbIterations">
    </div>
    <button class="t-submit-btn btn btn-primary" @click="sendParams">Submit</button>
    <p class="text-danger" v-if="!validParameter">Invalid Parameter</p>
  </div>
</template>

<script>
export default {
  name: "ExperimentParams",
  data() {
    return {
      stripWidth: 0,
      needleLength: 0,
      nbIterations: 0,
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
    }
  }
}
</script>

<style scoped>
.t-submit-btn {
  margin-top: 12px;
}
</style>
