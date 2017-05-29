#!/usr/bin/env node

// Show logs
process.env.DEBUG = 'nuxt:*'

var fs = require('fs')
var Nuxt = require('nuxt')
var resolve = require('path').resolve

var rootDir = resolve('.')
var nuxtConfigFilePath = resolve('.', 'nuxt.config.js')

var options = {}
if (fs.existsSync(nuxtConfigFilePath)) {
  options = require(nuxtConfigFilePath)
} else {
  console.log(`Could not locate ${nuxtConfigFilePath}`) // eslint-disable-line no-console
}

if (typeof options.rootDir !== 'string') {
  options.rootDir = rootDir
}
options.dev = false // Create production build when calling `nuxt build`

options.build = options.build || {}

console.log('[nuxt] Generating...') // eslint-disable-line no-console
var nuxt = new Nuxt(options)
nuxt.generate()
  .then(() => {
    console.log('[nuxt] Generate done') // eslint-disable-line no-console
    process.exit(0)
  })
  .catch((err) => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
