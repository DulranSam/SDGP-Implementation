const mongoose = require("mongoose");
const statSchema = mongoose.Schema(
  {
    statID: { type: String, default: "S" },
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
    cordinates: {
      type: Array,
      default: [],
      x: {
        type: Number,
      },
      y: {
        type: Number,
      },
    },
    wrong: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const statModel = mongoose.model("statistics", statSchema);
module.exports = statModel;
