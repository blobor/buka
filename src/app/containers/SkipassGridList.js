import { connect } from 'react-redux'
import { fetchStoredSkipasses, removeStoredSkipass } from '../core/actions/stored-skipasses.actions'
import SkipassGridList from '../components/SkipassGridList'

const mapStateToProps = state => {
  return {
    skipasses: state.get('storedSkipasses').toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initialize: () => {
      dispatch(fetchStoredSkipasses())
    },
    onRemoveSkipass: skipass => {
      dispatch(removeStoredSkipass(skipass))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkipassGridList)
