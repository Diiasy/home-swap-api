const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  score: { type: Number, min: 0, max: 10, required: true, default: 10 },
  content: { type: String },
  reviewer: { type: mongoose.Schema.ObjectId, ref: "User" },
  reviewed: { type: mongoose.Schema.ObjectId, ref: "User" }
});

const Review = mongoose.model('Review', reviewSchema);


module.exports = Review;
