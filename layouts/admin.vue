<template lang="pug">
  nuxt-container
    nuxt
</template>
<script>

export default {

}

</script>
<style lang="scss">
  * {
    box-sizing: border-box;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity .5s ease;
  }

  .page-enter-active {
    transition-delay: .5s;
  }

  .page-enter, .page-leave-active {
    opacity: 0;
  }

  #app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
  }

</style>
