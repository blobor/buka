import 'babel-polyfill'

import React, { PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Match } from 'react-router'

import Search from './containers/Search'
import Header from './containers/Header'
import Footer from './containers/Footer'
import NavigationDrawer from './containers/NavigationDrawer'

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
      <div className='buka'>
        <Header />
        <NavigationDrawer />
        <main className='buka__container'>
          <Match pattern='/' component={Search} />
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
