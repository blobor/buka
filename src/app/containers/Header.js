import { connect } from 'react-redux'

import { changeCardNumber } from '../actions/skipass'
import Header from '../components/Header'

const mapStateToProps = state => {
  return {
    appName: state.app.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testCardNumberChange: (event, value) => {
      dispatch(changeCardNumber(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
