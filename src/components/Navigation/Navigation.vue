<template lang="pug">
  transition(name="fade" appear)
    .header
      .header-item
        router-link.header-link(to="/")
          img(src="./home.svg")
          .header-link__text
            | Home
        router-link.header-link(to="/")
          img(src="./logo.svg")
        router-link.header-link(to="/about")
          .header-link__text
            | About
          img(src="./about.svg")

      .header-item
        router-link.header-link(to="/portfolio")
          img(src="./portfolio.svg")
          .header-link__text
            | Portfolio
        router-link.header-link(to="/contact")
          .header-link__text
            | Contact
          img(src="./contact.svg")
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      // homeSVG: require('./home.svg'),
      // aboutSVG: require('./about.svg'),
      // contactSVG: require('./contact.svg'),
      // portfolioSVG: require('./portfolio.svg'),
    }
  },

  components: {

  },

  mounted () {
  }
}
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    padding: 30px;

    z-index: 999;
  }

  .header-item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .header-link {
    text-decoration: none;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    &:hover .header-link__text {
      opacity: 0.999;
      transform: translate3d(0,0,0);
    }
  }

  .header-link__text {
    margin: 0 10px;

    font-family: SourceSansPro-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 0;

    opacity: 0.001;
    transform: translate3d(-100%,0,0);
    transition: opacity 0.2s ease, transform 0.2s ease;
    will-change: transform, opacity;
  }
</style>
