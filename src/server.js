import path from 'path'
import pify from 'pify'
import fs from 'fs'

import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import enforce from 'express-sslify'
import isNil from 'lodash.isnil'
import handlebars from 'handlebars'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import config from '../config/webpack.config.dev.js'

import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

import App from './app/App.js'
import configureStore from './app/store/configureStore'

const fsPromisify = pify(fs)

const app = express()
const port = process.env.PORT || 3333
const isDeveloping = process.env.NODE_ENV !== 'production'

// cache compiled index page
let indexTemplate = null

const statisFolderName = isDeveloping ? 'src' : 'dist'

// configure middlewares
if (isDeveloping) {
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })
  app.use(middleware)
} else {
  app.use(enforce.HTTPS({
    // app is behind Heroku load balancer
    trustProtoHeader: true
  }))
  app.use(helmet())
  app.use(compression())
}

const ROOT = '../'
const staticFolder = path.resolve(__dirname, ROOT, statisFolderName)

app.get('/', async (req, res) => {
  const template = await getIndexTemplate()
  const store = configureStore({
    skipass: req.query
  })
  const data = {
    content: renderToString(
      <Provider store={store}>
        <App userAgent={req.headers['user-agent']} />
      </Provider>
    )
  }

  res.send(template(data))
})
app.use(express.static(staticFolder))

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
  console.log(`env = ${app.get('env')}`)
  console.log(`__dirname = ${__dirname}`)
  console.log(`staticFolder = ${staticFolder}`)
})

async function getIndexTemplate () {
  if (isNil(indexTemplate)) {
    const index = await fsPromisify.readFile(path.resolve(staticFolder, 'index.html'), 'utf8')
    indexTemplate = handlebars.compile(index)
  }
  return indexTemplate
}
