import 'babel-polyfill'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './containers/Header'
import Footer from './containers/Footer'
import CardNumberForm from './containers/CardNumberForm'
import Skipass from './components/Skipass'

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
    const { skipass } = this.props

    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div className='buka'>
          <Header />
          <main className='buka__container'>
            <CardNumberForm />
            <Skipass skipass={skipass} />
          </main>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    skipass: {
      ...state.skipass
    }
  }
}

export default connect(mapStateToProps)(App)
