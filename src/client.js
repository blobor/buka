import 'material-design-lite/material.css'
import './styles/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import PouchDB from './app/data-access/PouchDB-client'
import configureStore from './app/store/configureStore'
import Root from './app/Root'
import * as config from './config'

if (config.development) {
  window.PouchDB = PouchDB
  PouchDB.debug.enable('*')
}

const store = configureStore(window.__PRELOADED_STATE__)
const userAgent = window.navigator.userAgent

ReactDOM.render(
  <Root store={store} userAgent={userAgent} />,
  document.getElementById('buka-app')
)
