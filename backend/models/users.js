const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      max: 20,
      trim: true,
    },
    mail: {
      type: String,
      required: true,
      max: 20,
      trim: true,
    },
    photo: {
      type: String,
      default: "",
      trim: true,
    },
    rank: {
      type: Number,
      default: 0,
    },
    done: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
