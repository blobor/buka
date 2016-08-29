import React from 'react'
import { connect } from 'react-redux'

import CardNumberForm from './CardNumberForm'
import SkipassSearchResult from '../components/SkipassSearchResult'

const Search = ({ search }) => {
  return (
    <main className='buka__container'>
      <CardNumberForm />
      <SkipassSearchResult search={search} />
    </main>
  )
}

const mapStateToProps = state => {
  return {
    search: state.get('searchSkipass').toJS()
  }
}

export default connect(mapStateToProps)(Search)
