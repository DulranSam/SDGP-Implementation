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
  },
  { timestamps: true }
);

const forumModel = mongoose.Schema("traces", forumSchema);
module.exports = forumModel;
