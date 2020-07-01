const express = require("express");
const app = express();
const User = require("../../models/User.js");
const Picture = require("../../models/Picture.js");
const mongoose = require('mongoose');
const uploadCloud = require('../../config/cloudinary.js');

app.post('/:id/edit', uploadCloud.array("pictures"), (req, res, next) => {
    let userId = req.params.id;

    let newPictures = [];
    if (req.files){
        req.files.forEach(el=>{
          newPictures.push([el.originalname, el.path]);
        });
    }

    let pictureCreatePromises = [];
    newPictures.forEach(el => {
      pictureCreatePromises.push(
        Picture.create({
          name: el[0],
          path: el[1]
        })
       .then(picture => {
          return User.findByIdAndUpdate(userId, { $push: { pictures: picture.id } });
        })
      )
    })

    let { name, homeName, city, homeDescription } = req.body;
    Promise.all(pictureCreatePromises)
    .catch(error => {
      res.status(500).json({ errorMessage: error.message });
    })
    .then((pictureResults)=> 
       User.findByIdAndUpdate(userId, {
        name,
        homeName,
        city,
        homeDescription
       })
    )
    .then(() => 
      User.findById(userId)
        .then(userFromDB => {
          res.json(userFromDB);
        })
    )
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).json({ errorMessage: error.message });
      } else {
        next(error);
      }
    });
});

module.exports = app;