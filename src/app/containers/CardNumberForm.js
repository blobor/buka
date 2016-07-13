import { connect } from 'react-redux'

import CardNumberForm from '../components/CardNumberForm'
import { fetchSkipassData } from '../actions/skipass'

const mapStateToProps = state => {
  return {
    isValid: state.searchSkipass.isValid,
    cardNumber: state.searchSkipass.skipassNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFormSubmit: (skipassNumber) => {
      dispatch(fetchSkipassData(skipassNumber))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardNumberForm)
