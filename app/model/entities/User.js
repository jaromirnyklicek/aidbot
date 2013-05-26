var User;

/**
 * Represents a user.
 *
 * @constructor
 */
User = function()
{
  this.id = null;
  this.name = null;
  this.username = null;
  this.password = null;
  this.role = null;
}

/**
 * Constant. Identification of user's role - administrator.
 *
 * @type {Number}
 */
User.ROLE_ADMIN = 1;

/**
 * Constant. Identification of user's role - operator.
 *
 * @type {Number}
 */
User.ROLE_OP = 2;

User.prototype.getId = function()
{
  return this.id;
}

/**
 * Name getter.
 *
 * @returns {String}
 */
User.prototype.getName = function()
{
  return this.name;
}

/**
 * Username getter.
 *
 * @returns {String}
 */
User.prototype.getUsername = function()
{
  return this.username;
}

/**
 * Password getter. Returns hashed password.
 *
 * @returns {String}
 */
User.prototype.getPassword = function()
{
  return this.password;
}

/**
 * Role getter.
 *
 * @returns {Number}
 */
User.prototype.getRole = function()
{
  return this.role;
}


/**
 * Sets user id.
 *
 * @param {Number} value
 * @returns {User}
 */
User.prototype.setId = function(value)
{
  this.id = value;
  return this;
}

/**
 * Sets user's real name.
 *
 * @param {String} value
 * @returns {User}
 */
User.prototype.setName = function(value)
{
  this.name = value;
  return this;
}

/**
 * Sets username.
 *
 * @param {String} value
 * @returns {User}
 */
User.prototype.setUsername = function(value)
{
  this.username = value;
  return this;
}

/**
 * Sets password.
 *
 * @param {String} value
 * @returns {User}
 */
User.prototype.setPassword = function(value)
{
  this.password = value;
  return this;
}

/**
 * Sets user's role.
 * @param {Number} value Numeric representation of role. User.ROLE_ADMIN or User.ROLE_OP
 * @returns {User}
 */
User.prototype.setRole = function(value)
{
  this.role = value;
  return this;
}

exports.User = User;
