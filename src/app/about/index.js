import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Divider } from 'material-ui'

import { toggleDeveloperMode } from '../core/actions/action-creators/app'

const About = ({ version, enableDeveloperMode }) => {
  return (
    <article className='about__container'>
      <List>
        <ListItem primaryText='Version' secondaryText={version} onTouchTap={enableDeveloperMode} />
        <Divider />
      </List>
    </article>
  )
}

const mapStateToProps = state => {
  const { version } = state.get('app').toJS()

  return {
    version
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
