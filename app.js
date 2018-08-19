var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var cors = require('cors');
var multer  = require('multer');

var productRouter = require('./routes/products');
var orderRouter = require('./routes/orders');
// var authRouter = require('./routes/authentication');
// var samplingPoints = require('./routes/samplingPoints');
// var analyses = require('./routes/analyses');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/dist')));
app.use('/', express.static(path.join(__dirname, '/client/dist')));

app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
// app.use('/api/authentication', authRouter);
// app.use('/api/points', samplingPoints);
// app.use('/api/analyses', analyses);

console.log("dirname:",__dirname + '\\client\\dist\\index.html');
app.use(express.static(path.join(__dirname, '\\client\\dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '\\client\\dist\\index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

// mongoose.connect('mongodb://localhost/Capitu', { promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('connection successful'))
//   .catch((err) => console.error(err));


module.exports = app;