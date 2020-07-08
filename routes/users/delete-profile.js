const express = require("express");
const app = express();
const User = require("../../models/User.js");
const removeImageFromCloudinary = require("../../middleware/removeImageFromCloudinary");
const Picture = require("../../models/Picture.js");

app.get('/:userId/delete', (req, res, next) => {
    let userId = req.params.userId;
    User.findById(userId)
    .populate("pictures")
    .then(user => {
        if (!user) res.status(404).json({errorMessage: "This user doesn't exist"});
        else if (req.session.user.username !== user.username) res.status(403).json({errorMessage: "This is not your profile!"});
        else {
            user.pictures.map(
                picture => 
                Picture.findById(picture.id)
                .then (picture =>
                    removeImageFromCloudinary(picture)
                    .then(response => {
                        return picture.remove();
                    })
                )
            )
            return user.remove()
        }
    })
.then(user => req.sessions.destroy())
    .then(user=> res.json(user))
    .catch(err => {
        res.json({ errorMessage: 'Sorry, something went wrong.' })
    })
})

module.exports = app;