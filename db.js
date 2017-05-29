var firebase = require('firebase')
var _ = require('lodash')

var firebaseConfig = {
  apiKey: 'AIzaSyCPaQ-RquQ4iljxmh3O81r6QDCK1VY3krM',
  authDomain: 'sunroof-befe9.firebaseapp.com',
  databaseURL: 'https://sunroof-befe9.firebaseio.com',
  projectId: 'sunroof-befe9',
  storageBucket: 'sunroof-befe9.appspot.com',
  messagingSenderId: '369919051571'
}

var firebaseApp = firebase.apps.length === 0
  ? firebase.initializeApp(firebaseConfig) : firebase.apps[0]

var db = firebaseApp.database()

var getPortfolioRoutes = function () {
  return firebase.database()
    .ref('portfolio')
    .once('value')
    .then(i => i.val())
    .then(_.values)
    .then(items => _.sortBy(items, 'priority'))
    .then(items => items.map((item, index) => {
      if (item.alias) {
        return '/portfolio/' + item.alias
      } else {
        return '/portfolio/' + index
      }
    }))
}

module.exports = {
  db: db,
  firebase: firebase,
  getPortfolioRoutes: getPortfolioRoutes
}
