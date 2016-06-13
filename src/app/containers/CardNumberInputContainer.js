import { connect } from 'react-redux'

import { fetchSkipassData } from '../actions/skipass'
import CardNumberInput from '../components/CardNumberInput'

const mapStateToProps = state => {
  return {
    value: state.skipass.cardNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: (event) => {
      if (event.isValid) {
        dispatch(fetchSkipassData(event.text))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardNumberInput)
