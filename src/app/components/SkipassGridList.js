import React, { Component } from 'react'
import SkipassCard from './SkipassCard'

class SkipassGridList extends Component {
  constructor (props) {
    super(props)

    props.initialize()
  }

  render () {
    const { skipasses } = this.props

    return (
      <section className='skipasess__container'>
        {skipasses.map((skipass, index) => <SkipassCard key={index} skipass={skipass} />)}
      </section>
    )
  }
}

export default SkipassGridList
