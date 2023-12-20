const mongoose = require("mongoose");
const pureMathsSchema = mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const pureMathsModel = mongoose.model("puremaths", pureMathsSchema);
module.exports = pureMathsModel;
