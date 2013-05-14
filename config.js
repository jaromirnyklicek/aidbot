var express = require('express')
  , app = express()
  , mysql = require('mysql');

var configure = function(app)
{
  //noinspection JSValidateTypes
  app.configure(function() {
      app.use(express.logger('dev'));
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(express.static(__dirname + '/public'));
      app.use(app.router);

      // routing
      app.get('/window', function (req, res) {
        res.sendfile(__dirname + '/public/window/index.html');
      });

      app.get('/admin', function (req, res) {
        res.sendfile(__dirname + '/public/admin/index.html');
      });
    })

    app.configure('development', function(){
      //noinspection JSValidateTypes
      app.set('db', {
        host: 'localhost',
        user: 'root',
        password: 'asdex',
        database: 'aidbot',
        timezone: 'UTC'
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
        database: dbService.name,
        timezone: 'UTC'
      });
    });
}

var connectDb = function(app) {
  var dbConfig = app.get('db');
  var connection = mysql.createConnection(dbConfig);
  return connection;
}

exports.configure = configure;
exports.connectDb = connectDb;
