<template lang="pug">
  .page.about
    .container
      .title
        | What is Sunroof?
      .subtitle
        | Sunroof is a collective of design-obsessed digital junkies, based in Los Angeles. Our goal is to find innovative ways to interact with users—striking the perfect balance between usability and aesthetic. Whether working with clients or our own passion projects, Sunroof strives to push creative and developmental boundaries, while bringing ambitious ideas to life.

      .skills
        .skills__title
          | Skills

        .skills-list
          .skills-item
            .skills-item__title
              | Animation
            .skills-item__skill
              | Creative Strategy
            .skills-item__skill
              | Creative Direction
            .skills-item__skill
              | 2D

          .skills-item
            .skills-item__title
              | Interactive
            .skills-item__skill
              | Websites
            .skills-item__skill
              | Games
            .skills-item__skill
              | Mobile Experiences

          .skills-item
            .skills-item__title
              | Location
            .skills-item__skill
              | Project mapping
            .skills-item__skill
              | Interactive environments
            .skills-item__skill
              | Virtual reality

          .skills-item
            .skills-item__title
              | Products
            .skills-item__skill
              | App design & development
            .skills-item__skill
              | E-commerce
            .skills-item__skill
              | Explainer videos
</template>

<script>
export default {
  name: 'About',

  head: {
    title: 'Sunroof | About'
  },

  data () {
    return {

    }
  },

  components: {

  }
}
</script>

<style scoped lang="scss">
  .about {
    background: rgba(36,36,36,0.95);
  }

  .container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    height: 100%;
  }

  .title {
    margin-bottom: 12px;

    font-weight: bold;
    font-size: 18px;
    color: rgba(255,255,255,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .subtitle {
    font-size: 14px;
    color: #FFFFFF;
    line-height: 20px;
    max-width: 500px;
  }

  .skills {
    margin-top: 80px;
  }

  .skills__title {
    margin-bottom: 25px;

    font-weight: bold;
    font-size: 18px;
    color: rgba(255,255,255,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .skills-list {
    width: 70%;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .skills-item {
    margin-bottom: 30px;
    flex: 0 0 50%;
  }

  .skills-item__title {
    margin-bottom: 11px;

    font-size: 16px;
    color: #818181;
  }

  .skills-item__skill {
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 20px;
  }

  @media (max-width: 768px) {
    .skills {
      margin-top: 30px;
    }

    .skills-list {
      width: 100%;
    }

    .skills-item__skill {
      font-size: 12px;
    }
  }

  @media (max-width: 350px) {
    .skills-list {
      display: block;
    }
  }
</style>
