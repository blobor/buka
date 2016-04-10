import React from 'react';
import bukovelAPI from './dataAccess/bukovelApi';
import CardNumberInput from './CardNumberInput';

const TEST_CARD_NUMBER = '01-2167-30-92545';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      html: '',
      cardNumber: TEST_CARD_NUMBER
    };
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
  }

  // componentWillMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       cardNumber: TEST_CARD_NUMBER
  //     })
  //   })
  // }

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
      <div>
        <CardNumberInput onChange={this.handleCardNumberChange} value={this.state.cardNumber} />
        <pre>{this.state.html}</pre>
      </div>
    );
  }
}