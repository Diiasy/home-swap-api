var express = require('express');
var app = express();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.json({ message: 'Hello!!' });
});

module.exports = app;