var dao = require('../model/dao/DAOs.js')
  , qbox = require('qbox');

var UserController;
UserController = function(db)
{
  this.db = db;
  this.users = new dao.UserDAO(db);
}

UserController.prototype.findAll = function(req, res, next){
  this.users.findAll(function(users) {
    users.forEach(function(user) {
      user.setPassword(null);
    })
    res.json(users);
  });
};

UserController.prototype.find = function(req, res, next){
  this.users.find(req.params.id, function(user) {
    if(user) {
      user.setPassword(null);
      res.json(user);
    } else {
      res.status(404).send('404 Not Found');
    }
  });
};

UserController.prototype.save = function(req, res, next){
  var self = this
    , user
    , $ = qbox.create();

  if(req.params.id !== undefined) {
    this.users.find(req.params.id, function(result) {
      user = result;
      $.start();
    })
  } else {
    user = this.users.new();
    user.setUsername(req.body.username);
    $.start();
  }

  $.ready(function() {
    if(req.body.password !== null) {
      user.setPassword(req.body.password);
    }
    user.setName(req.body.name);
    user.setRole(req.body.role);
    self.users.persist(user, function(result) {
      user.setId(result);
      user.setPassword(null);
      res.json(user);
    });
  });
};



exports.UserController = UserController;


