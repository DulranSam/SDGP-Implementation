const mongoose = require("mongoose");
const pureMathsSchema = mongoose.Schema(
  {
    pureID: { type: String, default: "P" },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    wrong: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const pureMathsModel = mongoose.model("puremaths", pureMathsSchema);
module.exports = pureMathsModel;
