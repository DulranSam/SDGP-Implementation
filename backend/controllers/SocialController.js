const forumModel = require("../models/forum");

async function GetUsers(req, res) {
  const forumData = await forumModel.find();
  res.json(forumData);
}

module.exports = { GetUsers };
