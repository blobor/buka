import { connect } from 'react-redux'

import Header from '../components/Footer'

const mapStateToProps = state => {
  return {
    name: state.app.name,
    version: state.app.version
  }
}

export default connect(mapStateToProps)(Header)
