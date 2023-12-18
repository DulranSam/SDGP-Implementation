const pureMaths = require("../models/pureMaths");

async function PureMathQuestions(req, res) {
  try {
    const questions = await pureMaths.find();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function AddPureMaths(req, res) {
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
}

module.exports = { PureMathQuestions, AddPureMaths };
