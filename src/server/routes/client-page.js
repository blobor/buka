import has from 'lodash.has'
import React from 'react'
import { Router } from 'express'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'

import indexView from '../../index.hbs'

import App from '../../app/App'
import configureStore from '../../app/core/store/configureStore'
import { version, analytics } from '../../config'
import { wrapAsync } from '../utils/express-promise-handle'
import { getSkipass } from '../data-sourses/bukovel-tickets/bukovel'
import { validate as validateSkipassNumber } from '../../app/helpers/cardNumberValidator.js'

const router = new Router()

router.get('*', wrapAsync(async (req, res) => {
  const preloadedState = await getPreloadedState(req.query)

  const context = createServerRenderContext()
  const store = configureStore(preloadedState)
  let httpStatus = 200
  let html = renderToString(renderAppComponent(req, store, context))

  const result = context.getResult()

  if (result.redirect) {
    res.redirect(301, result.redirect.pathname + result.redirect.search)
    return
  }

  // the result will tell you if there were any misses, if so
  // we can send a 404 and then do a second render pass with
  // the context to clue the <Miss> components into rendering
  // this time
  if (result.missed) {
    httpStatus = 404
    html = renderToString(renderAppComponent(req, store, context))
  }

  res.status(httpStatus).render(indexView, {
    content: html,
    version: version,
    analytics: analytics,
    preloadedState: JSON.stringify(store.getState())
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

function renderAppComponent (req, store, routeContext) {
  return (
    <Provider store={store}>
      <ServerRouter location={req.url} context={routeContext}>
        <App userAgent={req.headers['user-agent']} />
      </ServerRouter>
    </Provider>
  )
}

export default router
