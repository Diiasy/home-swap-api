const express = require("express");
const app = express();
const User = require("../../models/User.js");
// const uploadCloud = require('../../config/cloudinary.js');
const mongoose = require('mongoose');

app.get('/:id/edit', (req, res) => {
  let userId = req.params.id;
  User.findById(userId)
  .then((user) => {
    res.json(user);
  })
  .catch((error) => {
    console.log(error);
  });
});

// app.post('/', uploadCloud.single("picture"),(req, res, next) => {
app.post('/', (req, res, next) => {
    let userId = req.body._id;
    const { name, homeName, city, homeDescription } = req.body;
    // let profileImage = req.body.profileImage;
    // let profileImagePath = req.body.profileImagePath;
    // if (req.file){
    //     profileImage = req.file.originalname;
    //     profileImagePath = req.file.path;

    // }
    User.findByIdAndUpdate(userId,{
        name,
        homeName,
        city,
        homeDescription
        // profileImage,
        // profileImagePath
      })
    .then(userFromDB => {
      console.log('Updated user is: ', userFromDB);
      res.json(userFromDB);
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