var dao = require('../model/dao/DAOs.js')
  , entities = require('../model/Entities/Entities.js');

var SettingsController;

/**
 * REST API - Settings controller. Allows user to manage app settings from client interface through REST API.
 * @param {Connection} db
 * @constructor
 */
SettingsController = function(db)
{
  this.db = db;
  this.settings = new dao.SettingsDAO(db);
}

/**
 * GET /api/settings
 * For more information see web service documentation.
 *
 * @param req
 * @param res
 * @param next
 */
SettingsController.prototype.load = function(req, res, next)
{
  this.settings.load(function(settings) {
    if(req.session.role == entities.User.ROLE_ADMIN) {
      res.json(settings);
    } else {
      res.status(403).send('403 Forbidden');
    }
  });
};

/**
 * PUT /api/settings
 * For more information see web service documentation.
 *
 * @param req
 * @param res
 * @param next
 */
SettingsController.prototype.save = function(req, res, next)
{
  var settings = new entities.Settings();
  settings.setOfflineMessage(req.body.offlineMessage)
          .setCookieExpiration(req.body.cookieExpiration)
          .setUrl(req.body.url);

  this.settings.persist(settings, function() {
    res.json(settings);
  });
};



exports.SettingsController = SettingsController;


