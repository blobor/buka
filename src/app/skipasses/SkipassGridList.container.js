import { connect } from 'react-redux'
import { removeStoredSkipass } from '../core/actions/stored-skipasses.actions'
import SkipassGridList from './SkipassGridList.component'

const mapStateToProps = state => {
  const { list: skipasses } = state.get('skipasses').toJS()

  return {
    skipasses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveSkipass: skipass => {
      dispatch(removeStoredSkipass(skipass))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkipassGridList)
