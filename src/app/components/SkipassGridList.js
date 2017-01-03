import React, { Component } from 'react'
import SkipassCard from './SkipassCard'

class SkipassGridList extends Component {
  componentDidMount () {
    const { initialize } = this.props

    // initialize component
    initialize()
  }

  render () {
    const { skipasses, onRemoveSkipass } = this.props

    return (
      <section className='skipasess__container'>
        {skipasses.map((skipass, index) => <SkipassCard key={index} skipass={skipass} onRemoveSkipass={onRemoveSkipass} />)}
      </section>
    )
  }
}

export default SkipassGridList
