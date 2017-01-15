import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Divider } from 'material-ui'

const About = ({ appVersion }) => {
  return (
    <article className='about__container'>

      <List>
        <ListItem primaryText='App version' secondaryText={appVersion} />
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

export {
  About
}
export default connect(mapStateToProps)(About)
