<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
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

</style>
