const express = require('express');
const app = express();
const Conversation = require("../../models/Conversation.js");

app.get('/my-conversations', (req, res) => {
    Conversation.find({participants: req.session.user._id})
    .populate('participants')
    .then(conversations => {
        let participants = [];
        conversations.map(conv => {
            (conv.participants[0].username === req.session.user.username) ? participants.push([conv._id, conv.participants[1]]) : participants.push([conv._id, conv.participants[0]])
        })
        res.json(participants);
    })
    .catch(err => console.log(err))
})

app.post('/create/:recipientId', (req, res) => {
    Conversation.findOne({
         $or: [ { participants: [req.params.recipientId, req.session.user._id] }, { participants: [req.session.user._id, req.params.recipientId] } ] 
    })
    .then(conversation => {
        if(conversation){
            return conversation;
            // redirect to message page on front-end that fetches messages from /message/list/:conversationId
        } else {
            return Conversation.create({
                participants: [req.params.recipientId, req.session.user._id]
            });
        }
    })
    .then (conversation => {
        res.json(conversation.id);
        // redirect to message page on front-end that fetches messages from /message/list/:conversationId
    })
    .catch(err => console.log(err))
})

module.exports = app;