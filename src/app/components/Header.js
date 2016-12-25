import React from 'react'
import { AppBar } from 'material-ui'
import TestCardNumber from './TestCardNumber'

const Header = ({ testCardNumberChange }) => {
  return (
    <header className='app-header'>
      <AppBar
        className='app-header__appbar'
        showMenuIconButton={false}
        iconElementRight={
          <TestCardNumber onChange={testCardNumberChange} />
        } />
    </header>
  )
}

export default Header
