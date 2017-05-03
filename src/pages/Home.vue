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

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .logo {
    background: url('../assets/logo.svg') no-repeat center / contain;
    width: 300px;
    height: 145px;

    margin-bottom: 150px;
  }
</style>
