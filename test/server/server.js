const express = require('express');
const app = express();
const routes = require('./routes');
const compression = require('compression');
const bodyParser = require('body-parser');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 2000;

app.use('/api', routes);

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`App listening on port ${port}`);
});

