var sys = require('sys')
  , events = require('events')
  , xmpp = require('simple-xmpp');

/** @module XMPP */

/**
 * Construction function.
 * Adapter between XmppClient and the rest of the system. Adapts XMPP events to compatible EventEmitter events.
 *
 * @constructor
 * @param {Function} app instance of Express application
 * @param {Connection} db database connection
 */

function XmppAdapter(xmppUser) {
    if(false === (this instanceof XmppAdapter)) {
        return new XmppAdapter();
    }

    this.xmppUser = xmppUser;
    this.xmppClient = new xmpp.SimpleXMPP();
    events.EventEmitter.call(this);
}
sys.inherits(XmppAdapter, events.EventEmitter);

/**
 * Connects to jabber server.
 *
 * @param {bool} register if true, then user is registered before connection.
 */
XmppAdapter.prototype.createConnection = function(register) {
  var config = {
    jid: 'aidbot.'+ this.xmppUser +'@jabber.c3po.cz',
    password: 'aidbot.'+ this.xmppUser,
    register: register
  };
  this.xmppClient.connect(config);

  var self = this;
  this.xmppClient.on('chat', function(from, message) {
    self.emit('xmppMessage', message);
  });
}

/**
 * Sends a message to operator.
 *
 * @param message
 */
XmppAdapter.prototype.sendMessage = function(message)
{
  this.xmppClient.send('john.doe@jabber.c3po.cz', message);
};

exports.XmppAdapter = XmppAdapter;
