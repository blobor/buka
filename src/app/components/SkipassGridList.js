import React, { Component } from 'react'

class SkipassGridList extends Component {
  constructor (props) {
    super(props)

    props.initialize()
  }

  render () {
    const { skipasses } = this.props

    return (
      <ul>
        {skipasses.map((skipass, index) => <li key={index}>{skipass.cardNumber}</li>)}
      </ul>
    )
  }
}

export default SkipassGridList
