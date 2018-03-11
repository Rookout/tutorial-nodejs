//'use strict';
const rook = require('rookout/auto_start');

const express = require('express');
const app = express();
const logger = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');

const IndexRouter = require('./routes/index');
const TodosRouter = require('./routes/todo');

const Store = require('./utils/store');
// Initializing global Store as an in-memory database
global.Store = new Store();

// Initialize Logging
app.use(logger("combined"));

// Initialize CORS
app.use(cors());

// Initialize View Engine
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

// Initialize Parsers
app.use(bodyParser.json());

// Initialize Routes
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/', IndexRouter);
app.use('/todos', TodosRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    return res.send({statusCode: err.status || 500, error: true, message: err.message});
});

const start = () => {
    app.listen(config.port, () => {
        console.log(`Server Listening on http://localhost:${config.port}/`);
    });
}

module.exports.start = start;
