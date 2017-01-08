import React, { PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Match } from 'react-router'

import Search from './containers/Search'
import Skipass from './skipasses/Skipass.container'
import SkipassGridList from './skipasses/SkipassGridList.container'
import Header from './containers/Header'
import Footer from './components/Footer'

import { fullWhite } from 'material-ui/styles/colors'
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const App = ({ userAgent }) => {
  const muiTheme = getMuiTheme({
    userAgent: userAgent,
    textField: {
      hintColor: '#565656'
    },
    svgIcon: {
      color: fullWhite
    }
  })

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className='app'>
        <Header />
        <main className='app__container'>
          <Match exactly pattern='/' component={Search} />
          <Match exactly pattern='/skipasses' component={SkipassGridList} />
          <Match exactly pattern='/skipasses/:id' component={Skipass} />
        </main>
        <Footer />
      </div>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  userAgent: PropTypes.string.isRequired
}

export default App
