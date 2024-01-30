const forumModel = require("../models/forum");

async function GetUsers(req, res) {
  try {
    const forumData = await forumModel.find();
    return res.status(200).json(forumData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: err.message });
  }
}

async function CreateQuestions(req, res) {
  const { question, answer, topic } = req?.body;

  if (!question)
    return res.status(400).json({ Alert: "No questions or topic provided" });

  await forumModel.create({
    question,
    answer,
    topic,
  });

  return res.status(201).json({ Alert: "Question Added" });
}

module.exports = { GetUsers, CreateQuestions };
