const express = require("express");
const app = express();
const axios = require('axios');
const User = require("../../../models/User.js");
const Picture = require("../../../models/Picture.js");
const mongoose = require('mongoose');
const uploadCloud = require('../../../config/cloudinary.js');

app.post('/:userId/edit', uploadCloud.array("pictures"), insertPicturesIntoDB, editAddress, (req, res, next) => {
  let userId = req.params.userId;
  User.findByIdAndUpdate(
    userId,
    {
      city: req.body.city,
      homeName: req.body.homeName,
      homeDescription: req.body.homeDescription,
      name: req.body.name,
      address: req.body.address
    },
    {new: true}
  )
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
          path: file.path,
          picture_id: file.filename
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

function editAddress (req, res, next) {
  let userId = req.params.userId;
  if (req.body.address){
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.address}.json?access_token=${process.env.access_token}`)
    .then((response)=> {
      responseLocation = response.data.features[0].geometry;
      return {
        type: responseLocation.type,
        coordinates: responseLocation.coordinates
      }
    })
    .then((geometry)=>{
      return User.findByIdAndUpdate(userId, { geometry }, {new: true})
      .then(user=> {
        next()
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.status(500).render('users/updateUser', { errorMessage: error.message });
        } else {
          next(error);
        }
      });
    })
  } else {
    next();
  }
}

module.exports = app;