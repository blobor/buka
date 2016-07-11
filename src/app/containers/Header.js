import { connect } from 'react-redux'

import { changeCardNumber } from '../actions/skipass'
import Header from '../components/Header'

const mapStateToProps = null

const mapDispatchToProps = dispatch => {
  return {
    testCardNumberChange: (event, value) => {
      dispatch(changeCardNumber(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
