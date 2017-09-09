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

exports.insert_user = function(userName,callback) {
  var userId;

  pool.getConnection(function (err, con) {
    // Use the connection
    con.query('INSERT INTO user(nickname) VALUES (?)', [userName],
      function (err, result) {
        if (err) {
          console.error("err : " + err);
          return callback(err);
        }
        //console.log("rows : " + JSON.stringify(rows));

        //res.render('index', {title: 'test', rows: rows});
        con.release(); // Don't use the connection here, it has been returned to the pool.
        userId = result.insertId;
        console.log("uuuu1 :" + userId);
        return callback(null,userId);
    });
    console.log("uuuu2 :" + userId);
  });	
  console.log("uuuu3 :" + userId);
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
        console.log("rrrr1 :" + roomId);
        return callback(null,roomId);
    });

  }); 
}
