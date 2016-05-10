import PATH from 'path';
import express from 'express';

const app = express();

const ROOT = '../';

const port = process.env.PORT || 3333;
const staticFolder = PATH.resolve(__dirname, ROOT, 'dist');

// don't send "X-Powered By" header
app.disable('x-powered-by');
app.use(express.static(staticFolder));

app.listen(port, function() {
  console.log(`Express server listening on port ${port}`); // eslint-disable-line no-console
  console.log(`env = ${app.get('env')}`); // eslint-disable-line no-console
  console.log(`__dirname = ${__dirname}`); // eslint-disable-line no-console
  console.log(`staticFolder = ${staticFolder}`); // eslint-disable-line no-console
});
