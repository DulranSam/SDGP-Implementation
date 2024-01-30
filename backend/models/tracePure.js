const mongoose = require("mongoose");
const forumSchema = mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
    },
    answer: {
      type: String,
      default: "",
    },
    topic: {
      type: String,
      trim: true,
      min: 5,
    },
    // connected: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "users",
    // },
  },
  { timestamps: true }
);

const forumModel = mongoose.model("puretraces", forumSchema);
module.exports = forumModel;
