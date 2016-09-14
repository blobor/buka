import has from 'lodash.has'
import React from 'react'
import { Router } from 'express'
import { renderToString } from 'react-dom/server'

import { wrapAsync } from '../utils/express-promise-handle'
import Root from '../../app/Root'
import configureStore from '../../app/store/configureStore'
import { getSkipass } from '../data-sourses/bukovel-shop/bukovel-skipass'
import { validate as validateSkipassNumber } from '../../app/helpers/cardNumberValidator.js'

const router = new Router()

router.get('/', wrapAsync(async (req, res) => {
  const tasks = []
  const preloadedState = {}

  if (has(req.query, 'skipassNumber')) {
    const searchSkipass = {
      skipass: null,
      skipassNumber: req.query.skipassNumber,
      isValid: validateSkipassNumber(req.query.skipassNumber)
    }

    if (searchSkipass.isValid) {
      const skipassTask = getSkipass(req.query.skipassNumber)
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
}))

export default router
