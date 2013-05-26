var Conversation;

/**
 * Represents a conversation.
 *
 * @constructor
 */
Conversation = function()
{
  this.id = null;
  this.date = null;
  this.operator = null;
  this.operatorName = null;
  this.note = null;
  this.messages = Array();
}

/**
 * Returns conversation's date and time in UTC and ISO 8601 format.
 *
 * @returns {String}
 */
Conversation.prototype.getDate = function()
{
  return this.date;
}

/**
 * Operator id getter.
 *
 * @returns {Number}
 */
Conversation.prototype.getOperator = function()
{
  return this.operator;
}

/**
 * Returns full name of operator.
 *
 * @returns {String}
 */
Conversation.prototype.getOperatorName = function()
{
  return this.operatorName;
}

/**
 * Returns conversation's id.
 *
 * @returns {Number}
 */
Conversation.prototype.getId = function()
{
  return this.id;
}

/**
 * Returns array of Message objects.
 *
 * @returns {Array}
 */
Conversation.prototype.getMessages = function()
{
  return this.messages;
}

/**
 * Returns note added to conversation.
 *
 * @returns {String}
 */
Conversation.prototype.getNote = function()
{
  return this.note;
}


/**
 * Date setter.
 *
 * @param {String} value Date in UTC and ISO 8601 format.
 * @returns {Conversation}
 */
Conversation.prototype.setDate = function(value)
{
  this.date = value;
  return this;
}

/**
 * Operator setter.
 *
 * @param {Number} value Id of the operator.
 * @returns {Conversation}
 */
Conversation.prototype.setOperator = function(value)
{
  this.operator = value;
  return this;
}

/**
 * Operator name setter.
 *
 * @param {String} value Operator's full name.
 * @returns {Conversation}
 */
Conversation.prototype.setOperatorName = function(value)
{
  this.operatorName = value;
  return this;
}

/**
 * Id setter
 *
 * @param {Number} value
 * @returns {Conversation}
 */
Conversation.prototype.setId = function(value)
{
  this.id = value;
  return this;
}

/**
 * Note setter.
 *
 * @param {String} value
 * @returns {Conversation}
 */
Conversation.prototype.setNote = function(value)
{
  this.note = value;
  return this;
}

/**
 * Adds a message to conversation.
 *
 * @param {Message} message
 * @returns {Conversation}
 */
Conversation.prototype.addMessage = function(message)
{
  this.messages.push(message);
  return this;
}

exports.Conversation = Conversation;
