var express = require('express');
/** @module REST */

/**
 * Construction function.
 * Wraps complete Aidbot's RESTful webservice and authentication and authorization mechanism.
 *
 * @constructor
 * @param {Function} app instance of Express application
 * @param {Connection} db database connection
 */
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
    , userController = new controllers.UserController(db)
    , authController = new controllers.AuthController(db)
    , settingsController = new controllers.SettingsController(db);

  /**
   * User authentication checking middleware.
   *
   * @param req
   * @param res
   * @param next
   */
  function checkAuth(req, res, next) {
    if (req.session.authenticated === true) {
      next();
    } else {
      res.status(401).send('401 Unauthorized');
    }
  }

  // User login & logout
  app.post('/auth/login', function (req, res, next) {
    return authController.login(req, res, next);
  });

  app.post('/auth/logout', function (req, res, next) {
    return authController.logout(req, res, next);
  });

  // Check API authentication
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

  app.post('/api/users', function (req, res, next) {
    return userController.save(req, res, next);
  });

  app.put('/api/users/:id', function (req, res, next) {
    return userController.save(req, res, next);
  });


  app.get('/api/settings', function (req, res, next) {
    return settingsController.load(req, res, next);
  });

  app.put('/api/settings', function (req, res, next) {
    return settingsController.save(req, res, next);
  });
}

module.exports = api;

