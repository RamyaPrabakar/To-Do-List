const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
var connected = false;
var jsonParser = bodyParser.json();

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'tribias4',
    database : 'ToDoListDB',
    multipleStatements : true
});

mysqlConnection.connect((err) => {
    if(err){
        console.log('Connection Failed');
    } else {
        console.log('Connected');
        connected = true;
    }
})

app.post('/addTask', jsonParser, function(req, res) {

  if (connected) {
    var sql1 ='INSERT INTO todolist (task_name) VALUES ("'+req.body.taskName+'")';
    mysqlConnection.query(sql1, function(err) {
        if(err) throw err;
    });
    let sql2 = 'SELECT LAST_INSERT_ID() as task_id';
    mysqlConnection.query(sql2, function(err, results) {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });

  }
})

app.post('/removeTask', jsonParser, function(req, res) {

  if (connected) {
    var sql3 = "DELETE FROM todolist WHERE task_id ="+ req.body.taskID;
    console.log(sql3);
    mysqlConnection.query(sql3, function(err) {
        if(err) throw err;
    });
  }
})

app.post('/editTask', jsonParser, function(req, res) {

  if (connected) {
    var sql4 = "UPDATE todolist SET task_name = '" + req.body.taskName + "' WHERE task_id = "+ req.body.taskID;
    console.log(sql4);
    mysqlConnection.query(sql4, function(err) {
        if(err) throw err;
    });
  }
})

app.get('/getTasks', (req, res) => {
  let sql = 'SELECT * FROM todolist';
  mysqlConnection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send(results);
  })
})

app.use('/static', express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(3000);
