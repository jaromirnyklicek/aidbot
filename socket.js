/** @module SocketServer */

/**
 * Construction function.
 * Socket service.
 *
 * @constructor
 * @param {Function} http instance of HTTP server
 * @param {Function} app instance of Express application
 * @param {Connection} db database connection
 */

var socket = function(http, app, db) {
  var xmpp = require('./xmpp-adapter')
    , io = require('socket.io').listen(http)
    , dao = require('./app/model/dao/DAOs')
    , entities = require('./app/model/entities/Entities')
    , qbox = require('qbox')
    , conversationDAO = new dao.ConversationDAO(db)
    , messageDAO = new dao.MessageDAO(db);

  app.configure('production', function() {
    io.configure(function () {
      io.set("transports", ["xhr-polling"]);
      io.set("polling duration", 20);
    });
  })

  io.sockets.on('connection', function (socket) {
    socket.on('sendMessage', function (data) {
      console.log('ZACHYCEN: sendMessage');
      socket.xmpp.sendMessage(data);

      var message = messageDAO.new(entities.Message.AUTHOR_USER, data);
      socket.conversation.addMessage(message);

      var conversationDAO = new dao.ConversationDAO(db);
      conversationDAO.persist(socket.conversation);
    });

    socket.on('openConversation', function(conversationId) {
      console.log('ZACHYCEN: openConversation, ID = %s', conversationId);
      var $ = qbox.create();

      var xmppRegister = true;
      var conversation;

      if (conversationId) {
        conversationDAO.find(conversationId, function(result) {
          if (result !== false) {
            xmppRegister = false;
            conversation = result;
          } else {
            conversation = conversationDAO.new();
          }
          $.start();
        });
      } else {
        conversation = conversationDAO.new();
        $.start();
      }


      $.ready(function() {
        conversationDAO.persist(conversation, function(conversationId) {
          console.log(conversationId);
          conversation.setId(conversationId);
          socket.emit('conversationOpened', conversation.getId(), conversation.getMessages());
          console.log('VYVOLAN: conversationOpened, ID = %s', conversation.getId());

          socket.conversation = conversation;
          socket.xmpp = new xmpp.XmppAdapter(conversation.getId());
          socket.xmpp.createConnection(xmppRegister);

          socket.xmpp.on('xmppMessage', function(messageText) {
            console.log('ZACHYCEN: xmppMessage ' + messageText);
            var message = messageDAO.new(entities.Message.AUTHOR_OP, messageText);
            conversation.addMessage(message);
            conversationDAO.persist(conversation);
            socket.emit('sendMessage', 'Operátor -> ' + conversation.getId(), messageText);
            console.log('VYVOLAN: sendMessage ' + messageText);
          });
        });
      });

      socket.on('disconnect', function(){
        //odpojit xmpp usera
      });
    });
  });
};

module.exports = socket;

