const express = require("express");
const app = express();
const User = require("../../../models/User.js");
const Picture = require("../../../models/Picture.js");
const uploadCloud = require('../../../config/cloudinary.js');

app.post('/:userId/edit-pictures', uploadCloud.single("pictures"), (req, res, next) => {
    let userId = req.params.userId;
    if (req.file){
        Picture.create({
          name: req.file.originalname,
          path: req.file.path,
          picture_id: req.file.filename
        })
        .then(picture => {
          return User.findByIdAndUpdate(userId, { $push: { pictures: picture.id } }, {new: true})
          .populate("pictures")
          .then(user=> {
            res.json(user.pictures);
          })
        })  
        .catch((err)=> {
          res.status(500).json({message: err});
        })
  }
});

module.exports = app;