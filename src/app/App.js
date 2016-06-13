import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { changeCardNumber } from './actions/skipass';
import Header from './components/Header';
import Footer from './components/Footer';
import CardNumberInput from './containers/CardNumberInputContainer';
import TestCardNumber from './components/TestCardNumber';
import SkipassInfo from './components/SkipassInfo';

import { version } from '../../package.json';

import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme();

const renderTable = (skipass) => {
  if (skipass.isFetching) {
    return <CircularProgress size={1.5} />;
  } else if (!isEmpty(skipass.lifts)) {
    return <SkipassInfo skipass={skipass} />;
  }
};

const App = ({ skipass, testCardNumberChange }) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className='buka'>
        <Header version={version} />
        <main className='buka__container'>
          <form className='buka-cardnumber__form' method='GET'>
            <CardNumberInput
              id='cardnumber'
              name='cardNumber'
              className='buka-cardnumber__input'
              autoComplete='off' />
            <TestCardNumber onChange={testCardNumberChange} />
          </form>
          {renderTable(skipass)}
        </main>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  skipass: React.PropTypes.object,
  testCardNumberChange: React.PropTypes.func
};

const mapStateToProps = state => {
  return {
    skipass: {
      ...state.skipass
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    testCardNumberChange: (event, value) => {
      dispatch(changeCardNumber(value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
