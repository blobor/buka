import React from 'react'
import { Link } from 'react-router'
import { RaisedButton } from 'material-ui'

const RaisedButtonLink = (props) => {
  const listItemLinkRender = ({isActive, href, onClick}) => {
    return (
      <RaisedButton href={href} label={props.label} onClick={onClick} disabled={isActive} fullWidth />
    )
  }

  return (
    <Link {...props}>{listItemLinkRender}</Link>
  )
}

export default RaisedButtonLink
