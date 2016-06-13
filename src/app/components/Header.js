import React from 'react'
import AppBar from 'material-ui/AppBar'

const Header = ({ version }) => {
  const headerTitle = `Buka v${version}`

  return (
    <header className='buka__header'>
      <AppBar title={headerTitle} className='buka__header-appbar' />
    </header>
  )
}

export default Header
