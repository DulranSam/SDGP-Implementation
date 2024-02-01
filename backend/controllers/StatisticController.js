const statisticsModel = require("../models/statModel");

async function StatisticQuestions(req, res) {
  try {
    const questions = await statisticsModel.find();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function CreateQuestions(req, res) {
  try {
    const { topic, question, answer } = req?.body;
    if (!topic || !question || !answer) {
      return res
        .status(400)
        .json({ Alert: "No Topic, question or answer provided" });
    }

    const questionExists = await statisticsModel.findOne({
      question: question,
    });
    if (!questionExists) {
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
}

const AnswerQuestion = (req, res) => {
  const { topic, question, answer, cordinates } = req?.body;
  if (!answer) return res.status(400).json({ Alert: "No Answer Provided" });
};

module.exports = { StatisticQuestions, CreateQuestions, AnswerQuestion };
