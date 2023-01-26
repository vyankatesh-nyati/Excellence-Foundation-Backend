const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  session: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
