import React from 'react'
import { connect } from 'react-redux'

import { changeCardNumber } from './actions/skipass'
import Header from './components/Header'

import Footer from './components/Footer'
import CardNumberInput from './containers/CardNumberInputContainer'
import TestCardNumber from './components/TestCardNumber'
import Skipass from './components/Skipass'

import { version } from '../../package.json'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const muiTheme = getMuiTheme()

const App = ({ skipass, testCardNumberChange }) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className='buka'>
        <Header version={version} />
        <main className='buka__container'>
          <form className='buka-cardnumber__form' method='GET'>
            <CardNumberInput
              id='cardnumber'
              name='cardNumber'
              className='buka-cardnumber__input'
              autoComplete='off' />
            <TestCardNumber onChange={testCardNumberChange} />
          </form>
          <Skipass skipass={skipass} />
        </main>
        <Footer />
      </div>
    </MuiThemeProvider>
  )
}

const mapStateToProps = state => {
  return {
    skipass: {
      ...state.skipass
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testCardNumberChange: (event, value) => {
      dispatch(changeCardNumber(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
