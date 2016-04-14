import React from 'react';
import bukovelAPI from './data-access/bukovelAPI';
import ActionHelpOutline from 'material-ui/lib/svg-icons/action/help-outline';
import CardNumberInput from './components/CardNumberInput';

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
        <div className="buka-cardnumber__container">
          <CardNumberInput
              className="buka-cardnumber__input"
              onChange={this.handleCardNumberChange}
              value={this.state.cardNumber} />
          <ActionHelpOutline className="buka-cardnumber__help"/>
        </div>
        <p>{`Test card number: ${TEST_CARD_NUMBER}`}</p>
        <pre>{this.state.html}</pre>
      </div>
    );
  }
}