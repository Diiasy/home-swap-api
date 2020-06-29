const { Schema, model } = require('mongoose');

const userSchema = new Schema(
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
    // profileImage: {
    //   type: String,
    //   required: [true, 'Profile image is required.']
    // },
    // profileImagePath: {
    //   type: String
    // },
    city: {
        type: String,
        required: [true, 'City is required.']
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);