var xmpp = require('node-xmpp');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var qbox = require('qbox');

var STATUS = {
  AWAY: "away",
  DND: "dnd",
  XA: "xa",
  ONLINE: "online",
  OFFLINE: "offline"
};

module.exports = new XmppClient();

/** @module XMPP */
var XmppClient

/**
 * Constructor function. Simple XMPP client.
 *
 * @constructor
 */
XmppClient = function()
{

  //setting status here
  this.STATUS = STATUS;
  this.self = this;
  this.Element = xmpp.Element;
  var conn;
  this.probeBuddies = {};
  this.capabilities = {};
  this.capBuddies = {};
  this.$ = qbox.create();

  this.events = new EventEmitter();
  this.on = function() {
    this.events.on.apply(events, arguments);
  };

  this.events = events;
  this.conn = conn;
}

SimpleXMPP.prototype.send = function(to, message, group)
{
  $.ready(function() {
    var stanza = new xmpp.Element('message', { to: to, type: (group ? 'groupchat' : 'chat') });
    stanza.c('body').t(message);
    this.conn.send(stanza);
  });
}

SimpleXMPP.prototype.join = function(to)
{
  $.ready(function() {
    var stanza =  new xmpp.Element('presence', { to: to }).
      c('x', { xmlns: 'http://jabber.org/protocol/muc' });
    this.conn.send(stanza);
  });
}

SimpleXMPP.prototype.subscribe = function(to)
{
  $.ready(function() {
    var stanza = new xmpp.Element('presence', { to: to, type: 'subscribe' });
    this.conn.send(stanza);
  });
}

SimpleXMPP.prototype.unsubscribe = function(to)
{
  $.ready(function() {
    var stanza = new xmpp.Element('presence', { to: to, type: 'unsubscribe' });
    this.conn.send(stanza);
  });
}

SimpleXMPP.prototype.acceptSubscription = function(to)
{
  // Send a 'subscribed' notification back to accept the incoming
  // subscription request
  $.ready(function() {
    var stanza = new xmpp.Element('presence', { to: to, type: 'subscribed' });
    this.conn.send(stanza);
  });
}

SimpleXMPP.prototype.acceptUnsubscription = function(to)
{
  $.ready(function() {
    var stanza = new xmpp.Element('presence', { to: to, type: 'unsubscribed' });
    this.conn.send(stanza);
  });
};

SimpleXMPP.prototype.getRoster = function()
{
  // checks for incoming subscription requests
  $.ready(function() {
    var roster = new xmpp.Element('iq', { id: 'roster_0', type: 'get' });
    roster.c('query', { xmlns: 'jabber:iq:roster' });
    conn.send(roster);
  });
}

SimpleXMPP.prototype.probe = function(buddy, callback)
{
  this.probeBuddies[buddy] = true;
  $.ready(function() {
    var stanza = new xmpp.Element('presence', {type: 'probe', to: buddy});
    this.events.once('probe_' + buddy, callback);
    conn.send(stanza);
  });
}

// Method: setPresence
//
// Change presence appearance and set status message.
//
// Parameters:
//   show   - <show/> value to send. Valid values are: ['away', 'chat', 'dnd', 'xa'].
//            See http://xmpp.org/rfcs/rfc3921.html#rfc.section.2.2.2.1 for details.
//            Pass anything that evaluates to 'false' to skip sending the <show/> element.
//   status - (optional) status string. This is free text.
//
// TODO:
// * add caps support
SimpleXMPP.prototype.setPresence = function(show, status)
{
  $.ready(function() {
    var stanza = new xmpp.Element('presence');
    if(! show) {
      stanza.c('show').t(show);
    }
    if(typeof(status) !== 'undefined') {
      stanza.c('status').t(status);
    }
    conn.send(stanza);
  });
}

