import 'material-design-lite/material.css'
import '../styles/app.scss'

import 'babel-polyfill'
import injectTapEventPlugin from 'react-tap-event-plugin'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './App'

const store = configureStore(window.__PRELOADED_STATE__)

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('buka-app')
)
