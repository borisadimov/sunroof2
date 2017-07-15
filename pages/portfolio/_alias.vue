<template lang="pug">
  .project
    .project-container
      .project__title
        span(v-html="project.title")
      .project__subtitle
        | {{ project.subtitle }}
      .project-wrapper(:class="{'project-wrapper--shown': isShown}")
        .project-info
          .project-row
            .project-item
              .project-item__label
                | LIVE
              .project-item__value(v-html="project.live")

            .project-item
              .project-item__label
                | SERVICES
              .project-item__value(v-html="project.services")

          .project-item
            .project-item__label
              | PROJECT
            .project-item__value
              | <span class="project-item__value--bold">Who:</span>
              span(v-html="project.project_who")
            .project-item__value
              | <span class="project-item__value--bold">What:</span>
              span(v-html="project.project_what")
            .project-item__value
              | <span class="project-item__value--bold">How:</span>
              span(v-html="project.project_how")

        vue-markdown(:source="project.text")

        .project-footer
          | Thank you. <nuxt-link to="/portfolio">Portfolio</nuxt-link>

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

        // ################ COMPILED

        // <div class="project-phones">
        //   <div class="project-phones__item">
        //     <div class="project-phone">
        //       <div class="project-phone__image"><img src="https://trello-attachments.s3.amazonaws.com/5910f8d0e5450cc0f7564010/59235dcccb72c83d51c05887/8bd0f0f06827a54cc859cf5b545b4a5f/digdeep_mobile2.jpg"/></div>
        //     </div>
        //   </div>
        //   <div class="project-phones__item">
        //     <div class="project-phones__text">A little lovin’ and<br/>a whole lot of jazz!<br/>Amirite?</div>
        //     <div class="project-phone">
        //       <div class="project-phone__image"><img src="https://trello-attachments.s3.amazonaws.com/5910f8d0e5450cc0f7564010/59235dcccb72c83d51c05887/1b1a3b116aaed1998259d1d1990709e9/digdeep_mobile1.jpg"/></div>
        //     </div>
        //   </div>
        // </div>
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
        project_how: '',
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
    font-size: 33px;
    color: #4c4c4c;
    letter-spacing: 2.2px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 16px;

    & span {
      display: inline-block;
      border-bottom: 7px solid #F8E5C1;
    }
  }

  .project__subtitle {
    margin-top: 5px;
    text-align: center;
    font-size: 14px;
    color: rgba(0,0,0,0.54);
    letter-spacing: 0;
    line-height: 20px;

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
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .project-item__label {
    margin-bottom: 11px;
    font-weight: bold;
    font-size: 20px;
    color: #2f626d;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .project-item__value {
    font-size: 14px;
    color: rgba(0,0,0,0.54);
    letter-spacing: 0;
    line-height: 20px;
    text-decoration: none;
    display: flex;
    flex-flow: row nowrap;

    &:not(:first-child) {
      margin-top: 15px;
    }

    .project-item__value--bold {
      margin-right: 4px;
      font-weight: bold;
      font-size: 16px;
      color: #F48E5C;
      text-transform: uppercase;
    }

    a {
      color: rgba(0,0,0,0.70);
      text-decoration: none;
    }

    span {
      display: block;

      &:first-child {
        min-width: 46px;
        margin-right: 25px;
      }
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
    line-height: 20px;
    text-align: center;

    a {
      font-weight: bold;
      text-decoration: none;
      color: #F48E5C;
      text-transform: uppercase;
      transition: color 0.3s ease;

      &:hover{
        color: #95bc9a;
      }
    }
  }

  @media (max-width: 768px) {
    .project__title {
      line-height: 30px;
    }

    .project-images__item {
      margin-bottom: 50px;
    }

    .project-item {
      margin-bottom: 30px;
    }

    .project-item__value {
      flex-flow: row wrap;
    }
  }
</style>


<style lang="scss">
  .project {
    p {
      font-size: 14px;
      color: rgba(0,0,0,0.70);
      letter-spacing: 0;
      line-height: 20px;

      margin: 0 auto;
      margin-bottom: 50px;
      max-width: 600px;
    }

    .video-wrapper {
      max-width: 100%;
      margin-bottom: 50px;
    }

    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      padding-top: 30px;
      height: 0;
      overflow: hidden;
    }

    .video-container iframe,
    .video-container object,
    .video-container embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      margin-bottom: 50px;
      box-shadow: 0 0 2px 0 rgba(0,0,0,0.07), 0 2px 2px 0 rgba(0,0,0,0.14);
      border-radius: 5px;
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
    padding-left: 120px;
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

    cursor: -webkit-grabbing;
  }

  @media (max-width: 768px) {
    .project {
      padding: 80px 0 !important;
    }
    .project-phones {
      display: none;
    }
    .project-container {
      padding: 0 20px !important;
    }
    .project-footer {
      margin-top: 0 !important;
    }
  }
</style>
