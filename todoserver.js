/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

let connected = false;
const jsonParser = bodyParser.json();

const app = express();
app.use(bodyParser.json());

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tribias4',
  database: 'ToDoListDB',
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log('Connection Failed');
  } else {
    console.log('Connected');
    connected = true;
  }
});

app.post('/addTask', jsonParser, (req, res) => {
  if (connected) {
    const sql1 = `INSERT INTO todolist (task_name) VALUES ("${req.body.taskName}")`;
    mysqlConnection.query(sql1, (err) => {
      if (err) throw err;
    });
    const sql2 = 'SELECT LAST_INSERT_ID() as task_id';
    mysqlConnection.query(sql2, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  }
});

app.post('/removeTask', jsonParser, (req) => {
  if (connected) {
    const sql3 = `DELETE FROM todolist WHERE task_id =${req.body.taskID}`;
    mysqlConnection.query(sql3, (err) => {
      if (err) throw err;
    });
  }
});

app.post('/editTask', jsonParser, (req) => {
  if (connected) {
    const sql4 = `UPDATE todolist SET task_name = '${req.body.taskName}' WHERE task_id = ${req.body.taskID}`;
    mysqlConnection.query(sql4, (err) => {
      if (err) throw err;
    });
  }
});

app.get('/getTasks', (req, res) => {
  const sql = 'SELECT * FROM todolist';
  mysqlConnection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(3000);
