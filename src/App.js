import React from 'react';
import bukovelAPI from './data-access/bukovelAPI';
import CardNumberInput from './components/CardNumberInput';
import TestCardNumber from './components/TestCardNumber';
import LiftsTable from './components/LiftsTable';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardInfo: {
        lifts: []
      },
      cardNumber: '',
      isDataLoads: false
    };
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.testCardNumberChange = this.testCardNumberChange.bind(this);
  }

  testCardNumberChange(event, value) {
    this.setState({
      cardNumber: value
    });
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
            cardInfo: data
          });
        });
    }
  }

  renderTable() {
    return this.state.isDataLoads ? <CircularProgress size={1.5} /> : (
      <Paper zDepth={2}>
        <LiftsTable lifts={this.state.cardInfo.lifts} />
      </Paper>
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <header className='buka__header'>
            <AppBar title='Buka' />
          </header>
          <main className='buka__container'>
            <div className='buka-cardnumber__container'>
              <CardNumberInput
                id='cardnumber'
                className='buka-cardnumber__input'
                onChange={this.handleCardNumberChange}
                value={this.state.cardNumber} />
              <TestCardNumber onChange={this.testCardNumberChange} />
            </div>
            {this.renderTable()}
          </main>
          <footer>
          </footer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;