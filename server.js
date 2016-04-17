const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;

app.set('port', port);
app.use(express.static(`${__dirname}/dist`));

app.listen(port, function() {
  console.log(`Express server listening on port ${port}`);
  console.log(`env = ${app.get('env')}`);
  console.log(`__dirname = ${__dirname}`);
});
