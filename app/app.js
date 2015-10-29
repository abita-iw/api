'use strict';

require('babel/register');

var fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('./logger');
var compression = require('compression');
var morgan = require('morgan');
var app = express();
var ApiApp = require('./ApiApp');
var ServerRender = require('./server.jsx');
var https = require('https');

app.use(morgan(app.get('env') === 'production' ? 'combined' : 'dev', { "stream": logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

// static files with cache buster
var publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.use('/api', ApiApp);
app.use('/', ServerRender);

// error pages
app.use(function (err, req, res, next) {
  res.status(500);
  res.send('<pre>' + err.stack + '</pre>');
});

app.set('port', process.env.PORT || 5000);

var options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
};

https.createServer(options, app).listen(5000, function() {
  console.log('HTTPS ' + app.get('env') + ' server listening on port ' + this.address().port);
});
