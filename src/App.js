import React from 'react';
import bukovelAPI from './data-access/bukovelAPI';
import ActionHelpOutline from 'material-ui/lib/svg-icons/action/help-outline';
import CardNumberInput from './components/CardNumberInput';
import TestCardNumber from './components/TestCardNumber';
import CircularProgress from 'material-ui/lib/circular-progress';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      html: '',
      cardNumber: '',
      isDataLoads: false
    };
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
  }

  handleCardNumberChange(event) {
    if (event.isValid) {
      let spinnerTimeOut = setTimeout(() => {
        console.log('Spinner start');
        this.setState({
          isDataLoads: true
        });
      }, 100);
      bukovelAPI
        .getCardBalance(event.text)
        .then(data => {
          clearTimeout(spinnerTimeOut);
          console.log('Spinner end');
          this.setState({
            isDataLoads: false,
            html: JSON.stringify(data, null, '\t')
          });
        });
    }
  }

  render() {
    const grid = this.state.isDataLoads ? <CircularProgress size={1.5} /> : <pre>{this.state.html}</pre>;

    return (
      <div className="buka-container">
        <div className="buka-cardnumber__container">
          <CardNumberInput
            id="cardnumber"
            className="buka-cardnumber__input"
            onChange={this.handleCardNumberChange}
            value={this.state.cardNumber} />
          <TestCardNumber />
        </div>
        {grid}
      </div>
    );
  }
}