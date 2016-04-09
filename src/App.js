import React from 'react';
import bukovelAPI from './dataAccess/bukovelApi';
import CardNumberInput from './CardNumberInput';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      html: ''
    }
  }
  componentDidMount() {
    bukovelAPI
      .getCardBalance()
      .then(data => {
        this.setState({
          html: JSON.stringify(data, null, '\t')
        });
      })
  }
  render() {
    return (
      <div>
        <CardNumberInput/>
        <pre>{this.state.html}</pre>
      </div>
    );
  }
}