import { connect } from 'react-redux'
import Skipass from '../components/Skipass'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.params
  const { list: skipasses } = state.get('skipasses').toJS()

  return {
    skipass: skipasses.find(skipass => skipass.cardNumber === id)
  }
}

export default connect(mapStateToProps)(Skipass)
