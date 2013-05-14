var Conversation;
Conversation = function()
{
  this.data = {};
  this.data.messages = Array();
}

Conversation.prototype.data = null;

Conversation.prototype.getDate = function()
{
  return this.data.date;
}

Conversation.prototype.getOperator = function()
{
  return this.data.operator;
}

Conversation.prototype.getId = function()
{
  return this.data.id;
}

Conversation.prototype.getMessages = function()
{
  return this.data.messages;
}

Conversation.prototype.setDate = function(value)
{
  this.data.date = value;
  return this;
}

Conversation.prototype.setOperator = function(value)
{
  this.data.operator = value;
  return this;
}

Conversation.prototype.setId = function(value)
{
  this.data.id = value;
  return this;
}

Conversation.prototype.setMessages = function(value)
{
  this.data.messages = value;
  return this;
}

Conversation.prototype.addMessage = function(message)
{
  this.data.messages.push(message);
  return this;
}

exports.Conversation = Conversation;
