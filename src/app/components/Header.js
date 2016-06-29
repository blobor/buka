import React from 'react'
import AppBar from 'material-ui/AppBar'
import TestCardNumber from './TestCardNumber'

const Header = ({ version, testCardNumberChange }) => {
  const headerTitle = `Buka v${version}`

  return (
    <header className='buka__header'>
      <AppBar
        title={headerTitle}
        className='buka__header-appbar'
        iconElementRight={
          <TestCardNumber onChange={testCardNumberChange} />
        } />
    </header>
  )
}

export default Header
