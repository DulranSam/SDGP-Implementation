const express = require("express");
const router = express.Router();
const statisticsModel = require("../models/statModel");
const pureMaths = require("../models/pureMaths");

router
  .route("/stat")
  .get(async (req, res) => {
    try {
      const questions = await statisticsModel.find();
      res.json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { topic, question } = req.body;
      if (!topic || !question) {
        return res.status(400).json({ Alert: "No Topic or question provided" });
      }

      const topicExists = await statisticsModel.findOne({ topic: topic });
      if (!topicExists) {
        const statisticsData = new statisticsModel({
          topic,
          question,
        });
        await statisticsData.save();
        return res.status(200).json({ Alert: "Added Question" });
      } else {
        await statisticsModel.updateOne(
          { topic: topic },
          { $push: { questions: question } }
        );
        return res
          .status(200)
          .json({ Alert: "Added Question to existing topic" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router
  .route("/pure")
  .get(async (req, res) => {
    try {
      const questions = await pureMaths.find();
      res.json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { topic, question } = req.body;
      if (!topic || !question) {
        return res.status(400).json({ Alert: "No Topic or question provided" });
      }

      const topicExists = await pureMaths.findOne({ topic: topic });
      if (!topicExists) {
        const statisticsData = new pureMaths({
          topic,
          question,
        });
        await statisticsData.save();
        return res.status(200).json({ Alert: "Added Question" });
      } else {
        return res.status(400).json({ Alert: "Question already exists" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
