import { connect } from 'react-redux'

import { changeSearchSkipassNumber } from '../actions/skipass'
import Header from '../components/Header'

const mapStateToProps = null

const mapDispatchToProps = dispatch => {
  return {
    testCardNumberChange: (event, value) => {
      dispatch(changeSearchSkipassNumber(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
