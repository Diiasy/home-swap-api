const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  participants: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Conversation', conversationSchema);;