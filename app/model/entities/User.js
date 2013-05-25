var User;
User = function()
{
  this.id = null;
  this.name = null;
  this.username = null;
  this.password = null;
  this.role = null;
}

User.ROLE_ADMIN = 1;
User.ROLE_OP = 2;

User.prototype.getId = function()
{
  return this.id;
}

User.prototype.getName = function()
{
  return this.name;
}

User.prototype.getUsername = function()
{
  return this.username;
}

User.prototype.getPassword = function()
{
  return this.password;
}

User.prototype.getRole = function()
{
  return this.role;
}





User.prototype.setId = function(value)
{
  this.id = value;
  return this;
}

User.prototype.setName = function(value)
{
  this.name = value;
  return this;
}

User.prototype.setUsername = function(value)
{
  this.username = value;
  return this;
}

User.prototype.setPassword = function(value)
{
  this.password = value;
  return this;
}

User.prototype.setRole = function(value)
{
  this.role = value;
  return this;
}

exports.User = User;
