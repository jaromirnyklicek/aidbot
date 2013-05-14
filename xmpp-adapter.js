var sys = require('sys')
  , events = require('events')
  , xmpp = require('simple-xmpp');

function XmppAdapter(xmppUser) {
    if(false === (this instanceof XmppAdapter)) {
        return new XmppAdapter();
    }

    this.xmppUser = xmppUser;
    this.xmppClient = new xmpp.SimpleXMPP();
    events.EventEmitter.call(this);
}
sys.inherits(XmppAdapter, events.EventEmitter);

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

XmppAdapter.prototype.sendMessage = function(message)
{
  this.xmppClient.send('mira@jabber.c3po.cz', message);
};

exports.XmppAdapter = XmppAdapter;
