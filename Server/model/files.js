const mongoose = require("mongoose");

const filesSchima = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  file: { type: Object, require: true },
});

module.exports = mongoose.model("Files", filesSchima);
