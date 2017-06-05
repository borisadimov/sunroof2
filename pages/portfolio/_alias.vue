<template lang="pug">
  .project
    .project-container
      .project__title
        | {{ project.title }}
      .project__subtitle
        | {{ project.subtitle }}
      .project-wrapper(:class="{'project-wrapper--shown': isShown}")
        .project-info
          .project-row
            .project-item
              .project-item__label
                | LIVE
              a.project-item__value(:href="project.live")
                | {{ project.live }}

            .project-item
              .project-item__label
                | SERVICES
              .project-item__value
                | {{ project.services }}

          .project-item
            .project-item__label
              | PROJECT
            .project-item__value
              | <span>Who:</span> {{ project.who }}
              br
              | <span>What:</span> {{ project.what }}
              br
              | <span>Why:</span> {{ project.why }}

        // .project-phones
        //   .project-phones__item
        //     .project-phone
        //       .project-phone__image
        //         img(src="~assets/mobile.jpg")
        //   .project-phones__item
        //     .project-phones__text
        //       | A little lovin’ and
        //       br
        //       | a whole lot of jazz!
        //       br
        //       | Amirite?
        //     .project-phone
        //       .project-phone__image
        //         img(src="~assets/mobile.jpg")
        vue-markdown(:source="project.text")

        .project-footer
          | Thank you. <nuxt-link to="/portfolio">Portfolio</nuxt-link>
</template>

<script>

import { db } from '~/db'
import { mapGetters } from 'vuex'
import VueMarkdown from 'vue-markdown'
const $portfolio = db.ref('portfolio')

export default {
  name: 'Project',

  data () {
    return {
      isShown: false,
      project: {
        title: '',
        subtitle: '',
        live: '',
        services: '',
        project_who: '',
        project_what: '',
        project_why: '',
        cover: '',
        text: '',
        alias: '',
        priority: ''
      }
    }
  },

  transition: 'item',

  head: {
    title: 'Sunroof | Project'
  },

  fetch ({ store }) {
    return store.dispatch('setPortfolioRef', $portfolio)
  },

  computed: mapGetters(['slides']),

  mounted () {
    setTimeout(() => {
      this.isShown = true
      this.project = this.slides.filter((item, index) => {
        if (item.alias) {
          return item.alias === this.$route.params.alias
        } else {
          return +index === +this.$route.params.alias
        }
      })[0]
    }, 300)
  },

  components: {
    VueMarkdown
  }
}
</script>

<style scoped lang="scss">
  .project {
    padding: 100px 0 200px;
  }

  .project-container {
    max-width: 960px;
    padding: 0 30px;
    margin: 0 auto;
  }

  .project__title {
    margin-top: 5px;

    text-align: center;
    font-size: 26px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .project__subtitle {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: rgba(0,0,0,0.40);
    letter-spacing: 0;
    line-height: 18px;

    margin-bottom: 50px;
  }

  .project-wrapper {
    opacity: 0;
    transition: opacity .5s ease;
    will-change: opacity;

    &--shown {
      opacity: 1;
    }
  }

  .project-info {
    margin: 0 auto;
    margin-top: 50px;
    max-width: 600px;
  }

  .project-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .project-item__label {
    margin-bottom: 11px;
    font-weight: bold;
    font-size: 18px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .project-item__value {
    font-size: 12px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 0;
    line-height: 18px;
    text-decoration: none;

    span {
      font-weight: bold;
    }
  }

  .project-item {
    flex: 0 0 50%;
    margin-bottom: 50px;
  }

  .project-footer {
    margin-top: 100px;

    font-size: 14px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 0.25px;
    line-height: 18px;
    text-align: center;

    a {
      font-weight: bold;
      text-decoration: none;
      color: rgba(0,0,0,0.70);
    }
  }

  @media (max-width: 768px) {
    .project-images__item {
      margin-bottom: 50px;
    }

    .project-item {
      margin-bottom: 30px;
    }
  }
</style>


<style lang="scss">
  .project {
    p {
      font-size: 12px;
      color: rgba(0,0,0,0.70);
      letter-spacing: 0;
      line-height: 18px;

      margin: 0 auto;
      margin-bottom: 50px;
      max-width: 600px;
    }

    img {
      width: 100%;
      margin-bottom: 50px;
    }

    h1, h2, h3, h4, h5 {
      font-weight: bold;
      font-size: 18px;
      color: rgba(0,0,0,0.70);
      letter-spacing: 2.2px;

      margin: 0 auto;
      margin-bottom: 11px;
      max-width: 600px;
    }
  }

  .project-phones {
    max-width: 760px;
    margin: 0 auto;
    margin-bottom: 100px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .project-phones__item {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
  }

  .project-phones__text {
    padding-right: 65px;
    padding-left: 65px;
    margin-top: 80px;
    margin-bottom: 80px;

    font-size: 34px;
    color: rgba(0,0,0,0.70);
  }

  .project-phone {
    background: url('../../assets/phone.jpg') no-repeat center / contain;
    width: 288px;
    height: 577.6px;
    overflow: hidden;

    position: relative;
  }

  .project-phone__image {
    width: 282px;
    height: 463px;
    overflow: hidden;
    overflow-y: scroll;

    position: absolute;
    top: 53px;
    left: 19px;

    padding-right: 28px; /*This would hide the scroll bar of the right. To be sure we hide the scrollbar on every browser, increase this value*/

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .project-phone__image img {
    display: block;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .project-phones {
      display: none;
    }
  }
</style>
