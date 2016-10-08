import React from 'react'
import { connect } from 'react-redux'
import { FloatingActionButton } from 'material-ui'
import { ContentAdd } from 'material-ui/svg-icons'

const AddSkipassButton = ({ canBeAdded }) => {
  if (!canBeAdded) {
    return null
  }

  return (
    <FloatingActionButton className='buka-skipass-search__add-button'>
      <ContentAdd />
    </FloatingActionButton>
  )
}

const mapStateToProps = state => {
  return {
    canBeAdded: state.get('searchSkipass').get('canBeAdded')
  }
}

export default connect(mapStateToProps)(AddSkipassButton)
