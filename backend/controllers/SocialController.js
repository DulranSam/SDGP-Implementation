const forumModel = require("../models/forum");

async function GetUsers(req, res) {
  const forumData = await forumModel.find();
  res.json(forumData);
}

async function CreateQuestions(req, res) {
  const { question, topic } = req?.body;

  if (!question)
    return res.status(400).json({ Alert: "No questions or topic provided" });

  const newQuestion = new forumModel({
    question,
    topic,
  });

  await newQuestion.save();
  return res.status(201).json({ Alert: "Question Added" });
}

module.exports = { GetUsers, CreateQuestions };
