const pureMaths = require("../models/pureMaths");

async function PureMathQuestions(req, res) {
  const { simul, integration } = req.body;
  if (!req.body) {
    const questions = await pureMaths.find().exec();
    res.json(questions);
  } else {
    try {
      const questions = await pureMaths
        .find({ $or: { simul, integration } })
        .exec();
      // const randomizedQuestions = questions.sort(() => Math.random() - 0.5);
      // const partSize = Math.ceil(randomizedQuestions.length / 3);
      // const part1 = randomizedQuestions.slice(0, partSize);
      // const part2 = randomizedQuestions.slice(partSize, 2 * partSize);
      // const part3 = randomizedQuestions.slice(2 * partSize);
      // const combined = { part1, part2, part3 };

      // You can now use part1, part2, and part3 as needed

      // For example, sending them in the response
      res.status(200).json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
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
