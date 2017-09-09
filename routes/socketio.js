var io;

exports.setServerToIO = function(server){ 
	io = require('socket.io')(server);
	io.emit('some event', {for:'everyone'});
	io.on('connection', function(socket){
  		console.log('a user connected');
  		socket.broadcast.emit('hi');
  		socket.on('chat message', function(msg){
    		io.emit('chat message',msg);
   			console.log('message: ' + msg);
 	 	})
 		socket.on('disconnected', function(){
    		console.log('user disconnected');
  		});
	});
}

exports.getIO = function(callback)
{
	if(!io)
	{
		var err = new Error("bad Socket Lib!");
		return callback(err);
	}
	return callback(null,io);
}