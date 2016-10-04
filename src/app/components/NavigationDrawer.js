import React from 'react'

import { Drawer, IconButton, AppBar } from 'material-ui'
import { NavigationMenu } from 'material-ui/svg-icons'

const NavigationDrawer = ({ isOpen, handleClose, handleToggle }) => {
  return (
    <div>
      <IconButton
        onTouchTap={handleToggle}>
        <NavigationMenu />
      </IconButton>
      <Drawer className='buka-navigation-drawer__container'
        open={isOpen}
        docked={false}
        onRequestChange={handleClose}>
        <AppBar className='buka-navigation-drawer__header'
          title='Buka'
          onTitleTouchTap={handleClose}
          showMenuIconButton={false} />
      </Drawer>
    </div>
  )
}

export default NavigationDrawer
