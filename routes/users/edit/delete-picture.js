const express = require("express");
const app = express();
const User = require("../../../models/User.js");
const Picture = require("../../../models/Picture.js");
const mongoose = require('mongoose');
const uploadCloud = require('../../../config/cloudinary.js');
const { response } = require("../../index.js");

app.get('/:userId/edit/delete/:pictureId', (req, res, next) => {
    let userId = req.params.userId;
    let pictureId = req.params.pictureId;
    User.findByIdAndUpdate(userId, req.body, {new: true})
    Picture.findById(pictureId)
    .then(picture => {
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

function removeImageFromCloudinary(public_id, error){
    return uploadCloud.storage.cloudinary.uploader
    .destroy(public_id.path)
    .then(()=> console.log(error))
}

module.exports = app;
