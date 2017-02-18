import { connect } from 'react-redux'

import { changeSearchSkipassNumber } from '../core/actions/action-creators/search-skipass.action-creators'
import Header from '../components/Header'

const mapStateToProps = state => {
  const { developerMode } = state.get('app').toJS()

  return {
    developerMode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testCardNumberChange: (event, value) => {
      dispatch(changeSearchSkipassNumber(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
