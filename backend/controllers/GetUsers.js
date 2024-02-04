const forumModel = require("../models/forum");

async function GetUsers(req, res) {
  // const { topic } = req?.body;
  try {
    // if (!topic) {
    const forumData = await forumModel.find();
    return res.status(200).json(forumData);
  } finally {
  }
  // const topicRelated = await forumModel.find({ topic });
  // return res.status(200).json(topicRelated);
}
