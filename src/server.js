import express from 'express'
import has from 'lodash.has'
import React from 'react'
import { renderToString } from 'react-dom/server'

import Root from './app/Root'
import configureStore from './app/store/configureStore'
import bukovelAPI from './app/data-access/bukovelAPI'
import { validate as validateSkipassNumber } from './app/helpers/cardNumberValidator.js'

import * as config from './config.js'
import middlewareManager from './server/infrastructure/middleware-manager.js'

const app = express()

middlewareManager.handle(app)

app.get('/', async (req, res) => {
  const tasks = [
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

  await Promise.all(tasks)

  const store = configureStore(preloadedState)
  const html = renderToString(
    <Root store={store} userAgent={req.headers['user-agent']} />
  )
  const finalState = store.getState()

  const templateData = {
    content: html,
    preloadedState: JSON.stringify(finalState)
  }

  res.render('index', templateData)
})

app.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`)
  console.log(`env = ${app.get('env')}`)
  console.log(`__dirname = ${__dirname}`)
})
