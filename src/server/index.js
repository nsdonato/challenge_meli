require('dotenv').config()
require('ignore-styles')
require('regenerator-runtime/runtime')
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
})

require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif'],
  name: '/assets/[hash].[ext]'
})

const webpack = require('webpack')
const express = require('express')
const endpoints = require('./routes/endpoints')
const helpers = require('./helpers/helpers')
const getManifest = require('./getManifest')

const app = express()

const PORT = process.env.PORT || 3000

if (helpers.isDevelopment) {
  const webpackConfig = require('../../webpack.dev')
  const compiler = webpack(webpackConfig)
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  app.use(webpackDevMiddleware(compiler, { port: PORT, hot: true }))
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) {
      req.hashManifest = getManifest()
    }
    next()
  })
  app.use(express.static(`${__dirname}/public`))
}

endpoints(app)

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
)
