<template lang="pug">
  .project
    .project-container
      .project__title
        | {{ project.title }}
      .project__subtitle
        | {{ project.subtitle }}
      .project-wrapper(:class="{'project-wrapper--shown': isShown}")
        .project-info
          .project-item
            .project-item__label
              | LIVE
            a.project-item__value(:href="project.live")
              | {{ project.live }}

          .project-item
            .project-item__label
              | PROJECT
            .project-item__value
              | {{ project.description }}

          .project-item
            .project-item__label
              | CHALLENGE
            .project-item__value
              | {{ project.challenge }}

        .project-images
          .project-images__item(v-for="image in project.images")
            img.project-image(:src="'/portfolio/' + image")

        .project-footer
          | Thank you. <nuxt-link to="/portfolio">Portfolio</nuxt-link>

</template>

<script>
import content from '~assets/fixtures'

export default {
  name: 'Project',

  data () {
    return {
      isShown: false
    }
  },

  transition: 'item',

  head: {
    title: 'Sunroof | Project'
  },

  computed: {
    project () {
      return content.filter(i => +i.id === +this.$route.params.id)[0]
    }
  },

  mounted () {
    setTimeout(() => {
      this.isShown = true
    }, 300)
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

  .project-images__item {
    margin-bottom: 100px;
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
  }

  .project-item {
    margin-bottom: 50px;
  }

  .project-images {
    width: 100%;
  }

  .project-image {
    width: 100%;
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
