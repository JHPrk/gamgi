var express = require('express');
var debug = require('./debugTool');
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 3,
  host: "localhost",
  user: "hintong",
  password: "nodejs",
  port : 3306,
  database: "gamgi"
});

exports.insert_user = function(userName,callback) {
  var userId;

  pool.getConnection(function (err, con) {
    // Use the connection
    con.query('INSERT INTO user(nickname) VALUES (?)', [userName],
      function (err, result) {
        con.release(); // Don't use the connection here, it has been returned to the pool.
        if (err) {
          console.error("err : " + err);
          return callback(err);
        }
        //console.log("rows : " + JSON.stringify(rows));

        //res.render('index', {title: 'test', rows: rows});
        if(result.length <= 0)
        {
          debug.log('already exists');
          return callback(null, -1);
        }

        userId = result.insertId;
        console.log("uuuu1 :" + userId);
        return callback(null,userId);
    });
  }); 
}

exports.create_room = function(roomName, videoId, bangjangId, callback) {
  var roomId; 
  pool.getConnection(function (err, con) {
    // Use the connection
    con.query('INSERT INTO room(roomName, videoId, bangjangId) VALUES (?, ?, ?)', 
      [roomName, videoId, bangjangId],
      function (err, result) {
        con.release(); // Don't use the connection here, it has been returned to the pool.
        if (err) {
          console.error("err : " + err);
          return callback(err);
        }
        //console.log("rows : " + JSON.stringify(rows));

        //res.render('index', {title: 'test', rows: rows});
        roomId = result.insertId;
        return callback(null, roomId);
    });

  }); 
}

exports.get_specific_room_info = function(roomId, callback) {
  var roomId; 
  pool.getConnection(function (err, con) {
    // Use the connection
    con.query('SELECT * FROM room WHERE roomId = ?', 
      [roomId],
      function (err, rows) {
        con.release(); // Don't use the connection here, it has been returned to the pool.
        if (err) {
          console.error("err : " + err);
          return callback(err);
        }
        else if(rows.length <=0)
        {
          return callback(null,0);
        }
        console.log("rows : " + JSON.stringify(rows));
        // console.log("room start>>>> " + rows);
        //console.log(rows);
        //rowObjs = JSON.stringify(rows);
        rowObj = rows[0];
        console.log(rowObj);
        //console.log("vId: " + rowObj.videoId)
        //console.log("vTs: " + rowObj.videoTimestamp)
        console.log("room end>>>> ");

        return callback(null, rowObj);
    });

  }); 
}

exports.get_room_info = function(callback)
{
  pool.getConnection(function(err,con){
    con.query('SELECT * FROM room',[],function(err,result){
      con.release();
      if(err){
        console.error('err : ' + err);
        return callback(err);
      }
      if(result.length <= 0)
      {
        return callback(null,0);
      }
      return callback(null, result);
    })
  })
}