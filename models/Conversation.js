// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // const conversationSchema = new Schema({
// //   messages: [{ 
// //       content: { type: String },
// //       date: { type: Date },
// //       to: { type: mongoose.Schema.ObjectId, ref: "User" },
// //       from: { type: mongoose.Schema.ObjectId, ref: "User" }
// //   }]
// // });

// new mongoose.SchemaType({
//   between: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
// })
// {
//   message: String,
//   date: {type: date, default: Date.now()},
//   to: { type: mongoose.Schema.ObjectId, ref: "User" },
//   from: { type: mongoose.Schema.ObjectId, ref: "User" }
// }

// // thread / conversations
// // Conversation.find($in)




// // messagehistory user1 user2
// Message.find({
//   $or: [{
//     to: user1.id,
//     from: user2.id
//   }, {
//       to: user2.id,
//       from: user1.id
//   }]
// })
// .limit(1)
// .then((conversation)=> {
//   if(conversation) // proceed
//   else {
//     // create conversation
//   }
// })
// .then(()=> {
//   Message.find({
//     $or: [{
//       to: user1.id,
//       from: user2.id
//     }, {
//         to: user2.id,
//         from: user1.id
//     }]
//   })
// })
// //
// Message.create({
//   from: req.session.user._id,
//   to: req.params.receiver_id,
//   message: req.body.message
// })

// module.exports = mongoose.model('Conversation', conversationSchema);;