import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import CardNumberInput from '../containers/CardNumberInput'
import { CARD_NUMBER_PATTERN } from '../helpers/cardNumberValidator'

export default class CardNumberForm extends Component {

  constructor () {
    super()

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (event) {
    event.preventDefault()

    if (this.props.onFormSubmit) {
      this.props.onFormSubmit(this.props.cardNumber)
    }
  }

  render () {
    const { isDisabled } = this.props

    return (
      <form className='buka-skipass-number__form' method='GET' onSubmit={this.handleFormSubmit}>
        <CardNumberInput
          required
          pattern={CARD_NUMBER_PATTERN}
          id='skipassnumber'
          name='skipassNumber'
          type='search'
          className='buka-skipass-number__input'
          autoComplete='off' />
        <RaisedButton type='submit' label='Search' primary disabled={isDisabled} />
      </form>
    )
  }
}
