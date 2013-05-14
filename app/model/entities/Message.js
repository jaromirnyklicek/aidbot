var Message;
Message = function()
{
  this.data = {};
}

Message.AUTHOR_USER = 'user';
Message.AUTHOR_OP = 'op';


Message.prototype.getDate = function()
{
  return this.data.date;
}

Message.prototype.getId = function()
{
  return this.data.id;
}

Message.prototype.getConversation = function()
{
  return this.data.conversation;
}

Message.prototype.getText = function()
{
  return this.data.text;
}

Message.prototype.getAuthor = function()
{
  return this.data.author;
}

Message.prototype.setDate = function(value)
{
  this.data.date = value;
  return this;
}

Message.prototype.setId = function(value)
{
  this.data.id = value;
  return this;
}

Message.prototype.setConversation = function(value)
{
  this.data.conversation = value;
  return this;
}

Message.prototype.setText = function(value)
{
  this.data.text = value;
  return this;
}

Message.prototype.setAuthor = function(value)
{
  this.data.author = value;
  return this;
}

exports.Message = Message;
