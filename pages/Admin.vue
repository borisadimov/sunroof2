<template lang="pug">
  .admin
    .portfolio(v-if="user && editingId === undefined")
      .portfolio-title
        span 📋
        | Projects list:
      .portfolio-list
        .portfolio-item(v-for="item in portfolio")
          a(:href="'/portfolio/' + item.alias" target="_blank") {{ item.title }}
          .portfolio-controls
            span.portfolio-edit(v-if="editingId !== item['.key']" @click="edit(item['.key'])")
              | ✏️
            span.portfolio-delete(@click="remove(item['.key'])")
              | ❌

        .buttons(v-if="editingId === undefined")
          .button.add(@click="add")
            span 🗒
            | Add new
          .button.deploy(@click="deploy")
            span(v-if="isDeploying === false && deployFailed === false") 🚀
            span(v-if="isDeploying === true").deploying 🤙
            span(v-if="deployFailed === true") 👎
            | Deploy

    .form(v-if="editingId !== undefined", :class="{'form-centered': isAllEmpties}")
      div
        .editing
          .editing-inner
            .editing-title(v-if="!editing")
              span 🗒
              | Create Project
            .editing-title(v-if="editing")
              .editing-title__inner
                span ️️️️️✏️
                | Edit Project
              a.editing-title__open(v-if="portfolioItem.alias !== ''" :href="'/portfolio/' + portfolioItem.alias")
                | open link
            .editing-field
              .editing-label Title
              input(type="text" placeholder="The Project Name" @input="inputChange" v-model="portfolioItem.title")
            .editing-field
              .editing-label Subtitle
              input(type="text" placeholder="Any description" @input="inputChange" v-model="portfolioItem.subtitle")
            .editing-field
              .editing-label Priority
              input(type="number" placeholder="Number" v-model="portfolioItem.priority")
            .editing-field
              .editing-label Project URL
              input(type="text" placeholder="http://path/to/your/project" @input="inputChange" v-model="portfolioItem.live")
            .editing-field
              .editing-label Services
              textarea.textarea-small(type="text" placeholder="Web development, etc" @input="inputChange" v-model="portfolioItem.services")
            .editing-field
              .editing-label Project Who
              textarea.textarea-small(type="text" placeholder="Who" @input="inputChange" v-model="portfolioItem.project_who")
            .editing-field
              .editing-label Project What
              textarea.textarea-small(type="text" placeholder="What" @input="inputChange" v-model="portfolioItem.project_what")
            .editing-field
              .editing-label Project Why
              textarea.textarea-small(type="text" placeholder="Why" @input="inputChange" v-model="portfolioItem.project_why")
            .editing-field
              .editing-label Alias
              input(type="text" placeholder="(required: will be placed in project URL)" v-model="portfolioItem.alias")
            .editing-field
              .editing-label Cover Image URL
              input(type="text" placeholder="http://path/to/image/url" v-model="portfolioItem.cover")
            .editing-field
              .editing-label Content
              textarea(placeholder="Any text there" @input="inputChange" v-model="portfolioItem.text")

            .buttons
              .button.save(@click="save")
                span ✅
                | Save
              .button.cancel(@click="cancel")
                span ❌
                | Cancel

      transition(name="fade")
        .mark(v-if="!isAllEmpties")
          .mark__title(v-if="portfolioItem.title !== ''")
            | {{ portfolioItem.title }}
          .mark__subtitle(v-if="portfolioItem.subtitle !== ''")
            | {{ portfolioItem.subtitle }}
          .mark-info
            .mark-row
              .mark-item(v-if="portfolioItem.live !== ''")
                .mark-item__label
                  | LIVE
                a.mark-item__value(:href="portfolioItem.live")
                  | {{ portfolioItem.live }}

              .mark-item(v-if="portfolioItem.services !== ''")
                .mark-item__label
                  | SERVICES
                .mark-item__value(v-html="portfolioItem.services")

            .mark-item
              .mark-item__label(v-if="portfolioItem.project_who !== '' || portfolioItem.project_what !== '' || portfolioItem.project_why !== ''")
                | PROJECT
              .mark-item__value
                div(v-if="portfolioItem.project_who !== ''")
                  | <span class="mark-item__value--bold">Who:</span>
                  span(v-html="portfolioItem.project_who")
                div(v-if="portfolioItem.project_what !== ''")
                  | <span class="mark-item__value--bold"> What:</span>
                  span(v-html="portfolioItem.project_what")
                div(v-if="portfolioItem.project_why !== ''")
                  | <span class="mark-item__value--bold">Why:</span>
                  span(v-html="portfolioItem.project_why")

          vue-markdown(:source="portfolioItem.text")

    .login(v-if="!user")
      .login-inner
        .login-title Welcome to Sunroof Admin
        input(type='text' placeholder="Email" v-model="email")
        input(type='password' placeholder="Password"  v-model="password")
        .button(@click="login")
          | Log in
