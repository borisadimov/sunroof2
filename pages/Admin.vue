<template lang="pug">
  .admin
    .portfolio(v-if="user")
      .item(v-for="item in portfolio")
        | {{ item.title }}
        span.edit(v-if="editingId!==item['.key']" @click="edit(item['.key'])")
          | ✏️

        span.delete(@click="remove(item['.key'])")
          | ❌

      .editing(v-if="editingId!==undefined")
        input(type="text" placeholder="title" v-model="portfolioItem.title")
        input(type="text" placeholder="subtitle" v-model="portfolioItem.subtitle")
        input(type="text" placeholder="cover image url" v-model="portfolioItem.cover")
        textarea(placeholder="content" v-model="portfolioItem.text")
        div
          span.save(@click="save")
            | ✅ save
          span.cancel(@click="cancel")
            | ❌ cancel
        .mark
          vue-markdown(:source="portfolioItem.text")

      .add(@click="add")
        | + add new
      .deploy(@click="deploy")
        | 🚀 deploy
    .login(v-if="!user")
      input(type='text' v-model="email")
      input(type='password' v-model="password")
      button(@click="login")
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
  cover: '',
  text: '',
  alias: '',
  priority: 0
}

export default {
  name: 'Admin',
  layout: 'admin',
  head: {
    title: 'Sunroof | Contact'
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
      password: ''
    }
  },

  computed: mapGetters(['portfolio', 'user']),

  components: {
    VueMarkdown
  },

  methods: {
    edit: function (key) {
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
      this.editingId = undefined
      this.portfolioItem = emptyItem
    },
    cancel: function () {
      this.editingId = undefined
      this.portfolioItem = emptyItem
    },
    add: function () {
      this.cancel()
      this.editingId = 'defined'
      this.portfolioItem = emptyItem
    },
    remove: function (key) {
      $portfolio.child(key).remove()
    },
    deploy: function () {
      axios.post('https://api.netlify.com/build_hooks/592c280aa700c40cab5bf2d5')
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
  .admin {
    padding: 50px;
  }
  .item {
    & > span {
      cursor: pointer;
    }
  }
  .editing {
    display: flex;
    flex-flow: column;
    width: 400px;
    textarea {
      height: 200px;
    }
    .mark {
      margin-top: 5px;
      border: 1px solid #f1f1f1;
    }
    .save, .cancel {
      cursor: pointer;
    }
  }
  .add {
    font-weight: bold;
    cursor: pointer;
  }
  .deploy {
    cursor: pointer;
  }

</style>
