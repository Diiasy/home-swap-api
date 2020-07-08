const express = require("express");
const app = express();
const User = require("../../models/User.js");

app.post('/:userId/addToFavorites', (req, res, next) => {
    let userId = req.params.userId;
    let currentUserId = req.session.user._id;
    if (userId === currentUserId) return res.json({errorMessage: "You cannot put yourself in favorites"})
    else {
        User.findById(currentUserId)
        .then(user => {
            if (user.favorites.includes(userId)) res.json({errorMessage: "This user is already in your favorites"})
            else {
                User.findByIdAndUpdate(
                    currentUserId,
                    { $push: { favorites: userId } },
                    { new: true }
                )
                .then(user => res.json(user.favorites))
                .catch(err => {
                    res.json({ errorMessage: 'Sorry, something went wrong.' })
                })
            }
        })
    }
});

module.exports = app;