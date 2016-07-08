import { connect } from 'react-redux'

import CardNumberForm from '../components/CardNumberForm'
import { fetchSkipassData } from '../actions/skipass'

const mapStateToProps = state => {
  return {
    isValid: state.skipass.isValid,
    cardNumber: state.skipass.cardNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFormSubmit: (cardNumber) => {
      dispatch(fetchSkipassData(cardNumber))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardNumberForm)
