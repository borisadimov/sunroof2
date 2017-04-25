<template lang="pug">
  #app
    HeaderComponent
    router-view
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent'

export default {
  name: 'app',
  components: {
    HeaderComponent
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,400,500,700');
  @import url('normalize.css');

  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    padding: 90px 0 60px;
  }

  .title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
  }

  .container {
    width: 100%;
    max-width: 1020px;
    padding: 0 30px;
    margin: 0 auto;
    position: relative;
  }

  .form {

  }

  .form-field {
    margin-bottom: 30px;

    display: flex;
    flex-flow: column nowrap;
  }

  .form-input,
  .form-textarea {
    padding: 10px 16px;

    border: 1px #CFD8DC solid;
    border-radius: 4px;
    outline: none;

    font-size: 16px;

    transition: border-color .2s ease;
    will-change: border-color;

    &:focus {
      border-color: #2196F3;
    }
  }

  .form-textarea {
    resize: vertical;
    min-height: 100px;
  }

  .form-label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .form-checkboxes {
    margin-bottom: 30px;

    display: flex;
    flex-flow: row nowrap;

    .form-label {
      cursor: pointer;
    }
  }

  .form-checkbox {
    margin-right: 10px;
  }

  .form-hint {
    margin-top: 5px;
    color: #f44336;
    font-size: 12px;
  }

  .form-buttons {
    display: flex;
    flex-flow: row nowrap;
  }

  .form-buttons--justify {
    justify-content: space-between;
  }

  .button {
    -webkit-appearance: none !important;
    margin-right: 15px;
    padding: 12px 16px;
    font-size: 16px;
    color: #FFFFFF;
    background: #4CAF50;
    border-radius: 4px;
    cursor: pointer;

    transition: background .1s ease;
    will-change: background;

    &:hover {
      background: #66BB6A;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .button-blue {
    background: #3F51B5;

    &:hover {
      background: #5C6BC0;
    }
  }
</style>
