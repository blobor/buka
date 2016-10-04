import React from 'react'
import { AppBar } from 'material-ui'
import NavigationDrawer from '../containers/NavigationDrawer'
import TestCardNumber from './TestCardNumber'

const Header = ({ testCardNumberChange }) => {
  return (
    <header className='buka__header'>
      <AppBar
        className='buka__header-appbar'
        iconElementLeft={
          <NavigationDrawer />
        }
        iconElementRight={
          <TestCardNumber onChange={testCardNumberChange} />
        } />
    </header>
  )
}

export default Header
