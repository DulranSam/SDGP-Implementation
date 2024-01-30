const express = require("express");
const router = express.Router();
const socialController = require("../controllers/SocialController");
const socialIDController = require("../controllers/userIDControl/socialIDControl");

router
  .route("/")
  .get(socialController.GetUsers)
  .post(socialController.CreateQuestions);

router
  .route("/:id")
  .delete(socialIDController.DeleteUsers)
  .put(socialIDController.UpdateUsers);

router.route("/x/:id").put(socialIDController.Upvoted);

module.exports = router;
