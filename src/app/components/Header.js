import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import { NavigationMenu } from 'material-ui/svg-icons'
import TestCardNumber from './TestCardNumber'

const Header = ({ testCardNumberChange, handleToggle }) => {
  return (
    <header className='buka__header'>
      <AppBar
        className='buka__header-appbar'
        iconElementLeft={
          <IconButton onTouchTap={handleToggle}>
            <NavigationMenu />
          </IconButton>
        }
        iconElementRight={
          <TestCardNumber onChange={testCardNumberChange} />
        } />
    </header>
  )
}

export default Header
