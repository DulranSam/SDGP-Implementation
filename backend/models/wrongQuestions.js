const mongoose = require("mongoose");

const WrongSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    min: 5,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
    min: 5,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
    min: 5,
  },
  connected: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
});

const questionModel = mongoose.model("tests", WrongSchema);
module.exports = questionModel;
