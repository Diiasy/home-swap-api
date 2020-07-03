const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    from: {
        type: mongoose.Schema.ObjectId, 
        ref: "User"
    },
    message: { type: String },
    date: { type: Date,
        default: Date.now()
    },
    conversationId: [{ 
        type: mongoose.Schema.ObjectId, 
        ref: "Conversation" 
    }]
});

module.exports = mongoose.model('Message', messageSchema);;