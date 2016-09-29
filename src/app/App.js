import 'babel-polyfill'

import React, { Component, PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Match } from 'react-router'

import Search from './containers/Search'
import Header from './containers/Header'
import Footer from './containers/Footer'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

class App extends Component {

  constructor () {
    super()

    this.muiTheme = null
  }

  componentWillMount () {
    this.muiTheme = getMuiTheme({
      userAgent: this.props.userAgent
    })
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div className='buka'>
          <Header />
          <main className='buka__container'>
            <Match pattern='/' component={Search} />
          </main>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  userAgent: PropTypes.string.isRequired
}

export default App
