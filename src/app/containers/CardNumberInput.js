import { connect } from 'react-redux'

import { changeSearchSkipassNumber } from '../actions/skipass'
import CardNumberInput from '../components/CardNumberInput'

const mapStateToProps = state => {
  return {
    isValid: state.searchSkipass.isValid,
    value: state.searchSkipass.skipassNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: (event) => {
      dispatch(changeSearchSkipassNumber(event.text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardNumberInput)
