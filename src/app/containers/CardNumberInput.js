import { connect } from 'react-redux'

import { changeCardNumber } from '../actions/skipass'
import CardNumberInput from '../components/CardNumberInput'

const mapStateToProps = state => {
  return {
    isValid: state.skipass.isValid,
    value: state.skipass.cardNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: (event) => {
      dispatch(changeCardNumber(event.text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardNumberInput)
