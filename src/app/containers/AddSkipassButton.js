import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { FloatingActionButton } from 'material-ui'
import { ContentAdd } from 'material-ui/svg-icons'

import { storeSkipass } from '../core/actions/stored-skipasses.actions'

const AddSkipassButton = ({ canBeAdded, storeSkipass }) => {
  const className = classNames('add-skipass__button', 'add-skipass__button--animated', {
    'add-skipass__button--hidden': !canBeAdded
  })

  return (
    <FloatingActionButton className={className} onTouchTap={storeSkipass} >
      <ContentAdd />
    </FloatingActionButton>
  )
}

const mapStateToProps = state => {
  return {
    canBeAdded: state.get('searchSkipass').get('canBeAdded')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeSkipass: skipass => {
      dispatch(storeSkipass(skipass))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSkipassButton)