// TODO: document!
//
// Options:
//   * skipPresence - don't send initial empty <presence/> when connecting
//
SimpleXMPP.prototype.connect = function(params) {
  this.config = params;
  this.conn = new xmpp.Client(params);
  self.conn = conn;

  conn.on('close', function() {
    $.stop();
    events.emit('close');
  });

  conn.on('online', function(){
    if(! config.skipPresence) {
      conn.send(new xmpp.Element('presence'));
    }
    events.emit('online');
    $.start();
    // Use whitespace keepalives to keep the connection up
    setInterval(function() {
      conn.send(' ');
    }, 1000 * 60);
  });

  conn.on('stanza', function(stanza) {
    events.emit('stanza', stanza);
    //console.log(stanza);
    //looking for message stanza
    if (stanza.is('message')) {

      //getting the chat message
      if(stanza.attrs.type == 'chat') {

        var body = stanza.getChild('body');
        if(body) {
          var message = body.getText();
          var from = stanza.attrs.from;
          var id = from.split('/')[0];
          events.emit('chat', id, message);
        }
      } else if(stanza.attrs.type == 'groupchat') {

        var body = stanza.getChild('body');
        if(body) {
          var message = body.getText();
          var from = stanza.attrs.from;
          var conference = from.split('/')[0];
          var id = from.split('/')[1];
          var stamp = null;
          if(stanza.getChild('x') && stanza.getChild('x').attrs.stamp)
            stamp = stanza.getChild('x').attrs.stamp;
          events.emit('groupchat', conference, id, message, stamp);
        }
      }
    } else if(stanza.is('presence')) {

      var from = stanza.attrs.from;
      if(from) {
        if(stanza.attrs.type == 'subscribe') {
          //handling incoming subscription requests
          events.emit('subscribe', from);
        } else if(stanza.attrs.type == 'unsubscribe') {
          //handling incoming unsubscription requests
          events.emit('unsubscribe', from);
        } else {
          //looking for presence stenza for availability changes
          var id = from.split('/')[0];
          var statusText = stanza.getChildText('status');
          var state = (stanza.getChild('show'))? stanza.getChild('show').getText(): STATUS.ONLINE;
          state = (state == 'chat')? STATUS.ONLINE : state;
          state = (stanza.attrs.type == 'unavailable')? STATUS.OFFLINE : state;
          //checking if this is based on probe
          if(probeBuddies[id]) {
            events.emit('probe_' + id, state, statusText);
            delete probeBuddies[id];
          } else {
            //specifying roster changes
            events.emit('buddy', id, state, statusText);
          }

          // Check if capabilities are provided
          var caps = stanza.getChild('c', 'http://jabber.org/protocol/caps');
          if (caps) {
            var node = caps.attrs.node,
              ver = caps.attrs.ver;

            if (ver) {
              var fullNode = node + '#' + ver;
              // Check if it's already been cached
              if (capabilities[fullNode]) {
                events.emit('buddyCapabilities', id, capabilities[fullNode]);
              } else {
                // Save this buddy so we can send the capability data when it arrives
                if (!capBuddies[fullNode]) {
                  capBuddies[fullNode] = [];
                }
                capBuddies[fullNode].push(id);

                var getCaps = new xmpp.Element('iq', { id: 'disco1', to: from, type: 'get' });
                getCaps.c('query', { xmlns: 'http://jabber.org/protocol/disco#info', node: fullNode });
                conn.send(getCaps);
              }
            }
          }

        }
      }
    } else if (stanza.is('iq')) {

      // Response to capabilities request?
      if (stanza.attrs.id === 'disco1') {
        var query = stanza.getChild('query', 'http://jabber.org/protocol/disco#info'),
          node = query.attrs.node,
          identity = query.getChild('identity'),
          features = query.getChildren('feature');

        var result = {
          clientName: identity.attrs.name,
          features: features.map(function (feature) { return feature.attrs['var']; })
        };

        capabilities[node] = result;

        // Send it to all buddies that were waiting
        if (capBuddies[node]) {
          capBuddies[node].forEach(function (id) {
            events.emit('buddyCapabilities', id, result);
          });
          delete capBuddies[node];
        }
      }
    }
  });

  conn.on('error', function(err) {
    events.emit('error', err);
  });
}

// Allow for multiple connections
module.exports.XmppClient = XmppClient;
