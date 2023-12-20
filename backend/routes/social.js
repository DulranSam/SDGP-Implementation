const express = require("express");
const router = express.Router();
const socialController = require("../controllers/SocialController");
const socialIDController = require("../controllers/userIDControl/socialIDControl");
const forum = require("../models/forum");

router
  .route("/")
  .get(socialController.GetUsers)
  .post(socialController.CreateQuestions);

router
  .route("/:id")
  .delete(socialIDController.DeleteUsers)
  .put(socialIDController.UpdateUsers);

module.exports = router;
