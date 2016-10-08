import React from 'react'
import { connect } from 'react-redux'
import { FloatingActionButton } from 'material-ui'
import { ContentAdd } from 'material-ui/svg-icons'

import { storeSkipass } from '../actions/store-skipass'

const AddSkipassButton = ({ canBeAdded, storeSkipass }) => {
  if (!canBeAdded) {
    return null
  }

  return (
    <FloatingActionButton className='buka-skipass-search__add-button' onTouchTap={storeSkipass} >
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
