import 'material-design-lite/material.css'
import './styles/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import PouchDB from './app/data-access/PouchDB-client'
import configureStore from './app/store/configureStore'
import App from './app/App'
import * as config from './config'

if (config.development) {
  window.PouchDB = PouchDB
  PouchDB.debug.enable('*')
}

const store = configureStore(window.__PRELOADED_STATE__)
const userAgent = window.navigator.userAgent

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App userAgent={userAgent} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('buka-app')
)
