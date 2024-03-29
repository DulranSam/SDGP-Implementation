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
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const forumModel = mongoose.model("forums", forumSchema);
module.exports = forumModel;
