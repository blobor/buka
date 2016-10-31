import React from 'react'
import { Link } from 'react-router'
import { BottomNavigationItem } from 'material-ui'

const BottomNavigationLink = props => {
  const listItemLinkRender = ({isActive, href, onClick}) => {
    return (
      <a href={href} onClick={onClick} className={props.className}>
        <BottomNavigationItem label={props.label} icon={props.icon} selected={isActive} />
      </a>
    )
  }

  return (
    <Link {...props}>{listItemLinkRender}</Link>
  )
}

export default BottomNavigationLink
