import React from 'react'
import { Drawer, AppBar } from 'material-ui'

const NavigationDrawer = ({ isOpen, handleClose }) => {
  return (
    <Drawer className='buka-navigation-drawer__container'
      open={isOpen}
      docked={false}
      onRequestChange={handleClose}>
      <AppBar className='buka-navigation-drawer__header'
        title='Buka'
        onTitleTouchTap={handleClose}
        showMenuIconButton={false} />
    </Drawer>
  )
}

export default NavigationDrawer
