var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , dgram = require('dgram');

var client = dgram.createSocket("udp4");

app.use(express.static(__dirname + '/client'));

var server = http.createServer(app);
server.listen(8080);

var wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {
  var msgConnect  = new Buffer([commands.CONNECT]);
  client.send(msg, 0, msg.length, 44100, '10.8.11.91', function(err, bytes) {
    console.log('connect sent');
    client.close();
  });

  ws.on('message', function (message) {
    client.send(msg, 0, msg.length, 44100, '10.8.11.91', function(err, bytes) {
      console.log('connect sent');
      client.close();
    });
  });

  client.on("message", function (msg, rinfo) {
    console.log('msg');
    console.log(msg);
    console.log('rinfo');
    console.log(rinfo);
  });
});
