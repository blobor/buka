import React from 'react'
import { AppBar } from 'material-ui'
import TestCardNumber from './TestCardNumber'

const Header = ({ testCardNumberChange }) => {
  return (
    <header className='buka__header'>
      <AppBar
        className='buka__header-appbar'
        showMenuIconButton={false}
        iconElementRight={
          <TestCardNumber onChange={testCardNumberChange} />
        } />
    </header>
  )
}

export default Header
