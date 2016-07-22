import path from 'path'
import pify from 'pify'
import fs from 'fs'

import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import enforce from 'express-sslify'
import has from 'lodash.has'
import isNil from 'lodash.isnil'
import handlebars from 'handlebars'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import config from '../config/webpack.config.dev.js'

import React from 'react'
import { renderToString } from 'react-dom/server'

import Root from './app/Root'
import configureStore from './app/store/configureStore'
import bukovelAPI from './app/data-access/bukovelAPI'
import { validate as validateSkipassNumber } from './app/helpers/cardNumberValidator.js'

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
  const tasks = [
    getIndexTemplate()
  ]
  const preloadedState = {}

  if (has(req.query, 'skipassNumber')) {
    const searchSkipass = {
      skipass: null,
      skipassNumber: req.query.skipassNumber,
      isValid: validateSkipassNumber(req.query.skipassNumber)
    }

    if (searchSkipass.isValid) {
      const skipassTask = bukovelAPI
        .getSkipass(req.query.skipassNumber)
        .then(skipass => {
          searchSkipass.skipass = skipass
        }, error => {
          searchSkipass.error = error
        })
      tasks.push(skipassTask)
    }

    preloadedState.searchSkipass = searchSkipass
  }
  const [template] = await Promise.all(tasks)

  const store = configureStore(preloadedState)
  const html = renderToString(
    <Root store={store} userAgent={req.headers['user-agent']} />
  )
  const finalState = store.getState()

  const templateData = {
    content: html,
    preloadedState: JSON.stringify(finalState)
  }

  res.send(template(templateData))
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
