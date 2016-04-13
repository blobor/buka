import 'material-design-lite/material.css';
import 'material-design-lite/material.js';

import React from 'react';
import bukovelAPI from './dataAccess/bukovelApi';
import CardNumberInput from './CardNumberInput';

const TEST_CARD_NUMBER = '01-2167-30-92545';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      html: '',
      cardNumber: ''
    };
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
  }

  handleCardNumberChange(event) {
    if (event.isValid) {
      bukovelAPI
        .getCardBalance(event.text)
        .then(data => {
          this.setState({
            html: JSON.stringify(data, null, '\t')
          });
        })
    }
  }

  render() {
    return (
      <div className="buka-container">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <CardNumberInput
            id="CardNumber"
            className="mdl-textfield__input"
            onChange={this.handleCardNumberChange}
            value={this.state.cardNumber} />
          <label className="mdl-textfield__label" for="CardNumber">Card Number</label>
        </div>
        <p>{`Test card number: ${TEST_CARD_NUMBER}`}</p>
        <pre>{this.state.html}</pre>
      </div>
    );
  }
}