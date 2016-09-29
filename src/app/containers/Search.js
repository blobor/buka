import React from 'react'
import { connect } from 'react-redux'

import CardNumberForm from './CardNumberForm'
import SkipassSearchResult from '../components/SkipassSearchResult'

const Search = ({ search }) => {
  return (
    <section className='buka-skipass-search__container'>
      <CardNumberForm />
      <SkipassSearchResult search={search} />
    </section>
  )
}

const mapStateToProps = state => {
  return {
    search: state.get('searchSkipass').toJS()
  }
}

export default connect(mapStateToProps)(Search)
