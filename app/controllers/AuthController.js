var dao = require('../model/dao/DAOs.js')
  , qbox = require('qbox')
  , crypto = require('crypto');

var AuthController;
AuthController = function(db)
{
  this.db = db;
  this.users = new dao.UserDAO(db);
}

AuthController.prototype.login = function(req, res, next)
{
  var username = req.body.username
    , password = req.body.password
    , response = {message: 'Successfully logged in.'};

  this.users.findByUsername(username, function(user) {

    if (user) {
      var md5sum = crypto.createHash('md5').update(password);
      var hashedPassword = md5sum.digest('hex');

      if (hashedPassword == user.password) {
        req.session.authenticated = true;
        res.cookie('r', user.getRole(), {path: '/admin', httpOnly: false});
        res.cookie('n', user.getName(), {path: '/admin', httpOnly: false});
        res.cookie('i', user.getId(), {path: '/admin', httpOnly: false});
        response.role = user.getRole();
        response.name = user.getName();
        response.userid = user.getId();
        res.status(200);
      } else {
        response.message = 'Wrong password, try again.';
        res.status(403);
      }
    } else {
      response.message = 'User does not exists.';
      res.status(403);
    }

    res.json(response);
  });
}

AuthController.prototype.logout = function(req, res, next)
{
  req.session.authenticated = false;
  res.clearCookie('r', {path: '/admin'});
  res.clearCookie('n', {path: '/admin'});
  res.clearCookie('i', {path: '/admin'});
  res.status(200).send('Logged out');
}

exports.AuthController = AuthController;
