var express = require('express')
  , app = express()
  , http = require('http').createServer(app)
  , config = require('./config')
  , ws = require('./socket');

http.listen(process.env.VCAP_APP_PORT || 8080);

config.configure(app);
var db = config.connectDb(app);

//controllery
var controllers = require('./app/controllers/controllers.js')
  , conversationController = new controllers.ConversationController(db)
  , userController = new controllers.UserController(db);

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


app.get('/api/users', function(req, res, next) {
  return userController.findAll(req, res, next);
});

app.get('/api/users/:id', function(req, res, next) {
  return userController.find(req, res, next);
});

app.put('/api/users/:id', function(req, res, next) {
  return userController.save(req, res, next);
});

ws.run(http, app, db);
