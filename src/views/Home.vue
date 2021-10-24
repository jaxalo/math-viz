<template>
  <div class="t-flex-container t-isma">
      <button class="t-items btn btn-primary" @click="goToMandelbrot()">Mandelbrot</button>
      <button class="t-items btn btn-primary" @click="goToSierpinski()">Sierpinski</button>
      <button class="t-items btn btn-primary" @click="goToBuffonMonteCarlo()">Buffon Needles</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    goToMandelbrot() {
      this.$router.push({path: '/mandelbrot'});
    },
    goToSierpinski() {
      this.$router.push({path: '/sierpinski'});
    },
    goToBuffonMonteCarlo() {
      this.$router.push({path: '/buffonMonteCarlo'});
    }
  }
}
</script>

<style scoped>

.t-flex-container {
  height: 500px;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.t-items {
  display: flex;
  margin-bottom: 12px;
  width: 200px;
  text-align: center;
}

.t-isma {
  border: 1px solid red;
}
</style>
