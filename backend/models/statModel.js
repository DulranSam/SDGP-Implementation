const mongoose = require("mongoose");
const statSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const statModel = mongoose.model("statistics", statSchema);
module.exports = statModel;
