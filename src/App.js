import React from 'react';
import bukovelAPI from './data-access/bukovelAPI';
import ActionHelpOutline from 'material-ui/lib/svg-icons/action/help-outline';
import CardNumberInput from './components/CardNumberInput';
import TestCardNumber from './components/TestCardNumber';

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
        <div className="buka-cardnumber__container">
          <CardNumberInput
              id="-cardnumber"
              className="buka-cardnumber__input"
              onChange={this.handleCardNumberChange}
              value={this.state.cardNumber} />
          <TestCardNumber />
        </div>
        <pre>{this.state.html}</pre>
      </div>
    );
  }
}