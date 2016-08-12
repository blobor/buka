import path from 'path'
import pify from 'pify'
import fs from 'fs'

import express from 'express'

import has from 'lodash.has'
import isNil from 'lodash.isnil'
import handlebars from 'handlebars'

import React from 'react'
import { renderToString } from 'react-dom/server'

import Root from './app/Root'
import configureStore from './app/store/configureStore'
import bukovelAPI from './app/data-access/bukovelAPI'
import { validate as validateSkipassNumber } from './app/helpers/cardNumberValidator.js'

import * as config from './config.js'
import middlewareManager from './server/infrastructure/middleware-manager.js'

const fsPromisify = pify(fs)

const app = express()

// cache compiled index page
let indexTemplate = null

middlewareManager.handle(app)

const ROOT = '../'
const staticFolder = path.resolve(__dirname, ROOT, config.development ? 'src' : 'dist')

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

app.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`)
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
