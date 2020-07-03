const express = require('express');
const app = express();
const Conversation = require("../../models/Review.js");
const User = require("../../models/User.js");

app.get('/:convId', (req, res) => {
    if (req.params.convId){
        convId = req.params.id;
    } else {
        Conversation.create({})
        .then(()=> {
            User.conversation.push(convId)
        })
    }

    Conversation.findById({conversation: convId})
    .then((messages) => {
        res.json(messages);
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = app;