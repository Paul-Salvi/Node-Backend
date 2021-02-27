'use strict';
const mysql = require('mysql');
const dbConnection = mysql.createConnection({
  host: '127.0.0.1',
  port:'49154',
  user: 'root',
  password: 'Admin',
  database: 'fastFingers'
});
dbConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = dbConnection;