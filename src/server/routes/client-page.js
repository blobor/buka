import has from 'lodash.has'
import React from 'react'
import { Router } from 'express'
import { renderToString } from 'react-dom/server'

import { wrapAsync } from '../utils/express-promise-handle'
import Root from '../../app/Root'
import configureStore from '../../app/store/configureStore'
import { getSkipass } from '../data-sourses/bukovel-tickets/bukovel'
import { validate as validateSkipassNumber } from '../../app/helpers/cardNumberValidator.js'

const router = new Router()

router.get('/', wrapAsync(async (req, res) => {
  const preloadedState = await getPreloadedState(req.query)

  const store = configureStore(preloadedState)
  const html = renderToString(
    <Root store={store} userAgent={req.headers['user-agent']} />
  )

  res.render('index', {
    content: html,
    preloadedState: store.getState()
  })
}))

function getPreloadedState (queryString) {
  if (!has(queryString, 'skipassNumber')) {
    return Promise.resolve({})
  }

  const preloadedState = {
    searchSkipass: {
      skipass: null,
      skipassNumber: queryString.skipassNumber,
      isValid: validateSkipassNumber(queryString.skipassNumber)
    }
  }

  if (!preloadedState.searchSkipass.isValid) {
    return Promise.resolve(preloadedState)
  }

  return getSkipass(queryString.skipassNumber)
    .then(skipass => {
      preloadedState.searchSkipass.skipass = skipass
      return preloadedState
    }, error => {
      preloadedState.searchSkipass.error = error
      return preloadedState
    })
}

export default router
