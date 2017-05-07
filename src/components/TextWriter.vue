<template>
  <div class="text-writer">
    <section class="cd-intro text-crawl">
      <h1 class="cd-headline letters type">
        <span>A collective of</span>
          <span class="cd-words-wrapper">
          <vue-typer :shuffle="true" :text="arrayOfSentences"></vue-typer>
        </span>
      </h1>
    </section>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'

export default {
  name: 'HomeCanvas',
  data () {
    return {
      arrayOfSentences: [
        'design-obsessed digital junkies',
        'sometimes really cool people',
        'people who fill out this sentence'
      ]
    }
  },

  mounted () {

  },

  components: {
    VueTyper
  }
}
</script>

<style lang="scss">
  @font-face {
    font-family: 'Fairview';
    src: url('../../static/fonts/Fairview_SmallCaps.otf');
  }

  .text-writer {
    * {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }

    span {
      font-size: 12px;
    }

    .text-crawl {
      display: block;
      position: fixed;
      letter-spacing: 1px;
      top: 57%;
      left: 40%;
      margin-top: 0;
      margin-left: -15px;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 12px;
      color: rgba(255,255,255,0.7);
      -webkit-animation: fadeIn 2s 10s;
      -moz-animation: fadeIn 2s 10s;
      animation: fadeIn 2s;
      animation-delay: 2s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      opacity: 0;
    }


    .cd-words-wrapper {
      display: inline-block;
      position: relative;
      text-align: left;
    }

    .vue-typer {
      .custom.char {
        color: #FFFFFF;
      }

      .custom.caret {
        background-color: #FFFFFF;
      }
    }
  }
</style>
