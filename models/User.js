const mongoose = require("mongoose");
const Picture = require("./Picture");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.'],
    },
    homeName: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'City is required.']
    },
    homeDescription: {
      type: String,
      trim: true
    },
    geometry: { 
      type: { type: String }, 
      coordinates: [Number],
    },
    pictures: [{ type: mongoose.Schema.ObjectId, ref: "Picture" }]
  },
  {
    timestamps: true
  }
);

userSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('User', userSchema);
