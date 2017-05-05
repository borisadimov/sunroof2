<template lang="pug">
  .page.home
    home-canvas
</template>

<script>
import HomeCanvas from '@/components/HomeCanvas'

export default {
  name: 'Home',
  data () {
    return {

    }
  },

  mounted () {
  },

  components: {
    HomeCanvas
  }
}
</script>

<style scoped lang="scss">
  .home {

  }

  @keyframes backgroundGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
