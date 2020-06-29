const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema(
  {
    image: { type: String },
    path: { type: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Picture', pictureSchema);