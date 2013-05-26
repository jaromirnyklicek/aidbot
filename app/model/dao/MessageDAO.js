var entities = require('../entities/Entities')
  , DateTime = require('../DateTime.js');

var MessageDAO;

/**
 * Data access object for messages.
 *
 * @param {Connection} db instance of connection to data storage.
 * @constructor
 */
MessageDAO = function(db)
{
  this.db = db;
}

/**
 * Creates new message entity with prefilled fields.
 *
 * @returns {Message}
 */
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
