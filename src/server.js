const rookout = require('rookout');
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');
const Router = require('./routes/router');
const Store = require('./utils/store');

// Enable Rookout
rookout.start();

// Initializing global Store as an in-memory database
global.Store = new Store();

// Initialize Logging
app.use(expressWinston.logger({ transports: [new winston.transports.Console()] }));

// Initialize CORS
app.use(cors());

// Initialize View Engine
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

// Initialize Parsers
app.use(bodyParser.json());

// Initialize Routes
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/', Router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  return res.send({ statusCode: err.status || 500, error: true, message: err.message });
});

const start = () => {
  app.listen(config.PORT, () => {
    console.log(`Server Listening on http://localhost:${config.PORT}/`); // eslint-disable-line no-console
  });
};

module.exports.start = start;
