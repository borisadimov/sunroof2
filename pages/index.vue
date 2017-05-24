<template lang="pug">
  .page.home
    home-canvas
</template>

<script>
import HomeCanvas from '~components/HomeCanvas'

export default {
  name: 'Home',

  head: {
    title: 'Sunroof | Home'
  },

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
</style>
