'use strict';

require('babel/register');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('./logger');
var compression = require('compression');
var morgan = require('morgan');
var app = express();
var ApiApp = require('./ApiApp');

app.use(morgan(app.get('env') === 'production' ? 'combined' : 'dev', { "stream": logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

// static files with cache buster
var publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.use('/api', ApiApp);

// error pages
app.use(function (err, req, res, next) {
  res.status(500);
  res.send('<pre>' + err.stack + '</pre>');
});

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), function () {
  console.log('Express ' + app.get('env') + ' server listening on port ' + this.address().port);
});
