const express = require("express");
const app = express();
const User = require("../../../models/User.js");
const Picture = require("../../../models/Picture.js");
const removeImageFromCloudinary = require("../../../middleware/removeImageFromCloudinary");

app.get('/:userId/edit/delete/:pictureId', (req, res, next) => {
    let userId = req.params.userId;
    let pictureId = req.params.pictureId;
    User.findByIdAndUpdate(userId, req.body, {new: true})
    Picture.findById(pictureId)
    .then(picture => {
        debugger
        return removeImageFromCloudinary(picture)
        .then(response => {
            return picture.remove();
        })
    })
    .then((picture) => {
        return res.json(picture)
    })
    .catch(error => {
        return res.status(500).json({message: error})
    })
});

module.exports = app;
