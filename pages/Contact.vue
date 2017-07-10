<template lang="pug">
  .page.contact
    .container
      .title
        | We are avilable for
        br
        | contract work.
        br
        | Drop us a line.

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
    flex: 0 0 46.2%;
    font-size: 34px;
    color: #FFFFFF;
    line-height: 42px;
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
    }

    .title {
      margin-bottom: 40px;
    }

    .info-list {
      display: flex;
      flex-flow: row nowrap;
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
