import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './containers/HeaderContainer'
import Footer from './components/Footer'
import CardNumberInput from './containers/CardNumberInputContainer'
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
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div className='buka'>
          <Header />
          <main className='buka__container'>
            <form className='buka-cardnumber__form' method='GET'>
              <CardNumberInput
                required
                id='cardnumber'
                name='cardNumber'
                className='buka-cardnumber__input'
                autoComplete='off' />
            </form>
            <Skipass skipass={this.props.skipass} />
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
