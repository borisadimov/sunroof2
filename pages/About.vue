<template lang="pug">
  .page.about
    black-background
    .container
        .title
          | Who We Are
        .subtitle
          | Sunroof was built to be different. An alternative to the large agency. We are a collective of design-obsessed digital junkies, based in Los Angeles. Our focus is to create new interactive experiences for users; striking the perfect balance between usability and aesthetic. We seek to push creative and developmental boundaries, while bringing ambitious ideas to life.

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
          | We believe that great design is made better by great code; a marriage of crafts resulting in an original experience for the greater good. We are story-tellers at heart because that is the human language, and we strive to bring your story to life in a truly unique way with a strong sense of identity. We embrace the unknown and have expertise across a wide range of cutting-edge web technologies, frameworks, and tools.

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
  }

  @media (max-width: 480px) {
    .container {
      display: block;
      padding: 30px 30px 80px 30px !important;
    }
    .page_title {
      width: 100%;
    }

    .title {
      width: 100%;
      margin: 50px auto 12px auto;
    }

    .subtitle {
      width: 100%;
    }

    .skills {
      width: 100%;
    }

    .skills-item {
      flex: 0 0 100%;
    }
    .skills-item:first-child {
      margin-bottom: 30px;
    }
  }

  @media (max-width: 350px) {
    .skills-list {
      display: block;
    }
  }
</style>
