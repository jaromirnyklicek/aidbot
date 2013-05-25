var entities = require('../entities/Entities');

var SettingsDAO;
SettingsDAO = function(db)
{
  this.db = db;
}

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
