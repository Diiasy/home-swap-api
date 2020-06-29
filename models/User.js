const mongoose = require("mongoose");

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
    pictures: [{ type: mongoose.Schema.ObjectId, ref: "Picture" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);