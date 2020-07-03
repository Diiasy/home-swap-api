const express = require("express");
const app = express();
const User = require("../../models/User.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
// const uploadCloudUsers = require('../../config/cloudinary.js');
const mongoose = require('mongoose');

const axios = require('axios');

app.post('/', (req, res, next) => {
  const { username, email, name, password, city} = req.body;

  if (!username || !email || !password || !city ||!name) {
    res.status(400).json({ errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .json({ errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
      return;
  }

  axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.address}.json?access_token=pk.eyJ1IjoibmllbmtlMDkwNSIsImEiOiJja2MwYWludnAxaHM2MnRsZ3c4b3l0dHNqIn0.FIQX7sNolXaZEVPAUxOIrg`)
  .then((response)=> {
    responseLocation = response.data.features[0].geometry;
    return {
      type: responseLocation.type,
      coordinates: responseLocation.coordinates
    }
  })
  .then((geometry)=>{
      bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          username,
          email,
          city,
          name,
          geometry,
          passwordHash: hashedPassword
        });
      })
      .then(userFromDB => {
        res.json(userFromDB);
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.status(500).json({ errorMessage: error.message });
        } else if (error.code === 11000) {
          res.status(409).json({ errorMessage: 'Username and email need to be unique. Either username or email is already used.' });
        } else {
          next(error);
        }
      });
  });
});

module.exports = app;