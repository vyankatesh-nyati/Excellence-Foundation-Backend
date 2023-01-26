const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  structure: [{ type: Schema.Types.ObjectId, ref: "Session" }],
});

module.exports = mongoose.model("Course", courseSchema);
