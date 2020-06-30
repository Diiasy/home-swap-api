const express = require("express");
const app = express();
const User = require("../../models/User.js");
// const uploadCloud = require('../../config/cloudinary.js');
const mongoose = require('mongoose');

// app.post('/:id/edit', uploadCloud.array("pictures"),(req, res, next) => {
app.post('/:id/edit', (req, res, next) => {
    let userId = req.params.id;
    let { name, homeName, city, homeDescription } = req.body;

    // let pictures = [];
    // let picturesPath = [];
    // if (req.files){
    //     req.files.forEach(el=>{
    //         pictures.push(el.originalname);
    //         picturesPath.push(el.path);
    //     });
    // }

    User.findByIdAndUpdate(userId, {
        name,
        homeName,
        city,
        homeDescription
        // image: pictures,
        // path: picturesPath
      })
    .then(() => {
      User.findById(userId)
        .then(userFromDB => {
          console.log('Updated user is: ', userFromDB);
          res.json(userFromDB);
        })
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).json({ errorMessage: error.message });
      } else {
        next(error);
      }
    });
});
  


module.exports = app;