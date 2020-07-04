const express = require('express');
const app = express();
const User = require("../../models/User.js");

app.get('/', (req, res) => {
    let searchTerm = String(req.query.q);
    User.find(
        { $text: { $search: searchTerm } }
    )
    .then(properties => {
        res.json(properties);
    })
    .catch((err) => {
        console.log("Err",err);
    });
});

module.exports = app;
