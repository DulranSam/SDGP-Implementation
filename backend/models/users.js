const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      trim: true,
    },
    mail: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