</template>

<script>
import { db, firebase } from '~/db'
import { mapGetters } from 'vuex'
import axios from 'axios'
import VueMarkdown from 'vue-markdown'
const $portfolio = db.ref('portfolio')

const emptyItem = {
  title: '',
  subtitle: '',
  live: '',
  services: '',
  project_who: '',
  project_what: '',
  project_why: '',
  cover: '',
  text: '',
  alias: '',
  priority: ''
}

export default {
  name: 'Admin',
  layout: 'admin',
  head: {
    title: 'Sunroof | Admin'
  },

  fetch ({ store }) {
    return store.dispatch('setPortfolioRef', $portfolio)
  },

  data () {
    return {
      newItemText: '',
      editingId: undefined,
      portfolioItem: emptyItem,
      email: '',
      password: '',
      editing: false,
      hasFilledField: false,
      isDeploying: false,
      deployFailed: false
    }
  },

  components: {
    VueMarkdown
  },

  computed: {
    ...mapGetters(['portfolio', 'user']),

    isAllEmpties () {
      return Object.keys(this.portfolioItem)
        .every(key => this.portfolioItem[key] === '')
    }
  },

  methods: {
    inputChange: function (event) {
      this.hasFilledField = event.target.value !== ''
    },

    edit: function (key) {
      this.editing = true
      this.editingId = key
      $portfolio.child(key).once('value')
        .then(d => { this.portfolioItem = d.val() })
    },

    save: function () {
      if (this.editingId !== 'defined') {
        $portfolio.child(this.editingId).set(this.portfolioItem)
      } else {
        $portfolio.push(this.portfolioItem)
      }

      this.editing = false
      this.editingId = undefined
      this.portfolioItem = emptyItem
    },

    cancel: function () {
      this.editing = false
      this.editingId = undefined
      this.portfolioItem = emptyItem
    },

    add: function () {
      this.editingId = 'defined'
      this.portfolioItem = emptyItem
    },

    remove: function (key) {
      $portfolio.child(key).remove()
    },

    deploy: function () {
      this.deployFailed = false
      this.isDeploying = true

      axios.post('https://api.netlify.com/build_hooks/592c280aa700c40cab5bf2d5')
        .then(setTimeout(() => {
          this.isDeploying = false
        }, 10000))
        .catch(() => {
          this.isDeploying = false
          this.deployFailed = true

          setTimeout(() => {
            this.deployFailed = false
          }, 1000)
        })
    },

    login: function () {
      const { email, password } = this
      firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        // TODO: Handle Errors
        // const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
      })
    }
  },

  created () {
    if (process.BROWSER_BUILD) {
      setTimeout(() => {
        this.$store.dispatch('setPortfolioRef', $portfolio)
      }, 10)
    } else {
      this.$store.dispatch('setPortfolioRef', $portfolio)
    }
  }

}
</script>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }

  .login {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .login-inner {
    width: 100%;
    max-width: 600px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .login-title {
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
  }

  .admin {
    padding: 0 50px;
    min-height: 100vh;
    background: #F7AA78;
    width: 100%;

    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
  }

  .portfolio {
    padding: 50px 0;
  }

  .portfolio-title {
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 20px;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    span {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .portfolio-item {
    margin-bottom: 20px;
    font-size: 26px;
    color: #FFFFFF;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    a {
      color: #FFFFFF;
      text-decoration: none;
    }
  }

  .portfolio-controls {
    margin-left: 20px;

    span {
      cursor: pointer;
      font-size: 20px;
    }

    .portfolio-edit {
      margin-right: 10px;
    }
  }

  .form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;

    &-centered .editing {
      transform: translateX(102%);
    }
  }

  .editing {
    position: fixed;
    left: 50px;
    top: 0px;

    height: 100vh;
    width: 30%;
    display: flex;
    flex-flow: column nowrap;

    transition: transform .9s ease;
    will-change: transform;

    .save {
      margin-right: 15px;
    }

    .save, .cancel {
      cursor: pointer;
    }
  }

  .editing-title {
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 20px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .editing-title__inner {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .editing-title__open {
    font-size: 14px;
    color: #FFFFFF;
    font-weight: normal;
    text-decoration: none;
  }

  .editing-inner {
    padding: 50px 0;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;

    padding-right: 28px; /*This would hide the scroll bar of the right. To be sure we hide the scrollbar on every browser, increase this value*/

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .editing-label {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
  }

  .buttons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .button {
    padding: 10px 16px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    color: #FFFFFF;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    cursor: pointer;

    transition: background .2s ease, color .2s ease;
    will-change: background, color;

    &:hover {
      background: #FFF;
      color: #000;
    }

    span {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .add {
    margin-right: 15px;
    cursor: pointer;
  }

  .deploy {
    cursor: pointer;
  }

  input,
  textarea {
    width: 100%;
    margin-bottom: 20px;
    background: none;
    outline: none;

    padding: 10px 16px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    color: #FFFFFF;

    transition: background .2s ease, color .2s ease;
    will-change: background, color;

    &:hover,
    &:focus {
      background: #FFF;
      color: #000;

      &::-webkit-input-placeholder {color: #A3A3A3;}
      &::-moz-placeholder {color: #A3A3A3;}
      &:-moz-placeholder {color: #A3A3A3;}
      &:-ms-input-placeholder {color: #A3A3A3;}
    }

    &::-webkit-input-placeholder {color: #FFFFFF;}
    &::-moz-placeholder {color: #FFFFFF;}
    &:-moz-placeholder {color: #FFFFFF;}
    &:-ms-input-placeholder {color: #FFFFFF;}
  }

  textarea {
    min-height: 200px;
    resize: vertical;
    overflow-y: scroll
  }

  .textarea-small {
    min-height: 150px;
  }

  @keyframes deploy {
    0%, 100% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(10deg);
    }
  }

  .deploying {
    animation: deploy .3s ease infinite;
  }

  @media (max-width: 768px) {
    .admin {
      padding: 0 30px 50px;
    }

    .form {
      display: block;
    }

    .form-centered .editing {
      transform: translateX(0);
      left: 0;
    }

    .editing {
      position: initial;
      height: initial;
      width: 100%;
    }

    .editing-inner {
      width: 100%;
      padding: 50px 0;
    }

    .mark {
      width: 100%;
      margin: 0;
    }
  }
</style>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter-active {
    transition-delay: .35s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }

  .mark {
    margin: 50px 0;
    background: #FFFFFF;
    margin-left: 40%;
    flex: 1;
    padding: 16px;
    border: 1px solid #f1f1f1;

    p {
      font-size: 12px;
      color: rgba(0,0,0,0.70);
      letter-spacing: 0;
      line-height: 18px;

      margin: 0 auto;
      margin-bottom: 50px;
      max-width: 600px;
    }

    img {
      width: 100%;
      margin-bottom: 50px;
    }

    h1, h2, h3, h4, h5 {
      font-weight: bold;
      font-size: 18px;
      color: rgba(0,0,0,0.70);
      letter-spacing: 2.2px;

      margin: 0 auto;
      margin-bottom: 11px;
      max-width: 600px;
    }
  }

  .mark__title {
    margin-top: 5px;

    text-align: center;
    font-size: 26px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .mark__subtitle {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: rgba(0,0,0,0.40);
    letter-spacing: 0;
    line-height: 18px;

    margin-bottom: 50px;
  }

  .mark-info {
    margin: 0 auto;
    margin-top: 50px;
    max-width: 600px;
  }

  .mark-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .mark-item__label {
    margin-bottom: 11px;
    font-weight: bold;
    font-size: 18px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .mark-item__value {
    font-size: 12px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 0;
    line-height: 18px;
    text-decoration: none;

    .mark-item__value--bold {
      margin-right: 4px;
      font-weight: bold;
    }
  }

  .mark-item {
    flex: 0 0 50%;
    margin-bottom: 50px;
  }

  .project-phones {
    max-width: 760px;
    margin: 0 auto;
    margin-bottom: 100px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .project-phones__item {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
  }

  .project-phones__text {
    padding-right: 65px;
    padding-left: 65px;
    margin-top: 80px;
    margin-bottom: 80px;

    font-size: 34px;
    color: rgba(0,0,0,0.70);
  }

  .project-phone {
    background: url('../assets/phone.jpg') no-repeat center / contain;
    width: 288px;
    height: 577.6px;
    overflow: hidden;

    position: relative;
  }

  .project-phone__image {
    width: 282px;
    height: 463px;
    overflow: hidden;
    overflow-y: scroll;

    position: absolute;
    top: 53px;
    left: 19px;

    padding-right: 28px; /*This would hide the scroll bar of the right. To be sure we hide the scrollbar on every browser, increase this value*/

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .project-phone__image img {
    display: block;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .project-phones {
      display: none;
    }
  }
</style>
