var entities = require('../entities/Entities');

var ConversationDAO;
ConversationDAO = function(db)
{
  this.db = db;
}

ConversationDAO.prototype.new = function()
{
  var conversation = new entities.Conversation();
  conversation
    .setDate(new Date())
    .setOperator(1);

  return conversation;
}

ConversationDAO.prototype.find = function(conversationId, callback)
{
  //this.db.connect();
  var self = this;
  this.db.query('SELECT * FROM conversations WHERE id = ?', conversationId, function(err, result) {
    if (err) {
      throw err;
    }

    if (result.length > 0) {
      var row = result[0];
      var conversation = new entities.Conversation();
      conversation
        .setDate(new Date())
        .setOperator(row.operator)
        .setId(row.id);

      self.db.query('SELECT * FROM messages WHERE conversation = ? ORDER BY date ASC',
        conversationId, function(err, result) {
          if (err) {
            throw err;
          }

          if (result.length > 0) {
            for (var i in result) {
              var message = new entities.Message();
              message
                .setId(result[i].id)
                .setText(result[i].text)
                .setConversation(result[i].conversation)
                .setDate(result[i].date)
                .setAuthor(result[i].author);
              conversation.addMessage(message);
            }
          }
          //self.db.end();
          if(callback) callback(conversation);
      });
    } else {
      if(callback) callback(false);
    }
  });
}

ConversationDAO.prototype.persist = function(conversation, callback)
{
  var conversationData = {
    date: conversation.getDate(),
    operator: conversation.getOperator()
  }

  //this.db.connect();
  if (conversation.getId() === undefined) {
    this.db.query('INSERT INTO conversations SET ?', conversationData, function(err, result) {
      if(err) {
        throw err;
      } else {
        if(callback) callback(result.insertId);
      }
    });
  } else {
    var messages = conversation.getMessages();
    for (var i in messages) {
      if(messages[i].getConversation() === undefined) {
        messages[i].setConversation(conversation.getId());
        this.db.query('INSERT INTO messages SET ?', messages[i].data, function(err, result) {
          if(err) {
            throw err;
          }
        });
      }
    }

    this.db.query('UPDATE conversations SET ? WHERE id = ?', [conversationData, conversation.getId()], function(err, result) {
      if(err) {
        throw err;
      } else {
        //self.db.end();
        if(callback) callback(conversation.getId());
      }
    });
  }
}

exports.ConversationDAO = ConversationDAO;
