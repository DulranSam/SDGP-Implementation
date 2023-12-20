const { ObjectId } = require("mongodb");

async function DeleteUsers(req, res) {
  const { id } = req?.params;
  const convertedID = String(id);
  if (!id) return res.status(400).json({ Alert: "No ID found" });

  const deleteQuestion = await forumModel.findOneAndDelete({
    _id: new ObjectId(convertedID),
  });
  if (!deleteQuestion) {
    return res.status(400).json({ Alert: "Error while deleting question" });
  } else {
    return res.status(200).json({ Alert: "Question Deleted" });
  }
}

async function UpdateUsers(req, res) {
  const { id } = req?.params;
  const convertedID = String(id);
  if (!id) return res.status(400).json({ Alert: "No ID found" });

  const updateQuestion = await forumModel.findOneAndUpdate({
    _id: convertedID,
  });
  if (!updateQuestion) {
    return res.status(400).json({ Alert: "Error while updating question" });
  } else {
    return res.status(200).json({ Alert: "Question Updated" });
  }
}

module.exports = { DeleteUsers, UpdateUsers };
