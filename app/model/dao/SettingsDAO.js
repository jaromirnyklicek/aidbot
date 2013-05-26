var entities = require('../entities/Entities');

var SettingsDAO;

/**
 * Data access object for settings.
 *
 * @param {Connection} db instance of connection to data storage.
 * @constructor
 */
SettingsDAO = function(db)
{
  this.db = db;
}

/**
 * Loads the set of application settings from storage and pass it
 * to the given callback as an argument.
 *
 * @param {Function} callback
 */
SettingsDAO.prototype.load = function(callback)
{
  this.db.query('SELECT * FROM settings WHERE id = 1', function(err, result) {
    if (err) {
      throw err;
    }

    var row = result[0];
    var settings = new entities.Settings();
    settings.setOfflineMessage(row.offlineMessage)
            .setCookieExpiration(row.cookieExpiration)
            .setUrl(row.url);

    if(callback) callback(settings);
  });
}

/**
 * Persist given settings to storage.
 * Executes callback with the persisted settings as parameter.
 *
 * @param {Settings} settings
 * @param {Function} callback
 */
SettingsDAO.prototype.persist = function(settings, callback)
{
  this.db.query('UPDATE settings SET ? WHERE id = 1', settings, function(err, result) {
    if(err) {
      throw err;
    } else {
      if(callback) callback();
    }
  });
}

exports.SettingsDAO = SettingsDAO;
