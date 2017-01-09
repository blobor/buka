import React from 'react'
import { connect } from 'react-redux'

import CardNumberForm from './CardNumberForm'
import AddSkipassButton from './AddSkipassButton'
import Skipass from '../components/Skipass'

const Search = ({ error, skipass, isFetching }) => {
  return (
    <section className='buka-skipass-search__container'>
      <CardNumberForm />
      <Skipass error={error} skipass={skipass} isFetching={isFetching} />
      <AddSkipassButton />
    </section>
  )
}

const mapStateToProps = state => {
  const { skipass, error, isFetching } = state.get('searchSkipass').toJS()

  return {
    error,
    skipass,
    isFetching
  }
}

export default connect(mapStateToProps)(Search)
