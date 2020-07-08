const express = require("express");
const app = express();
const User = require("../../models/User.js");

app.post('/:userId/removeFromFavorites', (req, res, next) => {
    let userId = req.params.userId;
    let currentUserId = req.session.user._id;
    User.findByIdAndUpdate(currentUserId, { $pull: { favorites: userId } }, {new: true})
    .populate("favorites")
    .then(user => res.json(user.favorites))
    .catch(err => {
        res.json({ errorMessage: 'Sorry, something went wrong.' })
    })
    
});

module.exports = app;