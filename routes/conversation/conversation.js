const express = require('express');
const app = express();
const Conversation = require("../../models/Conversation.js");

app.get('/my-conversations', (req, res) => {
    Conversation.find({participants: req.session.user._id})
    .then(conversations => {
        res.json(conversations)
    })
    .catch(err => console.log(err))
})

app.post('/create/:recipientId', (req, res) => {
    Conversation.findOne({
        participants: [req.params.recipientId, req.session.user._id]
    })
    .then(conversation => {
        debugger
        if(conversation){
            return res.json(conversation._id);
            // redirect to message page on front-end that fetches messages from /message/list/:conversationId
        } else {
            return Conversation.create({
                participants: [req.params.recipientId, req.session.user._id]
            });
        }
    })
    .then (conversation => {
        debugger
        res.json(conversation.id);
        // redirect to message page on front-end that fetches messages from /message/list/:conversationId
    })
    .catch(err => console.log(err))
})

module.exports = app;