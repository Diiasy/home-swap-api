const express = require('express');
const app = express();
const Review = require("../../models/Review");

app.post('/create', (req, res) => {
    const reviewer = req.session.user._id;
    const review = req.body.review;
    const score = req.body.score;
    const reviewed = req.query.profile_id;
    Review.create({
        reviewer,
        review,
        score,
        reviewed
    })
    .then(newReview => {
        res.json(newReview);
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = app;

