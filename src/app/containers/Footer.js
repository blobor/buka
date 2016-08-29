import { connect } from 'react-redux'

import Header from '../components/Footer'

const mapStateToProps = state => {
  const { name, version } = state.get('app').toJS()

  return {
    name,
    version
  }
}

export default connect(mapStateToProps)(Header)
