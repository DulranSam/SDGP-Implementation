const pureMaths = require("../models/pureMaths");

async function PureMathQuestions(req, res) {
  try {
    const questions = await pureMaths.find().exec();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function AddPureMaths(req, res) {
  try {
    const { topic, question, answer } = req?.body;
    if (!topic || !question || !answer) {
      return res
        .status(400)
        .json({ Alert: "No Topic, question or answer provided" });
    }

    const questionExists = await pureMaths.findOne({ question: question });
    if (!questionExists) {
      await pureMaths.create({
        topic,
        question,
        answer,
      });
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
