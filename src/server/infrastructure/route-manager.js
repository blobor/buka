import has from 'lodash.has'
import React from 'react'
import { Router } from 'express'
import { renderToString } from 'react-dom/server'

import apiRoute from '../routes'
import Root from '../../app/Root'
import configureStore from '../../app/store/configureStore'
import bukovelAPI from '../../app/data-access/bukovelAPI'
import { validate as validateSkipassNumber } from '../../app/helpers/cardNumberValidator.js'

import Manager from './Manager.js'

const createPageRouter = () => {
  const router = new Router()

  router.get('/', async (req, res) => {
    const tasks = []
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

    res.render('index', {
      content: html,
      preloadedState: store.getState()
    })
  })

  return router
}

class RouteManager extends Manager {
  configureCommon (app) {
    app.use('/', createPageRouter())
    app.use('/api', apiRoute)
  }
}

export default new RouteManager()
