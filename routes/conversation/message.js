const express = require('express');
const app = express();
const Message = require("../../models/Message.js");

app.post('/create/:conversationId', (req, res) => {
    Message.create(
        {from: req.session.user._id, message: req.body.message, conversationId: req.params.conversationId}
    )
    .then((message) => {
        Message.find({_id: message.id})
        .populate('from')
        .then((message) => {
            res.json(message);
        })
    })
    .catch(err => console.log(err))
})

app.get('/conversation/:conversationId', (req, res) => {
    Message.find({conversationId: req.params.conversationId})
    .populate('from')
    .then(messages => {
        res.json(messages);
    })
    .catch(err => console.log(err))
})

module.exports = app;