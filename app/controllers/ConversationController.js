var dao = require('../model/dao/DAOs.js')
  , entities = require('../model/Entities/Entities.js');

var ConversationController;

/**
 * REST API - Conversation controller. Allows user to manage conversations from client app through REST API.
 * @param {Connection} db
 * @constructor
 */
ConversationController = function(db)
{
  this.db = db;
  this.conversations = new dao.ConversationDAO(db);
}

/**
 * GET /api/conversations
 * For more information see web service documentation.
 *
 * @param req
 * @param res
 * @param next
 */
ConversationController.prototype.findAll = function(req, res, next){
  var user = null;
  if (req.session.role == entities.User.ROLE_OP) {
    user = req.session.userId;
  }
  this.conversations.findAll(user, function(result) {
    res.json(result);
  });
};

/**
 * GET /api/conversations/:id
 * For more information see web service documentation.
 *
 * @param req
 * @param res
 * @param next
 */
ConversationController.prototype.find = function(req, res, next){
  this.conversations.find(req.params.id, function(result) {
    if(result) {
      if(req.session.role == entities.User.ROLE_ADMIN
        || (req.session.role == entities.User.ROLE_OP && result.getOperator() == req.session.userId)) {
        res.json(result);
      } else {
        res.status(403).send('403 Forbidden');
      }
    } else {
      res.status(404).send('404 Not Found');
    }
  });
};

/**
 * PUT /api/conversations/:id
 * For more information see web service documentation.
 *
 * @param req
 * @param res
 * @param next
 */
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


