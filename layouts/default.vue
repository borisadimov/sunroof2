<template lang="pug">
  nuxt-container#app(:class="$route.name.toLowerCase()")
    transition(name="color" appear)
      nuxt-link.header-link.header-link__home(to="/")
        svgicon.svg-home(icon="home" width="18" height="19")
        .header-link__text
          | Home

    transition(name="color" appear)
      nuxt-link.header-link.header-link__logo(to="/" v-if="$route.name.toLowerCase() !== 'index'")
        svgicon.svg-logo(icon="logo" width="40" height="40")

    transition(name="color" appear)
      nuxt-link.header-link.header-link__about(to="/about")
        .header-link__text
          | About
        svgicon.svg-about(icon="about" width="18" height="18")

    transition(name="color" appear)
      nuxt-link.header-link.header-link__portfolio(to="/portfolio")
        svgicon.svg-portfolio(icon="portfolio" width="36" height="24")
        .header-link__text
          | Portfolio

    transition(name="color" appear)
      nuxt-link.header-link.header-link__contact(to="/contact")
        .header-link__text
          | Contact
        svgicon.svg-contact(icon="contact" width="24" height="24px")

    nuxt
</template>
<script>
if (process.BROWSER_BUILD) {
  require('~/components/Navigation')
}

import svgicon from 'vue-svgicon/component/svgicon'

export default {
  components: {
    svgicon
  },

  mounted () {
    console.log(this.$route.name)
  }
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

  .container {
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 1440px;
    padding: 0 100px;
  }

  .page {
    width: 100%;
    min-height: 700px;
    height: 100vh;
  }

  @media (max-width: 768px) {
    .page {
      height: auto;
      min-height: 100vh;
    }

    .container {
      padding: 100px 30px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-enter-active {
    transition-delay: .5s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .color-enter-active, .color-leave-active {
    transition: color .5s ease;
  }

  .header-link {
    text-decoration: none;

    display: flex;
    flex-flow: row nowrap;

    color: initial;
    position: fixed;
    z-index: 11;

    &:hover .header-link__text {
      opacity: 0.7;
      transform: translate3d(0,0,0);
    }
  }

  .header-link__home {
    top: 30px;
    left: 30px;
  }

  .header-link__logo {
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }

  .header-link__about {
    top: 30px;
    right: 30px;
  }

  .header-link__portfolio {
    bottom: 30px;
    left: 30px;
  }

  .header-link__contact {
    bottom: 30px;
    right: 30px;
  }

  @media (max-width: 768px) {
    .header-link__home {
      top: 25px;
      left: 15px;
    }

    .header-link__logo {
      top: 15px;
    }

    .header-link__about {
      top: 25px;
      right: 15px;
    }

    .header-link__portfolio {
      bottom: 15px;
      left: 15px;
    }

    .header-link__contact {
      bottom: 15px;
      right: 15px;
    }
  }

  @media (min-width: 769px) {
    .header-link {
      height: 8vw;
      width: 8vw;
    }

    .header-link__home {
      top: 15px;
      left: 15px;

      justify-content: flex-start;
      align-items: flex-start;

      .header-link__text {
        margin-top: 2px;
      }
    }

    .header-link__logo {
      top: 15px;

      justify-content: center;
      align-items: flex-start;
    }

    .header-link__about {
      top: 15px;
      right: 15px;

      justify-content: flex-end;
      align-items: flex-start;
    }

    .header-link__portfolio {
      bottom: 15px;
      left: 15px;

      justify-content: flex-start;
      align-items: flex-end;

      .header-link__text {
        margin-bottom: 5px;
      }
    }

    .header-link__contact {
      bottom: 15px;
      right: 15px;

      justify-content: flex-end;
      align-items: flex-end;

      .header-link__text {
        margin-bottom: 5px;
      }
    }
  }

  .header-link__home {
    .svg-home {
      fill: transparent !important;

      path {
        fill: #000;
        transition: fill .2s ease;
        will-change: fill;
      }

      circle {
        fill: transparent;
        transition: fill .2s ease;
        will-change: fill;
      }
    }

    &:hover .svg-home {
      path {
        fill: none;
      }

      circle {
        fill: #000;
      }
    }
  }

  .header-link__about {
    .svg-about {
      fill: transparent !important;
      transform: rotate(-90deg);
      transition: transform .2s ease;
      will-change: transform;

    }

    &:hover .svg-about  {
      transform: initial;

    }
  }

  .header-link__portfolio {
    .svg-portfolio {
      fill: none !important;
    }

    .svg-portfolio path:last-child {
      transform: translateX(-50%);
      transition: transform .2s ease;
      will-change: transform;
    }

    &:hover path:last-child {
      transform: initial;
    }
  }

  .header-link__contact {
    .svg-contact {
      fill: transparent !important;
    }

    .svg-contact path:first-child {
      transform: translate3d(50%, 50%, 0);
      transition: transform .2s ease;
      will-change: transform;
    }

    &:hover .svg-contact path:first-child {
      transform: initial;
    }
  }

  .index {

    .svg-home {
      use:last-child {
        stroke: #000;
      }
    }

    .svg-about path {
      stroke: #000;
    }

    .svg-portfolio {
      stroke: #000 !important;
    }

    .svg-contact path {
      stroke: #000;
    }

    .header-link__home:hover use:last-child {
      stroke: #f8e5c1;
    }

    .header-link__logo {
      color: rgba(0,0,0,0);
    }
  }

  .portfolio,
  .portfolio-id {
    .header-link__logo {
      color: #F48E5C;
    }

    .svg-home {
      use:last-child {
        stroke: #000;
      }
    }

    .svg-about path {
      stroke: #000;
    }

    .svg-portfolio {
      stroke: #000 !important;
    }

    .svg-contact path {
      stroke: #000;
    }

    .header-link__home:hover use:last-child {
      stroke: #FFF;
    }
  }

  .about,
  .contact {
    .header-link__logo {
      color: #F8E5C1;
    }

    .header-link__text,
    .header-link__text {
      color: #FFFFFF;
    }

    .svg-home {
      path {
        stroke: #FFF;
        fill: #FFF;
      }
    }

    .svg-about path {
      stroke: #FFFFFF;
    }

    .svg-portfolio {
      stroke: #FFFFFF !important;
    }

    .svg-contact path {
      stroke: #FFFFFF;
    }

    .header-link__home:hover .svg-home {
       use:last-child {
        stroke: #242424;
      }

      circle {
        fill: #FFF;
      }
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

  .header-link__about .header-link__text,
  .header-link__contact .header-link__text {
    opacity: 0.001;
    transform: translate3d(100%,0,0);
    transition: opacity 0.2s ease, transform 0.2s ease;
    will-change: transform, opacity;
  }
</style>
