const userData = require("../../models/users");

async function DeleteUsers(req, res) {
  const { id } = req?.params;

  if (!id) return res.status(400).json({ Alert: "No ID found" });

  const deleteQuestion = await userData.findOneAndDelete({
    _id: String(id),
  });
  if (!deleteQuestion) {
    return res.status(400).json({ Alert: "Error while deleting question" });
  } else {
    return res.status(200).json({ Alert: "Question Deleted" });
  }
}

async function UpdateUsers(req, res) {
  const { id } = req?.params;

  if (!id) return res.status(400).json({ Alert: "No ID found" });

  const updateQuestion = await userData.findOneAndUpdate({
    _id: convertedID,
  });
  if (!updateQuestion) {
    return res.status(400).json({ Alert: "Error while updating question" });
  } else {
    return res.status(200).json({ Alert: "Question Updated" });
  }
}

module.exports = { DeleteUsers, UpdateUsers };
