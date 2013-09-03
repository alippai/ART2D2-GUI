var globalState = globalReset();
var marker = false;
var lastKey = 0;

var commandList = {
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

var timer;

var connection = new WebSocket("ws://" + window.location.host + "/");

connection.onopen = function () {
  console.log('connected');
};

connection.onmessage = function (message) {
  console.log(message);
  console.log(new Uint8Array(message));
};

$(document).on('keydown', function (e) {
  if (e.keyCode === lastKey) {
    e.preventDefault();
    return false;
  }
  lastKey = e.keyCode;
  switch (e.keyCode) {
    // `w`
    case 87:
      globalState.w = true;
      if (globalState.a) {
        setCommand(commandList.FLEFT);
      } else if (globalState.d) {
        setCommand(commandList.FRIGHT);
      } else {
        setCommand(commandList.FORWARD);
      }
      e.preventDefault();
      return false;
    // `a`
    case 65:
      globalState.a = true;
      if (globalState.w) {
        setCommand(commandList.FLEFT);
      } else if (globalState.s) {
        setCommand(commandList.BLEFT);
      } else {
        setCommand(commandList.LEFT);
      }
      e.preventDefault();
      return false;
    // `s`
    case 83:
      globalState.s = true;
      if (globalState.a) {
        setCommand(commandList.BLEFT);
      } else if (globalState.d) {
        setCommand(commandList.BRIGHT);
      } else {
        setCommand(commandList.BACKWARD);
      }
      e.preventDefault();
      return false;
    // `d`
    case 68:
      globalState.d = true;
      if (globalState.w) {
        setCommand(commandList.FRIGHT);
      } else if (globalState.s) {
        setCommand(commandList.BRIGHT);
      } else {
        setCommand(commandList.RIGHT);
      }
      e.preventDefault();
      return false;
    // `m`
    case 77:
      marker = !marker;
      setCommand(marker ? commandList.PULLUP : commandList.PUTDOWN);
      e.preventDefault();
      return false;

  }
});

$(document).on('keyup', function (e) {
  globalState = globalReset();
  setCommand(commandList.STOP);

  e.preventDefault();
  return false;
});

function setCommand(code) {
  globalState.command = new ArrayBuffer(1);
  var view = new Uint8Array(globalState.command);
  view[0] = code;
  clearTimeout(timer);
  send();
}

function send() {
  if (globalState.command !== null) {
    console.log(new Uint8Array(globalState.command)[0]);
    connection.send(globalState.command);
  }
  timer = setTimeout(send, 750);
}

function globalReset() {
  return {
    command: null,
    w: false,
    a: false,
    s: false,
    d: false
  };
}
