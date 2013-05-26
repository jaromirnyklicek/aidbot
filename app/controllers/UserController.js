var dao = require('../model/dao/DAOs.js')
  , qbox = require('qbox')
  , entities = require('../model/Entities/Entities.js');

var UserController;

/**
 * REST API - User controller. Allows user to manage users from client app through REST API.
 * @param {Connection} db
 * @constructor
 */
UserController = function(db)
{
  this.db = db;
  this.users = new dao.UserDAO(db);
}

/**
 * GET /api/users
 * For more information see web service documentation.
 *
 * @param req
 * @param res
 * @param next
 */
UserController.prototype.findAll = function(req, res, next){
  this.users.findAll(function(users) {
    users.forEach(function(user) {
      user.setPassword(null);
    })
    if(req.session.role == entities.User.ROLE_ADMIN) {
      res.json(users);
    } else {
      res.status(403).send('403 Forbidden');
    }
  });
};

/**
 * GET /api/users/:id
 * For more information see web service documentation.
 *
 * @param req
 * @param res
 * @param next
 */
UserController.prototype.find = function(req, res, next){
  this.users.find(req.params.id, function(user) {
    if(user) {
      user.setPassword(null);
      if(req.session.role == entities.User.ROLE_ADMIN
        || (req.session.role == entities.User.ROLE_OP && user.getId() == req.session.userId)) {
        res.json(user);
      } else {
        res.status(403).send('403 Forbidden');
      }
    } else {
      res.status(404).send('404 Not Found');
    }
  });
};

/**
 * POST /api/users
 * PUT  /api/users/:id
 * For more information see web service documentation.
 *
 * @param req
 * @param res
 * @param next
 */
UserController.prototype.save = function(req, res, next){
  var self = this
    , user
    , $ = qbox.create();

  if(req.params.id !== undefined) {
    this.users.find(req.params.id, function(result) {
      user = result;
      user.setUsername(req.body.username);
      user.setName(req.body.name);
      user.setRole(req.body.role);
      if (req.body.password !== null) {
        user.setPassword(req.body.password);
      } else {
        user.setPassword(null);
      }
      $.start();
    })
  } else {
    user = this.users.new();
    user.setUsername(req.query.username);
    user.setName(req.query.name);
    user.setRole(req.query.role);
    if (req.query.password !== null) {
      user.setPassword(req.query.password);
    } else {
      user.setPassword(null);
    }
    $.start();
  }

  $.ready(function() {
    self.users.persist(user, function(result) {
      user.setId(result);
      user.setPassword(null);
      res.json(user);
    });
  });
};



exports.UserController = UserController;


