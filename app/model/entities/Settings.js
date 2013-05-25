var Settings;
Settings = function()
{
  this.id = 1;
  this.offlineMessage = null;
  this.cookieExpiration = null;
  this.url = null;
}

Settings.prototype.getId = function()
{
  return this.id;
}

Settings.prototype.getOfflineMessage = function()
{
  return this.offlineMessage;
}

Settings.prototype.getCookieExpiration = function()
{
  return this.cookieExpiration;
}

Settings.prototype.getUrl = function()
{
  return this.url;
}




Settings.prototype.setOfflineMessage = function(value)
{
  this.offlineMessage = value;
  return this;
}

Settings.prototype.setCookieExpiration = function(value)
{
  this.cookieExpiration = value;
  return this;
}

Settings.prototype.setUrl = function(value)
{
  this.url = value;
  return this;
}

exports.Settings = Settings;
