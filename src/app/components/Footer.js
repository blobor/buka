import React from 'react'
import { Link } from 'react-router'
import { BottomNavigationItem } from 'material-ui/BottomNavigation'
import { ActionSearch, ContentSave } from 'material-ui/svg-icons'

const Footer = () => {
  return (
    <footer className='buka__footer material-shadow--z1'>
      <Link to='/'>
        <BottomNavigationItem
          label='Search'
          icon={<ActionSearch />}
        />
      </Link>
      <Link to='/skipasses'>
        <BottomNavigationItem
          label='Skipasses'
          icon={<ContentSave />}
        />
      </Link>
    </footer>
  )
}

export default Footer
