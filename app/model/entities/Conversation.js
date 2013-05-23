var Conversation;
Conversation = function()
{
  this.id = null;
  this.date = null;
  this.operator = null;
  this.operatorName = null;
  this.note = null;
  this.messages = Array();
}

Conversation.prototype.getDate = function()
{
  return this.date;
}

Conversation.prototype.getOperator = function()
{
  return this.operator;
}

Conversation.prototype.getOperatorName = function()
{
  return this.operatorName;
}

Conversation.prototype.getId = function()
{
  return this.id;
}

Conversation.prototype.getMessages = function()
{
  return this.messages;
}

Conversation.prototype.getNote = function()
{
  return this.note;
}

Conversation.prototype.setDate = function(value)
{
  this.date = value;
  return this;
}

Conversation.prototype.setOperator = function(value)
{
  this.operator = value;
  return this;
}

Conversation.prototype.setOperatorName = function(value)
{
  this.operatorName = value;
  return this;
}

Conversation.prototype.setId = function(value)
{
  this.id = value;
  return this;
}

Conversation.prototype.setMessages = function(value)
{
  this.messages = value;
  return this;
}

Conversation.prototype.setNote = function(value)
{
  this.note = value;
  return this;
}

Conversation.prototype.addMessage = function(message)
{
  this.messages.push(message);
  return this;
}

exports.Conversation = Conversation;
