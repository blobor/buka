import 'material-design-lite/material.css'
import './styles/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './app/store/configureStore'
import Root from './app/Root'

const store = configureStore(window.__PRELOADED_STATE__)
const userAgent = window.navigator.userAgent

ReactDOM.render(
  <Root store={store} userAgent={userAgent} />,
  document.getElementById('buka-app')
)
