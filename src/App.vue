<template lang="pug">
  #app
    Navigation
    transition(name="fade" appear)
      router-view
</template>

<script>
import Navigation from '@/components/Navigation/Navigation'

export default {
  name: 'app',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');
  @import url('normalize.css');

  .preloader {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: red;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .container {
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 1440px;
    padding: 0 100px;
  }

  .page {
    width: 100%;
    height: 100vh;
    opacity: 0.999;
  }

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .5s;
  }

  .fade-enter-active {
    transition-delay: .5s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
