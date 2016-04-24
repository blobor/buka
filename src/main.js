import 'normalize.css';
import './styles/styles.scss';

import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

injectTapEventPlugin();

ReactDOM.render(<App/>, document.getElementById('buka-app'));