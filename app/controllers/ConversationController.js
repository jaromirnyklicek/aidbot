var dao = require('../model/dao/DAOs.js');

var ConversationController;
ConversationController = function(db)
{
  this.db = db;
  this.conversations = new dao.ConversationDAO(db);
}

ConversationController.prototype.findAll = function(req, res, next){
  this.conversations.findAll(null, function(result) {
    res.json(result);
  });
};

ConversationController.prototype.find = function(req, res, next){
  this.conversations.find(req.params.id, function(result) {
    if(result) {
      res.json(result);
    } else {
      res.status(404).send('404 Not Found');
    }
  });
};

ConversationController.prototype.update = function(req, res, next){
  var self = this;
  this.conversations.find(req.params.id, function(result) {
    var conversation = result;
    conversation.setNote(req.body.note);
    self.conversations.persist(conversation, function() {
      res.json(conversation);
    });
  })
};

exports.ConversationController = ConversationController;


