const express = require('express');
const app = express();
const Review = require("../../models/Review.js");
const User = require("../../models/User.js");

app.post('/create', (req, res) => {
  const reviewer = req.body.user_id;
  const content = req.body.content;
  const score = req.body.score;
  const reviewed = req.body.profile_id;
  Review.create({
    reviewer,
    content,
    score,
    reviewed
  })
  .then(() => {
      User.findById(reviewed)
        .then(userFromDB => {
          res.json(userFromDB);
        });
    })
  .catch((error) => {
    console.log(error);
  });
});

app.get('/:id/review', (req, res) => {
    let userId = req.params.id;
    Review.find({reviewed: userId})
        .populate("reviewer")
        .populate("reviewed")
    .then((reviews) => {
        res.json(reviews);
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = app;