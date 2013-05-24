var express = require('express');

var api = function (app, db) {
  //noinspection JSValidateTypes
  app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.cookieParser('1234BSJG.gjsRt'));
    app.use(express.cookieSession());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
  });

  //controllery
  var controllers = require('./app/controllers/controllers.js')
    , conversationController = new controllers.ConversationController(db)
    , userController = new controllers.UserController(db);

  function checkAuth(req, res, next) {
    console.log(req.session);
    if (req.session.authenticated === true) {
      next();
    } else {
      res.status(401).send('401 Unauthorized');
    }
  }

  app.all('/auth/login', function (req, res, next) {
    req.session.authenticated = true;
    res.status(200).send('Authorized');
  });

  app.all('/auth/logout', function (req, res, next) {
    req.session.authenticated = false;
    res.status(200).send('Logged out');
  });

  // Authentication
  app.all('/api/*', function (req, res, next) {
    checkAuth(req, res, next);
  });

  // RESTful Web API
  app.get('/api/conversations', function (req, res, next) {
    return conversationController.findAll(req, res, next);
  });

  app.get('/api/conversations/:id', function (req, res, next) {
    return conversationController.find(req, res, next);
  });

  app.put('/api/conversations/:id', function (req, res, next) {
    return conversationController.update(req, res, next);
  });


  app.get('/api/users', function (req, res, next) {
    return userController.findAll(req, res, next);
  });

  app.get('/api/users/:id', function (req, res, next) {
    return userController.find(req, res, next);
  });

  app.put('/api/users/:id', function (req, res, next) {
    return userController.save(req, res, next);
  });
}

module.exports = api;

