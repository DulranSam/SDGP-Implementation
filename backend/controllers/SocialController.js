const forumModel = require("../models/forum");

async function GetUsers(req, res) {
  const { topic } = req?.body;
  try {
    if (!topic) {
      const forumData = await forumModel.find();
      return res.status(200).json(forumData);
    }
    const topicRelated = await forumModel.find({ topic });
    return res.status(200).json(topicRelated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: err.message });
  }
}

async function CreateQuestions(req, res) {
  const { question, answer, topic } = req?.body;

  if (!question || !topic)
    return res.status(400).json({ Alert: "No questions or topic provided" });

  await forumModel.create({
    question,
    answer,
    topic,
  });

  return res.status(201).json({ Alert: "Question Added" });
}

module.exports = { GetUsers, CreateQuestions };
