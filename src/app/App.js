import React from 'react';
import isEmpty from 'lodash.isempty';
import { fetchSkipassData } from './actions/skipass';
import Header from './components/Header';
import Footer from './components/Footer';
import CardNumberInput from './containers/CardNumberInputContainer';
import TestCardNumber from './components/TestCardNumber';
import SkipassInfo from './components/SkipassInfo';
import CircularProgress from 'material-ui/CircularProgress';

import { version } from '../../package.json';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.muiTheme = getMuiTheme();
    this.store = context.store;

    this.store.subscribe(() => {
      this.setState(this.store.getState().skipass);
    });

    this.testCardNumberChange = this.testCardNumberChange.bind(this);
  }

  componentWillMount() {
    this.setState(this.store.getState().skipass);
  }

  testCardNumberChange(event, value) {
    this.store.dispatch(fetchSkipassData(value));
  }

  renderTable() {
    if (this.state.isFetching) {
      return <CircularProgress size={1.5} />;
    } else if (!isEmpty(this.state.lifts)) {
      return <SkipassInfo skipass={this.state} />;
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div className='buka'>
          <Header version={version} />
          <main className='buka__container'>
            <form className='buka-cardnumber__form' method='GET'>
              <CardNumberInput
                id='cardnumber'
                name='cardNumber'
                className='buka-cardnumber__input'
                autoComplete='off' />
              <TestCardNumber onChange={this.testCardNumberChange} />
            </form>
            {this.renderTable()}
          </main>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = { store: React.PropTypes.object };

export default App;
