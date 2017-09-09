var express = require('express');
var router = express.Router();
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

router.get('/hi',function(req, res, next){
	console.log('hihi')
});

/* GET home page. */
router.get('/show', function (req, res, next) {

    pool.getConnection(function (err, con) {
        // Use the connection
        con.query('SELECT * FROM user', function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));

            //res.render('index', {title: 'test', rows: rows});
            res.send(JSON.stringify(rows));

            con.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

/*
export.insert = function(userName) {
	console.log("insert!!");	
}*/

router.get('/insert', function (req, res, next) {
	var userName = "youngee2";
    pool.getConnection(function (err, con) {
        // Use the connection
        con.query('INSERT INTO user(nickname) VALUES (?)', [userName], function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));

            //res.render('index', {title: 'test', rows: rows});
            res.send(JSON.stringify(rows));

            con.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});
module.exports = router;






/*
con.connect(function(err) {
  if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }

  console.log("Connected!");
});*/