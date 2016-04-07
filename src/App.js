import React from 'react';
import bukovelAPI from './dataAccess/bukovelApi';

class App extends React.Component {
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
    return <pre>{this.state.html}</pre>
  }
}

export default App