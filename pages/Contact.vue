<template lang="pug">
  .page.contact
    .container
      .title
        | This portfolio is a glimpse at the way we design and prototype in code. Design something familiar, program it to do something unexpected, make sure people feel something. Available for the right project.

      .info
        .info__title
          | Info
        .info-list
          .info-item
            .info-item__title
              | Talk to us
            a.info-item__field(href="mailto:info@sunroof.io")
              | info@sunroof.io
            a.info-item__field(href="tel:+13105557000")
              | +1 310 555 7000

          .info-item
            .info-item__title
              | Visit us
            .info-item__field
              | Sunny California
            .info-item__field
              | Los Angeles, CA

          .info-item
            .info-item__title
              | Stalk us
            a.info-item__field(href="#")
              | Behance
            a.info-item__field(href="#")
              | Dribbble
            a.info-item__field(href="#")
              | Instagram
</template>

<script>
export default {
  name: 'Contact',

  layout: 'dark',

  head: {
    title: 'Sunroof | Contact'
  }
}
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  .title {
    flex: 0 0 38%;
    margin-right: 10%;

    font-size: 24px;
    color: #FFFFFF;
    line-height: 32px;
    color: rgba(255,255,255,0.90);
  }

  .info {
    flex: 1;
  }

  .info__title {
    margin-bottom: 25px;

    font-weight: bold;
    font-size: 18px;
    color: rgba(255,255,255,0.90);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .info-item {
    margin-bottom: 35px;
    width: 50%;
  }

  .info-item:last-child {
    margin-bottom: 0;
  }

  .info-item__title {
    margin-bottom: 11px;

    font-size: 16px;
    color: #818181;
  }

  .info-item__field {
    display: block;
    text-decoration: none;

    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 20px;
  }

  @media (max-width: 425px) {
    .container {
      display: block;
      padding: 80px 30px 0 30px !important;
    }

    .title {
      margin-bottom: 40px;
    }

    .info-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }
  }

  @media (max-width: 350px) {
    .title {
      font-size: 32px;
    }

    .info-item__title {
      font-size: 14px;
    }

    .info-item__field {
      font-size: 12px;
    }
  }
</style>
