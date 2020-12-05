
var express = require('express');

var app = express();



var server = app.listen(3040);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection:' + socket.id);

  socket.on('command', commandMsg);

  function commandMsg(data) {
    //socket.brodcast.emit('command', data);
    io.sockets.emit('command',data);
    console.log(data);
  }

}

app.get('/api/:command/:value', (req,res) => {
	var error = checkCommand(req.params.command, req.params.value);
	sendApiData(req.params.command, req.params.value);
	res.send(error);
});

function sendApiData(apiCommand, apiValue){
	console.log(apiCommand, apiValue);
	var data = {
		command: apiCommand,
		value: apiValue
	}
	
	io.sockets.emit('command', data);
}

function checkCommand(command, value){
	if (isNumber(value)){
	}else {
		return "second variable must be a an integer";
	}
	if (command == "up" || command == "down" || command == "left" || command == "right" || command == "forward" || command == "back"){
	}else {
		return "supported commands are up, down, left, right, forward, and back";
	}
	return "command received"
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
