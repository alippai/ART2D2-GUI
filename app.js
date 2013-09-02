var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , dgram = require('dgram');

var client = dgram.createSocket("udp4");

var commands = {
  CONNECT: 0,
  STOP: 1,
  FORWARD: 2,
  BACKWARD: 3,
  LEFT: 4,
  RIGHT: 5,
  FLEFT: 6,
  FRIGHT: 7,
  BLEFT: 8,
  BRIGHT: 9,
  PULLUP: 10,
  PUTDOWN: 11,
  UDPTEST: 12,
  MEASUREFOR: 13,
  MEASUREBACK: 14
};

app.use(express.static(__dirname + '/client'));

var server = http.createServer(app);
server.listen(8080);

var wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {
  ws.on('message', function (message) {
    message = JSON.parse(message);
    if (message.type == 'command') {
      commandExec(message.data);
    }
  });
});

function commandExec(command) {
  switch (command) {
    case 'connect':
      connect();
      break;
  }
}

function connect() {
  var msg = new Buffer([commands.CONNECT]);
  console.log('sendconnect');
  client.send(msg, 0, msg.length, 44100, '10.8.11.91', function(err, bytes) {
    console.log('connect sent');
    client.close();
  });
}

client.on("message", function (msg, rinfo) {
  console.log('msg');
  console.log(msg);
  console.log('rinfo');
  console.log(rinfo);
});

