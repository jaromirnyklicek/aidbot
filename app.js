var express = require('express')
  , app = express()
  , http = require('http').createServer(app)
  , rest = require('./api')
  , socket = require('./socket')
  , db = require('./database');

http.listen(process.env.VCAP_APP_PORT || 8080);

var dbConnection = db.connect(app);

rest(app, dbConnection);
socket(http, app, dbConnection);
