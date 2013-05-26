var entities = require('../entities/Entities')
  , crypto = require('crypto');

var UserDAO;

/**
 * Data access object for users.
 *
 * @param {Connection} db instance of connection to data storage.
 * @constructor
 */
UserDAO = function(db)
{
  this.db = db;
}

/**
 * Creates new User entity with prefilled fields.
 *
 * @param {Object} data
 * @returns {User}
 */
UserDAO.prototype.new = function(data)
{
  var user = new entities.User();

  if(data !== undefined) {
    user.setId(data.id);
    user.setPassword(data.password);
    user.setName(data.name);
    user.setUsername(data.username);
    user.setRole(data.role);
  }

  return user;
}

/**
 * Finds all users.
 *
 * @param {Function} callback
 */
UserDAO.prototype.findAll = function(callback)
{
  var self = this;
  this.db.query('SELECT * FROM users', function(err, result) {
    var users = [];

    if (err) {
      throw err;
    }

    if (result.length > 0) {
      result.forEach(function(row) {
        users.push(self.new(row));
      });
    }

    if(callback) callback(users);
  });
}

/**
 * Finds a User according to given userId.
 * At the end, given callback is executed with the result of find as argument.
 *
 * @param {Number} userId
 * @param {Function} callback
 */
UserDAO.prototype.find = function(userId, callback)
{
  var self = this;
  this.db.query('SELECT * FROM users WHERE id = ?', userId, function(err, result) {

      if (err) {
        throw err;
      }

      if (result.length > 0) {
        var user = self.new(result[0]);
        if(callback) callback(user);
      } else {
        if(callback) callback(false);
      }
    });
}

/**
 * Finds a User according to its username.
 * At the end, given callback is executed with the result of find as argument.
 *
 * @param {String} username
 * @param {Function} callback
 */
UserDAO.prototype.findByUsername = function(username, callback)
{
  var self = this;
  this.db.query('SELECT * FROM users WHERE username= ?', username, function(err, result) {

    if (err) {
      throw err;
    }

    if (result.length > 0) {
      var user = self.new(result[0]);
      if(callback) callback(user);
    } else {
      if(callback) callback(false);
    }
  });
}

/**
 * Persist given User to storage.
 * Executes callback with the persisted User as parameter.
 *
 * @param {User} user
 * @param {Function} callback
 */
UserDAO.prototype.persist = function(user, callback)
{
  var userData = {
    name: user.getName(),
    role: user.getRole()
  }

  if (user.getPassword() !== null) {
    var md5sum = crypto.createHash('md5').update(user.getPassword());
    userData.password = md5sum.digest('hex');
  }

  if (user.getId() === null) {
    userData.username = user.getUsername();
    this.db.query('INSERT INTO users SET ?', userData, function(err, result) {
      if(err) {
        throw err;
      } else {
        if(callback) callback(result.insertId);
      }
    });
  } else {
    this.db.query('UPDATE users SET ? WHERE id = ?', [userData, user.getId()], function(err, result) {
      if(err) {
        throw err;
      } else {
        if(callback) callback(user.getId());
      }
    });
  }
}

exports.UserDAO = UserDAO;
