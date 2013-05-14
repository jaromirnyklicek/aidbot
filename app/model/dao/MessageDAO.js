var entities = require('../entities/Entities');

var MessageDAO;
MessageDAO = function(db)
{
  this.db = db;
}

MessageDAO.prototype.new = function(author, text)
{
  var message = new entities.Message();
  message
    .setDate(new Date())
    .setAuthor(author)
    .setText(text);

  return message;
}

exports.MessageDAO = MessageDAO;
