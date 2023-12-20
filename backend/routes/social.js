const express = require("express");
const router = express.Router();
const socialController = require("../controllers/SocialController");
const { ObjectId } = require("mongodb");
const forum = require("../models/forum");

router
  .route("/")
  .get(socialController.GetUsers)
  .post(async (req, res) => {
    const { question, topic } = req?.body;

    if (!question)
      return res.status(400).json({ Alert: "No questions or topic provided" });

    const newQuestion = new forum({
      question,
      topic,
    });

    await newQuestion.save();
    return res.status(201).json({ Alert: "Question Added" });
  });

router
  .route("/:id")
  .delete(async (req, res) => {
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
  })
  .put(async (req, res) => {
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
  });

module.exports = router;
