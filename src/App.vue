<template lang="pug">
  #app(:class="$route.name.toLowerCase()")
    transition(name="color" appear)
      router-link.header-link.header-link__home(to="/")
        svgicon.svg-home(icon="home" width="18" height="19")
        .header-link__text
          | Home

    transition(name="color" appear)
      router-link.header-link.header-link__logo(to="/" v-if="$route.name.toLowerCase() !== 'home'")
        svgicon.svg-logo(icon="logo" width="40" height="40")

    transition(name="color" appear)
      router-link.header-link.header-link__about(to="/about")
        .header-link__text
          | About
        svgicon.svg-about(icon="about" width="18" height="18")

    transition(name="color" appear)
      router-link.header-link.header-link__portfolio(to="/portfolio")
        svgicon.svg-portfolio(icon="portfolio" width="36" height="24")
        .header-link__text
          | Portfolio
    transition(name="color" appear)
      router-link.header-link.header-link__contact(to="/contact")
        .header-link__text
          | Contact
        svgicon.svg-contact(icon="contact" width="24" height="24px")

    transition(name="fade" appear)
      router-view
</template>

<script>
import '@/components/Navigation/icons'

export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');
  @import url('normalize.css');

  * {
    box-sizing: border-box;
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
    opacity: 0.999;
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
    align-items: center;

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

  .header-link__home {
    .svg-home {
      fill: transparent !important;

      use:first-child {
        opacity: 0;
        transition: opacity .2s ease;
        will-change: opacity;
      }

      use:last-child {
        transition: stroke .2s ease;
        will-change: stroke;
      }
    }

    &:hover .svg-home {
      use:first-child {
        opacity: 1;
      }
    }
  }

  .header-link__about {
    .svg-about {
      fill: transparent !important;
    }

    .svg-about path:last-child {
      opacity: 0;
      transition: opacity .2s ease;
      will-change: opacity;
    }

    &:hover path:last-child {
      opacity: 1;
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

  .home {
    .header-link__portfolio .header-link__text,
    .header-link__contact .header-link__text {
      color: #000;
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
      stroke: #000;
    }

    .header-link__logo {
      color: rgba(0,0,0,0);
    }
  }

  .portfolio,
  .project {
    .header-link__logo {
      color: #F48E5C;
    }

    .header-link__portfolio .header-link__text,
    .header-link__contact .header-link__text {
      color: #000;
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
      use:last-child {
        stroke: #FFFFFF;
      }

      use:first-child {
        stroke: #FFFFFF;
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
</style>
