const express = require("express");
const router = express.Router();
const forumModel = require("../models/forum");

router
  .route("/")
  .get(async (req, res) => {
    const forumData = await forumModel.find();
    res.json(forumData);
  })
  .post((req, res) => {
    const { question } = req.body;
    if (!question)
      return res.status(400).json({ Alert: "No question provided" });
  });

router
  .route("/:id")
  .delete(async (req, res) => {
    const { id } = req.params;
    const convertedID = String(id);
    if (!id) return res.status(400).json({ Alert: "No ID found" });

    const deleteQuestion = await forumModel.findOneAndDelete({
      _id: convertedID,
    });
    if (!deleteQuestion) {
      return res.status(400).json({ Alert: "Error while deleting question" });
    } else {
      return res.status(200).json({ Alert: "Question Deleted" });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
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
  });

module.exports = router;
