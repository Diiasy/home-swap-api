var express = require('express');
var app = express();
var User = require("../../models/User");

app.get('/', function(req, res, next) {
    User.find({})
      .populate("pictures")
      .then((users)=> {
        res.status(200).json(users);
      })
      .catch((error)=> {
        console.log(error);
      })
});
  
module.exports = app;