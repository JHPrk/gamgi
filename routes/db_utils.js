var express = require('express');
var debug = require('./debugTool');
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 3,
  host: "localhost",
  user: "jeffrey",
  password: "mypass",
  port : 3306,
  database: "gamgi"
});

exports.insert_user = function(userName, callback) {
  var userId;

  pool.getConnection(function (err, con) {
    // Use the connection
    con.query('INSERT INTO user(nickname) VALUES (?)', [userName],
      function (err, result) {
        if (err) {
          console.error("err : " + err);
          return callback(err);
        }

        con.release(); // Don't use the connection here, it has been returned to the pool.
        userId = result.insertId;
        return callback(null, userId);
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
        if (err) {
          console.error("err : " + err);
          return callback(err);
        }
        //console.log("rows : " + JSON.stringify(rows));

        //res.render('index', {title: 'test', rows: rows});
        con.release(); // Don't use the connection here, it has been returned to the pool.
        roomId = result.insertId;
        return callback(null, roomId);
    });

  }); 
}

exports.get_room_info = function(roomId, callback) {
  var roomId; 
  pool.getConnection(function (err, con) {
    // Use the connection
    con.query('SELECT * FROM room WHERE roomId = (?)', 
      [roomId],
      function (err, rows) {
        if (err) {
          console.error("err : " + err);
          return callback(err);
        }
        //console.log("rows : " + JSON.stringify(rows));
        console.log("room start>>>> ");
        //console.log(rows);
        rowObjs = JSON.stringify(rows);
        rowObj = rowObjs[0]
        console.log(rowObj);
        //console.log("vId: " + rowObj.videoId)
        //console.log("vTs: " + rowObj.videoTimestamp)
        console.log("room end>>>> ");
        //res.render('index', {title: 'test', rows: rows});
        con.release(); // Don't use the connection here, it has been returned to the pool.
        return callback(null, rowObj);
    });

  }); 
}
