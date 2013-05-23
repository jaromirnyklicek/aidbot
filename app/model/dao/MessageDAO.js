var entities = require('../entities/Entities')
  , DateTime = require('../DateTime.js');

var MessageDAO;
MessageDAO = function(db)
{
  this.db = db;
}

MessageDAO.prototype.new = function(author, text)
{
  var message = new entities.Message();
  message
    .setDate(new DateTime().toString())
    .setAuthor(author)
    .setText(text);

  return message;
}

exports.MessageDAO = MessageDAO;
