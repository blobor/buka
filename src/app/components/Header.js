import React from 'react'
import { AppBar } from 'material-ui'
import AppNavDrawer from './AppNavDrawer'
import TestCardNumber from './TestCardNumber'

const Header = ({ testCardNumberChange }) => {
  return (
    <header className='buka__header'>
      <AppBar
        className='buka__header-appbar'
        iconElementLeft={
          <AppNavDrawer />
        }
        iconElementRight={
          <TestCardNumber onChange={testCardNumberChange} />
        } />
    </header>
  )
}

export default Header
