var Settings;

/**
 * Represents a set of application settings.
 *
 * @constructor
 */
Settings = function()
{
  this.id = 1;
  this.offlineMessage = null;
  this.cookieExpiration = null;
  this.url = null;
}

/**
 * Returns set's id.
 *
 * @returns {Number}
 */
Settings.prototype.getId = function()
{
  return this.id;
}

/**
 * Returns offline message.
 *
 * @returns {String}
 */
Settings.prototype.getOfflineMessage = function()
{
  return this.offlineMessage;
}

/**
 * Returns cookie expiration in days.
 *
 * @returns {Number}
 */
Settings.prototype.getCookieExpiration = function()
{
  return this.cookieExpiration;
}

/**
 * Returns URL of Aidbot installation.
 *
 * @returns {String}
 */
Settings.prototype.getUrl = function()
{
  return this.url;
}


/**
 * Sets offline message.
 *
 * @param {String} value Text of offline message.
 * @returns {Message}
 */
Settings.prototype.setOfflineMessage = function(value)
{
  this.offlineMessage = value;
  return this;
}

/**
 * Sets cookie expiration
 *
 * @param {Number} value Cookie expiration in days.
 * @returns {Message}
 */
Settings.prototype.setCookieExpiration = function(value)
{
  this.cookieExpiration = value;
  return this;
}

/**
 * Sets URL.
 *
 * @param {String} value
 * @returns {Message}
 */
Settings.prototype.setUrl = function(value)
{
  this.url = value;
  return this;
}

exports.Settings = Settings;
