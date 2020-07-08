const express = require("express");
const app = express();
const User = require("../../models/User.js");

app.get('/', (req, res, next) => {
    let userId = req.session.user._id;
    User.findById(userId)
    .populate({ 
        path: "favorites",
        populate: {
          path: "pictures",
          model: 'Picture'
        } 
     })
    .then(user => {
        res.json(user.favorites)
    })
    .catch(err => {
        res.json({ errorMessage: 'Sorry, something went wrong.' })
    })
});

module.exports = app;