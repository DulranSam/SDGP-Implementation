const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const userIDController = require("../controllers/userIDControl/userIDControl");

router.route("/").get(userController.Users).post(userController.CreateUsers);

router.route("/login").post(loginController.Login);
router.route("/logout").get(loginController.LogOut);

router
  .route("/:id")
  .delete(userIDController.DeleteUser)
  .put(userIDController.UpdateUsers);

module.exports = router;
