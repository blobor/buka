import React from 'react';
import isEmpty from 'lodash.isempty';
import bukovelAPI from './data-access/bukovelAPI';
import CardNumberInput from './components/CardNumberInput';
import TestCardNumber from './components/TestCardNumber';
import SkipassInfo from './components/SkipassInfo';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor() {
    super();

    this.muiTheme = getMuiTheme();

    this.state = {
      skipass: {
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
            skipass: data
          });
        });
    }
  }

  renderTable() {
    if (this.state.isDataLoads) {
      return <CircularProgress size={1.5} />;
    } else if (!isEmpty(this.state.skipass.lifts)) {
      return <SkipassInfo skipass={this.state.skipass} />;
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div className='buka'>
          <header className='buka__header'>
            <AppBar title='Buka' />
          </header>
          <main className='buka__container'>
            <form className='buka-cardnumber__form' method='GET'>
              <CardNumberInput
                id='cardnumber'
                name='cardNumber'
                className='buka-cardnumber__input'
                autoComplete='off'
                onChange={this.handleCardNumberChange}
                value={this.state.cardNumber} />
              <TestCardNumber onChange={this.testCardNumberChange} />
            </form>
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
