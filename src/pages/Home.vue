<template lang="pug">
  .page.home
    .logo
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },

  mounted () {
  },

  components: {

  }
}
</script>

<style scoped>
  .home {
    background: url('../assets/home.svg') no-repeat center / cover;
  }

  .logo {
    background: url('../assets/logo.svg') no-repeat center / contain;
    width: 300px;
    height: 145px;

    position: absolute;
    top: 39%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
