import React from 'react'
import { ActionSearch, ContentSave } from 'material-ui/svg-icons'
import BottomNavigationLink from './BottomNavigationLink'

const Footer = () => {
  return (
    <footer className='buka__footer material-shadow--z1'>
      <nav className='bottom-navigation'>
        <BottomNavigationLink
          to='/'
          label='Search'
          activeOnlyWhenExact
          icon={
            <ActionSearch />
          } />
        <BottomNavigationLink
          to='/skipasses'
          label='Skipasses'
          activeOnlyWhenExact
          icon={
            <ContentSave />
          } />
      </nav>
    </footer>
  )
}

export default Footer
