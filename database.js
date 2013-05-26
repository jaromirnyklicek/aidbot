var mysql = require('mysql');

/** @module Database */

/**
 * Database configuration and connection.
 *
 * @constructor
 * @param app instance of Express appliaction
 * @returns {Connection}
 */
var connectDb = function(app) {
  app.configure('development', function(){
    //noinspection JSValidateTypes
    app.set('db', {
      host: 'localhost',
      user: 'root',
      password: 'asdex',
      database: 'aidbot'
    });
  });
  app.configure('production', function(){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var dbService = env['mysql-5.1'][0]['credentials'];
    console.log(dbService);
    //noinspection JSValidateTypes
    app.set('db', {
      host: dbService.host,
      user: dbService.username,
      password: dbService.password,
      database: dbService.name
    });
  });

  var dbConfig = app.get('db');
  var connection = mysql.createConnection(dbConfig);
  return connection;
}

exports.connect = connectDb;
