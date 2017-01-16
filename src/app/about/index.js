import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Divider } from 'material-ui'

import { toggleDeveloperMode } from '../core/actions/action-creators/app'

const About = ({ appVersion, enableDeveloperMode }) => {
  return (
    <article className='about__container'>
      <List>
        <ListItem primaryText='App version' secondaryText={appVersion} onTouchTap={enableDeveloperMode} />
        <Divider />
      </List>
    </article>
  )
}

const mapStateToProps = state => {
  const { version: appVersion } = state.get('app').toJS()

  return {
    appVersion
  }
}

const mapDispatchToProps = dispatch => {
  return {
    enableDeveloperMode: () => {
      dispatch(toggleDeveloperMode(true))
    }
  }
}

export {
  About
}
export default connect(mapStateToProps, mapDispatchToProps)(About)
