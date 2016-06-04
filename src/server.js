import path from 'path';
import pify from 'pify';
import fs from 'fs';

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import enforce from 'express-sslify';
import isNil from 'lodash.isnil';
import handlebars from 'handlebars';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import App from './app/App.js';
import configureStore from './app/store/configureStore';

const fsPromisify = pify(fs);

const app = express();

// configure middlewares
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({
    // app is behind Heroku load balancer
    trustProtoHeader: true
  }));
}
app.use(helmet());
app.use(compression());

// cache compiled index page
let indexTemplate = null;

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const ROOT = '../';

const port = process.env.PORT || 3333;
const staticFolder = path.resolve(__dirname, ROOT, 'dist');

app.get('/', (req, res) => {
  getIndexTemplate()
    .then(template => {
      global.navigator.userAgent = req.headers['user-agent'];
      const store = configureStore({
        skipass: req.query
      });
      const data = {
        content: renderToString(
          <Provider store={store}>
            <App />
          </Provider>
        )
      };
      res.send(template(data));
    });
});
app.use(express.static(staticFolder));

app.listen(port, function() {
  console.log(`Express server listening on port ${port}`); // eslint-disable-line no-console
  console.log(`env = ${app.get('env')}`); // eslint-disable-line no-console
  console.log(`__dirname = ${__dirname}`); // eslint-disable-line no-console
  console.log(`staticFolder = ${staticFolder}`); // eslint-disable-line no-console
});

function getIndexTemplate() {
  if (isNil(indexTemplate)) {
    return fsPromisify
      .readFile(path.resolve(staticFolder, 'index.html'), 'utf8')
      .then(data => {
        indexTemplate = handlebars.compile(data);
        return indexTemplate;
      });
  } else {
    return Promise.resolve(indexTemplate);
  }
}
