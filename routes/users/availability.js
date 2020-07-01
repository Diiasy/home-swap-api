const express = require("express");
const app = express();
const User = require("../../models/User.js");
const mongoose = require('mongoose');

app.post('/:id/availabilty', (req, res, next) => {
    let userId = req.params.id;
    let availability  = Object.values(req.body);

    User.update(
        { _id: userId},
        { $push: {availability: { $each: availability }} },
    )
    .then(() => {
      User.findById(userId)
        .then(userFromDB => {
          console.log('Updated user is: ', userFromDB);
          res.json(userFromDB);
        });
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).json({ errorMessage: error.message });
      } else {
        next(error);
      }
    });
});
  


module.exports = app;