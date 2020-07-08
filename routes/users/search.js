const express = require('express');
const app = express();
const User = require("../../models/User.js");
const axios = require('axios');


app.get('/', (req, res) => {
    let searchTerm = String(req.query.q);
    User.find(
        { $text: { $search: searchTerm } }
    )
    .populate("pictures")
    .then(properties => {
        res.json(properties);
    })
    .catch((err) => {
        console.log("Err",err);
    });
});

app.get('/location', (req, res) => {
    let searchTerm = String(req.query.q);
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=pk.eyJ1IjoibmllbmtlMDkwNSIsImEiOiJja2MwYWludnAxaHM2MnRsZ3c4b3l0dHNqIn0.FIQX7sNolXaZEVPAUxOIrg`)
    .then((response)=> {
        let responseLocation = response.data.features[0].geometry.coordinates;
        return responseLocation;
    })
    .then((responseLocation)=>{
        User.find(
            { geometry: { $nearSphere: { $geometry: { type: "Point", coordinates: responseLocation }, $maxDistance: 10 * 1000 } } }
        )
        .populate("pictures")
        .then(properties => {
            res.json(properties);
        })
    })
    .catch((err) => {
        console.log("Err",err);
    });
});












module.exports = app;
