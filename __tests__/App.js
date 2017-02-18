/* eslint-env jest */

import React from 'react'
import { spy as createSpy } from 'sinon'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { ServerRouter, createServerRenderContext } from 'react-router'

import App from 'app/App.js'
import configureStore from 'app/core/store/configureStore'

it('check if App component log errors', () => {
  const store = configureStore()
  const context = createServerRenderContext()

  const consoleErrorSpy = createSpy(console, 'error')

  renderer.create(
    <Provider store={store}>
      <ServerRouter location='/' context={context}>
        <App userAgent='all' />
      </ServerRouter>
    </Provider>
  )

  expect(consoleErrorSpy.called).toBe(false)
})
