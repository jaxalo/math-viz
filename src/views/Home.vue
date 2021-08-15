<template>
  <div class="t-flex">
    <button @click="goToMandelbrot()">Mandelbrot</button>
    <button @click="goToSierpinski()">Sierpinski</button>
    <button @click="goToBuffonMonteCarlo()">BuffonMonteCarlo</button>
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
.t-flex {
  display: flex;
  vertical-align: center;
}
</style>
