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
      unique: true,
      required: true,
      max: 20,
      trim: true,
    },
    photo: {
      type: String,
      default: "",
      trim: true,
    },
    marks: {
      type: Number,
      default: 0,
    },
    statmarks: {
      type: Number,
      default: 0,
    },
    puremarks: {
      type: Number,
      default: 0,
    },
    statprog: {
      type: Number,
      default: 0,
    },
    pureprog: {
      type: Number,
      default: 0,
    },
    questionHistory: {
      type: Object,
      default: {},
    },
    testHistory: { type: Object, default: {} },
    // rank: {
    //   type: Number,
    //   default: 0,
    // },
    // done: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
