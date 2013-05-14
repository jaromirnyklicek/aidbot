var express = require('express')
  , app = express()
  , http = require('http').createServer(app)
  , config = require('./config')
  , ws = require('./socket');

http.listen(process.env.VCAP_APP_PORT || 8080);

config.configure(app);
var db = config.connectDb(app);

ws.run(http, app, db);
