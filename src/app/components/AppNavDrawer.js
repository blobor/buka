import React, { Component } from 'react'

import { Drawer, IconButton, AppBar } from 'material-ui'
import { NavigationMenu } from 'material-ui/svg-icons'

class AppNavDrawer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      open: false
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.setState({
      open: !this.state.open
    })
  }

  handleClose () {
    this.setState({
      open: false
    })
  }

  render () {
    return (
      <div>
        <IconButton
          onTouchTap={this.handleToggle}>
          <NavigationMenu />
        </IconButton>
        <Drawer className='buka-navigation-drawer__container'
          open={this.state.open}
          docked={false}
          onRequestChange={this.handleClose}>
          <AppBar className='buka-navigation-drawer__header'
            title='Buka'
            onTitleTouchTap={this.handleClose}
            showMenuIconButton={false} />
        </Drawer>
      </div>
    )
  }
}

export default AppNavDrawer
