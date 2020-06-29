const express = require("express");
const app = express();
const User = require("../../models/User.js");

app.get("/:id", (req, res) => {
  let userId = req.params.id;
  
  User.findById(userId)
  .populate("pictures")
    .then((user) => {
          res.json(user);
    })
  .catch((err) => {
    console.log("Error",err);
  });
});

module.exports = app;