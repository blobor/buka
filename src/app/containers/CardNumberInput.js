import { connect } from 'react-redux'

import { changeSearchSkipassNumber } from '../core/actions/action-creators/search-skipass.action-creator'
import CardNumberInput from '../components/CardNumberInput'

const mapStateToProps = state => {
  const searchSkipass = state.get('searchSkipass').toJS()

  return {
    isValid: searchSkipass.isValid,
    value: searchSkipass.skipassNumber
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
