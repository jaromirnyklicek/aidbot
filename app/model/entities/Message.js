var Message;
Message = function()
{
  this.id = null;
  this.conversation = null;
  this.date = null;
  this.author = null;
  this.text = null;
}

Message.AUTHOR_USER = 'user';
Message.AUTHOR_OP = 'op';


Message.prototype.getDate = function()
{
  return this.date;
}

Message.prototype.getId = function()
{
  return this.id;
}

Message.prototype.getConversation = function()
{
  return this.conversation;
}

Message.prototype.getText = function()
{
  return this.text;
}

Message.prototype.getAuthor = function()
{
  return this.author;
}

Message.prototype.setDate = function(value)
{
  this.date = value;
  return this;
}

Message.prototype.setId = function(value)
{
  this.id = value;
  return this;
}

Message.prototype.setConversation = function(value)
{
  this.conversation = value;
  return this;
}

Message.prototype.setText = function(value)
{
  this.text = value;
  return this;
}

Message.prototype.setAuthor = function(value)
{
  this.author = value;
  return this;
}

exports.Message = Message;
