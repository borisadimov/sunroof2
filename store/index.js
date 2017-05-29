import Vuex from 'vuex'
import { firebase } from '~/db'
import { sortBy } from 'lodash'
import { firebaseMutations, firebaseAction } from 'vuexfire'

// const createStore = () => {
const store = new Vuex.Store({
  strict: true,
  state: {
    portfolio: [],
    user: !!firebase.auth().currentUser
  },
  getters: {
    portfolio: state => state.portfolio,
    user: state => state.user,
    slides: state => sortBy(state.portfolio, 'priority')
  },
  mutations: {
    ...firebaseMutations,
    login (state, user) {
      state.user = !!user
    },
    logout (state) {
      state.user = null
    }
  },
  actions: {
    setPortfolioRef: firebaseAction(({
        bindFirebaseRef
      }, ref) => {
      return new Promise((resolve, reject) => {
        bindFirebaseRef('portfolio', ref, {
          readyCallback: resolve,
          cancelCallback: reject
        })
      })
    }),
    login ({ commit }, user) {
      commit('login', user)
    },
    logout ({ commit }) {
      commit('logout')
    }
  }
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('login', { user })
  } else {
    store.dispatch('logout')
  }
})
//
//   return store
// }

export default store
