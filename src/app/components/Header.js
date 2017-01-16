import React from 'react'
import { AppBar } from 'material-ui'
import TestCardNumber from './TestCardNumber'

const Header = ({ developerMode, testCardNumberChange }) => {
  const rightElement = developerMode ? <TestCardNumber onChange={testCardNumberChange} /> : null

  return (
    <header className='app-header'>
      <AppBar
        className='app-header__appbar'
        showMenuIconButton={false}
        iconElementRight={rightElement} />
    </header>
  )
}

export default Header
