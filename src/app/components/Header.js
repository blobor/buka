import React from 'react'
import AppBar from 'material-ui/AppBar'
import TestCardNumber from './TestCardNumber'

const Header = ({ testCardNumberChange }) => {
  return (
    <header className='buka__header'>
      <AppBar
        className='buka__header-appbar'
        iconElementRight={
          <TestCardNumber onChange={testCardNumberChange} />
        } />
    </header>
  )
}

export default Header
