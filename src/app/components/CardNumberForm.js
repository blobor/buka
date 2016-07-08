import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import CardNumberInput from '../containers/CardNumberInput'
import { CARD_NUMBER_REGEX } from '../helpers/cardNumberValidator'

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
    const { isValid } = this.props

    return (
      <form className='buka-cardnumber__form' method='GET'>
        <CardNumberInput
          required
          pattern={CARD_NUMBER_REGEX}
          id='cardnumber'
          name='cardNumber'
          className='buka-cardnumber__input'
          autoComplete='off' />
        <RaisedButton type='submit' label='Search' primary disabled={!isValid} onClick={this.handleFormSubmit} />
      </form>
    )
  }
}
