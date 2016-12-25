import './styles/app.scss'

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import isEmpty from 'lodash.isempty'
import PouchDB from './app/data-access/PouchDB-client'
import configureStore from './app/store/configureStore'
import App from './app/App'
import * as config from './config'

const appContainer = document.getElementById('app-container')
const appStateJSON = document.getElementById('app-preloaded-state').textContent

if (config.development) {
  window.PouchDB = PouchDB
  PouchDB.debug.enable('*')
}
let preloadedState
if (!isEmpty(appStateJSON)) {
  preloadedState = JSON.parse(appStateJSON)
}

const store = configureStore(preloadedState)
const userAgent = window.navigator.userAgent

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App userAgent={userAgent} />
    </BrowserRouter>
  </Provider>,
  appContainer
)
