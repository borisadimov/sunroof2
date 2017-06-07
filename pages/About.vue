<template lang="pug">
  .page.about
    black-background
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
              | Services
            .skills-item__skill
              | Website Design & Development
            .skills-item__skill
              | User Experience Design
            .skills-item__skill
              | 2D Graphics & Animation
            .skills-item__skill
              | Creative Direction & Strategy


          .skills-item
            .skills-item__title
              | Solutions
            .skills-item__skill
              | Interactive Web Experiences
            .skills-item__skill
              | Mobile Applications
            .skills-item__skill
              | Branding
            .skills-item__skill
              | Game Design & Development

          .skills-item
            .skills-item__title
              | Products
            .skills-item__skill
              | Shopify Stores
            .skills-item__skill
              | Squarespace Customization
            .skills-item__skill
                | Video Production & Editing
            .skills-item__skill
                | Wordpress Theme Development

          .skills-item
            .skills-item__title
              | R&D
            .skills-item__skill
              | Virtual Reality
            .skills-item__skill
              | Neural Networks
            .skills-item__skill
              | 3D Modeling
            .skills-item__skill
              | The New Internet

</template>

<script>
export default {
  name: 'About',

  layout: 'dark',

  head: {
    title: 'Sunroof | About'
  },

  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
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
