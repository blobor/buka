import test from 'ava'
import React from 'react'
import sinon from 'sinon'
import { render } from 'enzyme'
import { Provider } from 'react-redux'

import App from '../src/app/App.js'
import configureStore from '../src/app/store/configureStore'

test('check if App component log errors', t => {
  const store = configureStore()

  const spy = sinon.spy(console, 'error')

  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  t.false(spy.called)
})
