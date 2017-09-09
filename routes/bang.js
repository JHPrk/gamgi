var express = require('express');
var router = express.Router();
var io = require('./socketio');
var db_utils = require('./db_utils');
var debug = require('./debugTool');

/*io.getIO(function(err,io){
	if(err)
	{
		console.log('not imported');
	}
});
*/
/* GET users listing. */

/*
	1. 방장의 생성 시나리오
	url : bang/create
	method : post
	Input : { roomName, v, nickname}
	처리 : roomName, v으로 방생성 후 nickname으로 user 생성 및 방장권한 부여
	Output : { roomId }
*/
router.post('/create', function(req, res, next) {
  debug.log(req.body);
  var inRoomName = req.body.roomName;
  var inV = req.body.v;
  var inNickname = req.body.nickname;

  db_utils.insert_user(inNickname,function(err, userId) {
  	db_utils.create_room(inRoomName, inV, userId, function(err, outRoomId) {
		var returnVal = {
			roomId: outRoomId
		}

  		res.send(returnVal);
	});
	  
  });
});


/*
	2. 방원의 접속 시나리오
	url : bang/join
	method : post
	Input : { roomId, nickname }
	처리 : roomId로 방정보 찾아 v(video id val)값, t(youtube timestamp)값 구해서 리턴, nickname으로 user생성 및 방 join정보 갱신
	Output : { v, t }
*/
router.post('/join', function(req, res, next){
	debug.log(req.body);
	var inRoomId = req.body.roomId;
	var inNickname = req.body.nickname;
 	db_utils.insert_user(inNickname, function(err, userId) {
 		if(err)
 		{
 			console.error(err);
 			return res.send(err);
 		}
	 	db_utils.get_specific_room_info(inRoomId, function(err, room) {
	 		console.log("room!!!");
	 		console.log(room);
	 		if(err)
	 		{
	 			return res.send(err);
	 		}
	 		if(room == 0)
	 		{
	 			var ret ={
	 				v : '_0gN1dVQ1Cc',
	 				t : '0'
	 			}
	 			return res.send(ret);
	 		}
	 		var returnVal = {
		        v: room.videoId,
			}
	 		if(!room.videoTimestamp)
			{
				returnVal.t = '0';
				return res.send(returnVal);
			};
	 		var curTimeSeconds = Math.floor(new Date().getTime() / 1000);
		    returnVal.t = String(curTimeSeconds - Number(room.videoTimestamp));
			return res.send(returnVal);
	 	});
 	});
});

/*
	2. 방원
	url : bang/list
	method : get
	Input : { }
	처리 : 현재 생성된 방에 관한 리스트 리턴
	Output : { rooms : [{roomId, roomName, v, bangjang}] }
*/
router.get('/list', function(req,res,next){
	debug.log(req.body);
	db_utils.get_room_info(function(err, rooms){
		if(err)
		{
 			console.error(err);
 			return res.send(err);
		}
		if(rooms.length <= 0)
		{
			console.log('length<0');
			return res.send({rooms : []});
		}
		var ret = {rooms:[]};
		var cnt = 0;
		rooms.forEach(function(data){
			var oneVal = {roomId : data.roomId, roomName : data.roomName, v : data.videoId, bangjang : data.bangjangId, t : data.videoTimestamp};
			ret.rooms[cnt++] = oneVal;
			if(cnt == rooms.length)
				return res.send(ret);
		})
	})
});

router.get('/:id',function(req,res,next){
	debug.log(req.body);
	var inRoomId = req.params.id;
	debug.log(inRoomId);
	db_utils.get_specific_room_info(inRoomId, function(err, room) {
	 	console.log("room!!!");
	 	console.log(room);
	 	if(err)
	 	{
	 		return res.send(err);
	 	}
	 	if(room == 0)
	 	{
	 		var ret ={
				roomName: 'null',
	 			v : 'null',
	 			t : '0'
	 		}
	 		return res.send(ret);
	 	}

		var returnVal = {
			roomName:data.roomName,
		    v: room.videoId,
		}
		if(!room.videoTimestamp)
		{
			returnVal.t = '0';
			return res.send(returnVal);

		};
		var curTimeSeconds = Math.floor(new Date().getTime() / 1000);
		returnVal.t = String(curTimeSeconds - Number(room.videoTimestamp));
		return res.send(returnVal);
	});
})
module.exports = router;
