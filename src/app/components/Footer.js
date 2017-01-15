import React from 'react'
import { ActionSearch, ContentSave, ActionInfoOutline } from 'material-ui/svg-icons'
import BottomNavigationLink from './BottomNavigationLink'

const Footer = () => {
  return (
    <footer className='app__footer'>
      <nav className='bottom-navigation'>
        <BottomNavigationLink
          className='bottom-navigation__link'
          to='/'
          label='Search'
          activeOnlyWhenExact
          icon={
            <ActionSearch />
          } />
        <BottomNavigationLink
          className='bottom-navigation__link'
          to='/skipasses'
          label='Skipasses'
          icon={
            <ContentSave />
          } />
        <BottomNavigationLink
          className='bottom-navigation__link'
          to='/about'
          label='About'
          icon={
            <ActionInfoOutline />
          } />
      </nav>
    </footer>
  )
}

export default Footer
