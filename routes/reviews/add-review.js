const express = require('express');
const app = express();
const Review = require("../../models/Review.js");

app.post('/create', (req, res) => {
  const reviewer = req.session.user._id;
  const content = req.body.content;
  const score = req.body.score;
  const reviewed = req.body.profile_id;
  Review.create({
    reviewer,
    content,
    score,
    reviewed
  })
  .then((review) => {
    Review.find({_id: review.id})
        .populate("reviewer")
    .then((review) => {
        res.json(review);
    })
  })
  .catch((error) => {
    console.log(error);
  });
});

module.exports = app;