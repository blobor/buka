import { connect } from 'react-redux'

import { version } from '../../../package.json'

import { changeCardNumber } from '../actions/skipass'
import Header from '../components/Header'

const mapStateToProps = state => {
  return {
    version: version
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
