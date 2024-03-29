const traceStat = require("../models/traceStat");

const getQuestion = async (req, res) => {
  try {
    const data = await traceStat.find().sort("createdAt");
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
};

const createWrongQuestion = async (req, res) => {
  const { question, answer, type } = req.body;
  if (!question || !answer || !type)
    return res.status(400).json({ Alert: "Missing Question/Answer/Type!" });
  try {
    const questionVerify = await traceStat.findOne({ question });

    if (!questionVerify) {
      const wrongQuestion = await traceStat.create({
        question,
        answer,
        type,
      });
      if (!wrongQuestion) {
        return res.status(401).json({ Alert: "Couldn't save question!" });
      } else {
        return res
          .status(201)
          .send({ Alert: "Question Added to wrong statistics questions!" });
      }
    } else {
      return res.status(409).json({ Alert: "Question already exists!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(err.status).json(err.message);
  }
};

module.exports = { getQuestion, createWrongQuestion };
