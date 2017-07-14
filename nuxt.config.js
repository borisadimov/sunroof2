var getPortfolioRoutes = require('./db.js').getPortfolioRoutes

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Sunroof | Loading',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { property: 'og:image:secure_url', content: 'https://trello-attachments.s3.amazonaws.com/596553891d64390dbc4c5c9d/600x344/f9a8277d711edbf44ccb3ad96bf855b2/SR-web-preview.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' }
    ]
  },
  //
  // plugins: [
  //    { src: '~plugins/ga.js', ssr: false }
  // ],

  /*
  ** Default styles
  */
  css: [
    'assets/main.css'
  ],

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f8e5c1' },
  /*
  ** Build configuration
  */

  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        config.resolve.alias['vue-svgicon$'] = 'vue-svgicon/component/svgicon.vue'
      }
    },

    postcss: [
      require('autoprefixer')({ browsers: ['> 5%'] }),
      require('postcss-flexbugs-fixes')(),
      require('postcss-flexibility')()
    ],

    vendor: ['normalize.css', 'three-js', 'axios']
  },

  generate: {
    routes: getPortfolioRoutes
  }
}
