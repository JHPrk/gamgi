var debug = require('./debugTool');
var io;

exports.setServerToIO = function(server,callback){ 
	io = require('socket.io')(server);
	io.emit('some event', {for:'everyone'});
	/*io.on('connection', function(socket){
		socket.on('join', function(roomid){
			socket.join(roomid);
		});
  		debug.log('a user connected');
  		socket.broadcast.emit('hi');
  		socket.on('chat message', function(msg){
    		io.emit('chat message',msg);
   			debug.log('message: ' + msg);
 	 	})
 		socket.on('disconnected', function(){
    		debug.log('user disconnected');
  		});
	});*/
	io.on('connection',function(socket){
		debug.log('a user connected');
  		socket.broadcast.emit('hi');
		socket.on('join', function(roomid, nickname){
			socket.join(roomid);
			socket.nickname = nickname;
			// debug.log(nickname);
			socket.roomid = roomid;
			// debug.log(roomid);
			debug.log(Object.keys(io.sockets.adapter.rooms[roomid].sockets));
			io.to(roomid).emit('notify', nickname + '님이 방에 입장하였습니다.');
			io.to(roomid).emit('user cnt', Object.keys(io.sockets.adapter.rooms[roomid].sockets).length);
		});
		socket.on('chat message', function(msg){
			io.to(socket.roomid).emit('chat message',msg,socket.nickname);
			//debug.log(socket.roomid);
			// debug.log(socket.nickname);
			debug.log('message: ' + msg);
		});
		socket.on('disconnect', function(){
			debug.log('user disconnected');
			// debug.log(socket.nickname);
			if(io.sockets.adapter.rooms[socket.roomid])	
				io.to(socket.roomid).emit('user cnt', Object.keys(io.sockets.adapter.rooms[socket.roomid].sockets).length);
			io.to(socket.roomid).emit('notify',socket.nickname + '님이 방을 떠났습니다.');
		});
	});
}
exports.setIOnsp = function(nsp,callback){
	nsp.on('connection',function(socket){
		debug.log('a user connected');
		nsp.on('join', function(roomid, nickname){
			socket.join(roomid);
			socket.nickname = nickname;
			io.emit('notify', socket.nickname + '님이 방에 입장하였습니다.');
		})
		socket.on('chat message', function(msg){
			nsp.emit('chat message',msg);
			debug.log('message: ' + msg);
		})
		socket.on('disconnected', function(){
			debug.log('user disconnected');
			nsp.emit('notify',socket.nickname + '님이 방을 떠났습니다.');
		})
	})
}

exports.getIO = function(callback)
{
	if(!io)
	{
		var err = new Error("bad Socket Lib!");
		debug.log('hello');
		return callback(err);
	}
	return callback(null,io);
}