const userData = require("../../models/users");
const forumModel = require("../../models/forum");

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

const Upvoted = async (req, res) => {
  const id = req.params.id;
  const upvotes = req?.body.upvotes;

  try {
    const forumPost = await forumModel.findById(id);

    if (!forumPost) {
      return res.status(400).json({ Alert: "Invalid User!" });
    } else {
      forumPost.rating = upvotes;

      const updatedPost = await forumPost.save();
      return res.status(200).json({ Alert: `Updated!`, updatedPost });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
};

module.exports = { DeleteUsers, UpdateUsers, Upvoted };
