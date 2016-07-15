import 'babel-polyfill'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './containers/Header'
import Footer from './containers/Footer'
import CardNumberForm from './containers/CardNumberForm'
import SkipassSearchResult from './components/SkipassSearchResult'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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

const mapStateToProps = state => {
  return state.searchSkipass
}

export default connect(mapStateToProps)(App)
