const express = require("express");
const app = express();
const User = require("../../../models/User.js");
const mongoose = require('mongoose');
const axios = require('axios');

// app.get('/address', (req, res) => {
//   let userId = req.query.id;
//   User.findById(userId)
//   .then((user) => {
//     res.render("users/updateUser", {user});
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// });

app.post('/:userId/edit-address',(req, res, next) => {
    let userId = req.params.userId;
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.address}.json?access_token=pk.eyJ1IjoibmllbmtlMDkwNSIsImEiOiJja2MwYWludnAxaHM2MnRsZ3c4b3l0dHNqIn0.FIQX7sNolXaZEVPAUxOIrg`)
    .then((response)=> {
      responseLocation = response.data.features[0].geometry;
      return {
        type: responseLocation.type,
        coordinates: responseLocation.coordinates
      }
    })
    .then((geometry)=>{
        User.findByIdAndUpdate(userId,{
        geometry
      })
    .then((user) => res.json(user));
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('users/updateUser', { errorMessage: error.message });
      } else {
        next(error);
      }
    });
});
  


module.exports = app;

