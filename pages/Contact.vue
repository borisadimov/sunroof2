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
            | Sunny
          .info-item__field
            | Los Angeles, CA

        .info-item
          .info-item__title
            | Stalk us
          a.info-item__field(href="#")
            | Facebook
          a.info-item__field(href="#")
            | Twitter
          a.info-item__field(href="#")
            | Instagram
</template>

<script>
export default {
  name: 'Contact',

  head: {
    title: 'Sunroof | Contact'
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
  .contact {
    background: #242424;
  }

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
  }

  .info {
    flex: 1;
  }

  .info__title {
    margin-bottom: 25px;

    font-weight: bold;
    font-size: 18px;
    color: rgba(255,255,255,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .info-item {
    margin-bottom: 35px;
  }

  .info-item__title {
    margin-bottom: 11px;

    font-size: 14px;
    color: #818181;
  }

  .info-item__field {
    display: block;
    text-decoration: none;

    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 18px;
  }
</style>
