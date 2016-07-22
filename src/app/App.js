import 'babel-polyfill'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Header from './containers/Header'
import Footer from './containers/Footer'
import CardNumberForm from './containers/CardNumberForm'
import SkipassSearchResult from './components/SkipassSearchResult'

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
    const search = this.props

    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div className='buka'>
          <Header />
          <main className='buka__container'>
            <CardNumberForm />
            <SkipassSearchResult search={search} />
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

const mapStateToProps = state => {
  return state.searchSkipass
}

export default connect(mapStateToProps)(App)
