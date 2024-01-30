const mongoose = require("mongoose");
const forumSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      default: "",
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
  },
  { timestamps: true }
);

const forumModel = mongoose.model("statetraces", forumSchema);
module.exports = forumModel;
