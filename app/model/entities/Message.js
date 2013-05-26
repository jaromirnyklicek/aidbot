var Message;

/**
 * Represents a conversation's message.
 * @constructor
 */
Message = function()
{
  this.id = null;
  this.conversation = null;
  this.date = null;
  this.author = null;
  this.text = null;
}

/**
 * Constant. Identification of message's author - customer.
 * @type {String}
 */
Message.AUTHOR_USER = 'user';

/**
 * Constant. Identification of message's author - operator.
 * @type {String}
 */
Message.AUTHOR_OP = 'op';

/**
 * Date getter.
 *
 * @returns {String} Date in UTC and ISO 8601 format.
 */
Message.prototype.getDate = function()
{
  return this.date;
}

/**
 * Id getter
 *
 * @returns {Number}
 */
Message.prototype.getId = function()
{
  return this.id;
}

/**
 * Conversation id getter.
 *
 * @returns {Number}
 */
Message.prototype.getConversation = function()
{
  return this.conversation;
}

/**
 * Message text getter
 *
 * @returns {String}
 */
Message.prototype.getText = function()
{
  return this.text;
}

/**
 * Author identification
 *
 * @returns {String} Message.AUTHOR_USER or Message.AUTHOR_OP
 */
Message.prototype.getAuthor = function()
{
  return this.author;
}


/**
 * Date setter
 *
 * @param {String} value Date in ISO 8601 format
 * @returns {Message}
 */
Message.prototype.setDate = function(value)
{
  this.date = value;
  return this;
}

/**
 * Id setter
 *
 * @param {Number} value
 * @returns {Message}
 */
Message.prototype.setId = function(value)
{
  this.id = value;
  return this;
}

/**
 * Conversation id setter
 *
 * @param {Number} value
 * @returns {Message}
 */
Message.prototype.setConversation = function(value)
{
  this.conversation = value;
  return this;
}

/**
 * Message text setter
 *
 * @param {String} value
 * @returns {Message}
 */
Message.prototype.setText = function(value)
{
  this.text = value;
  return this;
}

/**
 * Message text setter
 *
 * @param {String} value
 * @returns {Message}
 */
Message.prototype.setAuthor = function(value)
{
  this.author = value;
  return this;
}

exports.Message = Message;
