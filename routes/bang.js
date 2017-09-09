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
	 	db_utils.get_room_info(inRoomId, function(err, room) {
	 		console.log("room!!!");
	 		console.log(room);
			var returnVal = {
		        v: room.videoId,
		        t: room.videoTimestamp
			} 		
			res.send(returnVal);
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

	var fakeReturn = {
		rooms: [{
			roomId: 123,
			roomName: 'hahah',
			v: '_0gN1dVQ1Cc',
	  		bangjang : 'na zzang'
		},
		{
			roomId: 123,
			roomName: 'hahah',
			v: '_0gN1dVQ1Cc',
	  		bangjang : 'na zzang'
		}
		]
	};

	res.send(fakeReturn);
})
module.exports = router;
