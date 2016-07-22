import test from 'ava'
import React from 'react'
import sinon from 'sinon'
import { render } from 'enzyme'

import Root from '../src/app/Root.js'
import configureStore from '../src/app/store/configureStore'

test('check if App component log errors', t => {
  const store = configureStore()

  const spy = sinon.spy(console, 'error')

  render(<Root store={store} />)

  t.false(spy.called)
})
