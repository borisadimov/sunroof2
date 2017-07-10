<template lang="pug">
  .page.about
    black-background
    .container
        .page_title
          | Sunroof. Creating human experience in a digital world.

        .title
          | Who We Are
        .subtitle
          | Sunroof is a collective of design-obsessed digital junkies, based in Los Angeles. Our focus is to create new interactive experiences for users-striking the perfect balance between usability and aesthetic. We strive to push creative and developmental boundaries, while bringing ambitious ideas to life.

        .skills
          .skills__title
            | What We Do

          .skills-list
            .skills-item
              .skills-item__title
                | Services
              .skills-item__skill
                | Website Design & Development
              .skills-item__skill
                | UX Design
              .skills-item__skill
                | 2D Graphics & Animation
              .skills-item__skill
                | Creative Direction & Strategy
              .skills-item__skill
                | Game Design & Development
              .skills-item__skill
                | Video Production & Editing
              .skills-item__skill
                | 3D Modeling
              .skills-item__skill
                | Virtual Reality


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
                | Unity Development
              .skills-item__skill
                | 3D Web Experiences
              .skills-item__skill
                | Wordpress Theme Development
              .skills-item__skill
                | Shopify Stores
              .skills-item__skill
                | Squarespace Customization

        .title
          | How We Work
        .subtitle
          | We were built to be different. An alternative to the large agency. We see design as strategic as development and development as visually influential as design. We embrace the unknown and have expertise across a wide range of cutting-edge web technologies, frameworks, tools. Our approach is individual to each project allowing us to escape ordinary web products and stimulate development of truly unique websites with a strong sense of identity.

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
    margin-top: 10px;
  }

  .page_title {
    margin: 0 auto -20px auto;

    font-size: 26px;
    color: rgba(255,255,255,0.90);
    width: 600px;

  }

  .title {
    width: 600px;
    margin: 50px auto 12px auto;

    font-weight: bold;
    font-size: 18px;
    color: rgba(255,255,255,0.90);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .subtitle {
    margin: 0 auto;

    font-size: 14px;
    color: #FFFFFF;
    line-height: 20px;
    width: 600px;
  }

  .skills {
    margin: 50px auto 0 auto;
    width: 600px;
  }

  .skills__title {
    margin-bottom: 25px;

    font-weight: bold;
    font-size: 18px;
    color: rgba(255,255,255,0.90);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .skills-list {

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .skills-item {
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
