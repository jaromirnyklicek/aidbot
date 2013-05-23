var express = require('express')
  , app = express()
  , http = require('http').createServer(app)
  , config = require('./config')
  , ws = require('./socket');

http.listen(process.env.VCAP_APP_PORT || 8080);

config.configure(app);
var db = config.connectDb(app);

//controllery
var controllers = require('./app/controllers/controllers.js');
var conversationController = new controllers.ConversationController(db);

//RESTful Web API
app.get('/api/conversations', function(req, res, next) {
  return conversationController.findAll(req, res, next);
});

app.get('/api/conversations/:id', function(req, res, next) {
  return conversationController.find(req, res, next);
});

app.put('/api/conversations/:id', function(req, res, next) {
  return conversationController.update(req, res, next);
});


ws.run(http, app, db);
