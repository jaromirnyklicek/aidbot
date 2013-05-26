var entities = require('../entities/Entities')
  , DateTime = require('../DateTime.js');

var ConversationDAO;

/**
 * Data access object for conversations.
 *
 * @param {Connection} db instance of connection to data storage.
 * @constructor
 */
ConversationDAO = function(db)
{
  this.db = db;
}

/**
 * Creates new Conversation entity with prefilled fields.
 *
 * @returns {Conversation}
 */
ConversationDAO.prototype.new = function()
{
  var conversation = new entities.Conversation();
  conversation
    .setDate(new DateTime().toString())
    .setOperator(1);

  return conversation;
}

/**
 * Finds a Conversation according to given conversationId.
 * At the end, given callback is executed with the result of find as argument.
 *
 * @param {Number} conversationId
 * @param {Function} callback
 */
ConversationDAO.prototype.find = function(conversationId, callback)
{
  var self = this;
  this.db.query('SELECT c.*, u.name AS operatorName FROM conversations c LEFT JOIN users u ON u.id = c.operator WHERE c.id = ?',
    conversationId, function(err, result) {

    if (err) {
      throw err;
    }

    if (result.length > 0) {
      var row = result[0];
      var conversation = new entities.Conversation();
      conversation
        .setDate(new DateTime(row.date).toString())
        .setOperator(row.operator)
        .setOperatorName(row.operatorName)
        .setId(row.id)
        .setNote(row.note);

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
                .setDate(new DateTime(result[i].date).toString())
                .setAuthor(result[i].author);
              conversation.addMessage(message);
            }
          }
          if(callback) callback(conversation);
      });
    } else {
      if(callback) callback(false);
    }
  });
}

/**
 * Finds all conversations.
 * If operator is defined then result includes only conversations owned by given operator.
 *
 * @param {Number} operator
 * @param {Function} callback
 */
ConversationDAO.prototype.findAll = function(operator, callback)
{
  var self = this;
  var sql = 'SELECT c.*, u.name AS operatorName FROM conversations c LEFT JOIN users u ON u.id = c.operator ';
  if(operator != null) {
    sql += 'WHERE c.operator = ' + operator;
  }

  this.db.query(sql, function(err, result) {
    if (err) {
      throw err;
    }

    if (result.length > 0) {
      var conversationRows = result;
      var conversations = [];

      self.db.query('SELECT * FROM messages ORDER BY date ASC', function(err, result) {
        if (err) {
          throw err;
        }

        conversationRows.forEach(function(conversationRow) {
          var conversation = new entities.Conversation();
          conversation
            .setDate(new DateTime(conversationRow.date).toString())
            .setOperator(conversationRow.operator)
            .setOperatorName(conversationRow.operatorName)
            .setId(conversationRow.id)
            .setNote(conversationRow.note);

          if (result.length > 0) {
            var filteredMessages = result.filter(function(messageRow) {
              return messageRow.conversation === conversation.getId();
            });

            filteredMessages.forEach(function(messageRow) {
                var message = new entities.Message();
                message
                  .setId(messageRow.id)
                  .setText(messageRow.text)
                  .setConversation(messageRow.conversation)
                  .setDate(new DateTime(messageRow.date).toString())
                  .setAuthor(messageRow.author);

                conversation.addMessage(message);
            });
          }

          conversations.push(conversation);
        });

        if(callback) callback(conversations);
      });
    } else {
      if(callback) callback(false);
    }
  });
}

/**
 * Persist given conversation to storage.
 * Executes callback with the persisted conversation as parameter.
 *
 * @param {Conversation} conversation
 * @param {Function} callback
 */
ConversationDAO.prototype.persist = function(conversation, callback)
{
  var conversationData = {
    date: conversation.getDate(),
    operator: conversation.getOperator(),
    note: conversation.getNote()
  }

  if (conversation.getId() === null) {
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
      if(messages[i].getConversation() === null) {
        messages[i].setConversation(conversation.getId());

        var messageData = {
          conversation: messages[i].getConversation(),
          author: messages[i].getAuthor(),
          date: messages[i].getDate(),
          text: messages[i].getText()
        };

        this.db.query('INSERT INTO messages SET ?', messageData, function(err, result) {
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
        if(callback) callback(conversation.getId());
      }
    });
  }
}

exports.ConversationDAO = ConversationDAO;
