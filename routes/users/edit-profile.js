const express = require("express");
const app = express();
const User = require("../../models/User.js");
const Picture = require("../../models/Picture.js");
const mongoose = require('mongoose');
const uploadCloud = require('../../config/cloudinary.js');

app.post('/:userId/edit', uploadCloud.array("pictures"), insertPicturesIntoDB, (req, res, next) => {
    let userId = req.params.userId;

    User.findByIdAndUpdate(userId, req.body, {new: true})
    .populate("pictures")
    .then((user) => res.json(user))
    .catch(error => res.status(500).json({message: error}))
});

function insertPicturesIntoDB(req,res, next){
  let createPicturesPromises = [];
  if (req.files){
    req.files.forEach(file => {
      createPicturesPromises.push(
        Picture.create({
          name: file.originalname,
          path: file.path
        })
      .then(picture => {
          return User.findByIdAndUpdate(req.params.userId, { $push: { pictures: picture.id } });
        })
      )
    })
  }

  Promise.all(createPicturesPromises)
    .then(()=> {
      next();
    })
    .catch((err)=> {
      res.status(500).json({message: err});
    })
}

module.exports = app;
