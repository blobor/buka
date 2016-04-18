import React from 'react';
import bukovelAPI from './data-access/bukovelAPI';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';
import CardNumberInput from './components/CardNumberInput';
import TestCardNumber from './components/TestCardNumber';
import CircularProgress from 'material-ui/CircularProgress';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      html: '',
      cardNumber: '',
      isDataLoads: false
    };
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
  }
  
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }


  handleCardNumberChange(event) {
    if (event.isValid) {
      let spinnerTimeOut = setTimeout(() => {
        this.setState({
          isDataLoads: true
        });
      }, 100);
      bukovelAPI
        .getCardBalance(event.text)
        .then(data => {
          clearTimeout(spinnerTimeOut);
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

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;