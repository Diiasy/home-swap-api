const express = require('express');
const app = express();
const Conversation = require("../../models/Conversation.js");
const User = require("../../models/User.js");

app.post('/:convId', (req, res) => {
    let convId = req.params.id;
    let content = req.body.content;
    let date = req.body.date;
    let message = [content, date];
    Conversation.findByIdAndUpdate(convId, { $push: { messages: message } })
    .then((messages) => {
        res.json(messages)
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = app;