const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema(
  {
    name: { type: String },
    path: { type: String },
    picture_id: { type: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Picture', pictureSchema);