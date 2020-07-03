const express = require('express');
const app = express();
const Review = require("../../models/Review.js");

app.get('/:id/reviews', (req, res) => {
    let userId = req.params.id;
    Review.find({reviewed: userId})
        .populate("reviewer")
    .then((reviews) => {
        res.json(reviews);
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = app;