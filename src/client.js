import 'material-design-lite/material.css'
import './styles/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './app/store/configureStore'
import App from './app/App'

const store = configureStore(window.__PRELOADED_STATE__)
const userAgent = window.navigator.userAgent

ReactDOM.render(
  <Provider store={store}>
    <App userAgent={userAgent} />
  </Provider>,
  document.getElementById('buka-app')
)
