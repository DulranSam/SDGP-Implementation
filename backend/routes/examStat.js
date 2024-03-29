const express = require("express");
const router = express.Router();
const statModel = require("../models/statModel");

router
  .route("/")
  .get(async (req, res) => {
    const { topic } = req?.body;
    if (!topic) {
      return res
        .status(200)
        .json(Math.random(statModel.find().sort("createdAt")));
    } else {
      const topicExists = await statModel.find({ $match: { topic } });
      if (!topic) {
        return res.status(400).json({ Alert: "Topic doesn't exist!" });
      } else {
        return res.status(200).json(Math.random(topicExists));
      }
    }
  })
  .post(/**Student answering and sending back question logic! (comparison) */);
module.exports = router;
