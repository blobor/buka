import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import App from './App'

const Root = ({ store, userAgent }) => {
  return (
    <Provider store={store}>
      <App userAgent={userAgent} />
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  userAgent: PropTypes.string.isRequired
}

Root.defaultProps = {
  userAgent: 'all'
}

export default Root
