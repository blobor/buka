import React from 'react'
import sinon from 'sinon'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { ServerRouter, createServerRenderContext } from 'react-router'

import App from '../src/app/App.js'
import configureStore from '../src/app/core/store/configureStore'

it('check if App component log errors', () => {
  const store = configureStore()
  const context = createServerRenderContext()

  const spy = sinon.spy(console, 'error')

  renderer.create(
    <Provider store={store}>
      <ServerRouter location='/' context={context}>
        <App userAgent='all' />
      </ServerRouter>
    </Provider>
  )

  expect(spy.called).toBe(false)
})
